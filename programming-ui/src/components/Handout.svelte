<script>
    import { assIndex } from "../stores/stores.js";
    import { onMount } from 'svelte';
    import { userUuid } from "../stores/stores.js";

    // Initialize variables
    let handoutData;
    let assLength;

    // function to get assLength:
    const getAssLength = async () => {
        try {
            const response = await fetch(`/api/grade/lenAss`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            console.log("res" + result)
            assLength = parseInt(result['result']['count']);
            console.log("assLength: " + assLength);
            return assLength;
        } catch (error) {
            console.log("Error fetching length of assignments");
            return null;
        }
    }

    const checkLastEntry = async () => {
        const data ={userUuid: $userUuid} 
        console.log(data)
        const response = await fetch("/api/grade/latestAss", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const jsonData = await response.json();
        console.log(jsonData)

        // If there is previous submission
        if (jsonData.status == 1 ){
            console.log("Status: 1", jsonData.assId)
            $assIndex = jsonData.assId
            handoutData = jsonData.result
            console.log($assIndex, handoutData)
            return handoutData
        }

        // otherwise, start from 1
        else{
            console.log("Status: 0")
            $assIndex = 1
        }
    }
    
    // Use onMount to fetch assLength when the component is first mounted
    onMount(async () => {
        try {
            // Execute both functions concurrently
            const [length, lastEntry] = await Promise.all([
                getAssLength(),
                checkLastEntry(),
            ]);

            // Update the state variables
            assLength = length;
            handoutData = lastEntry;

            // Continue with the rest of your logic here
            // ...
        } catch (error) {
            console.error('Error during onMount:', error);
        }
    });

    // Re-fetch the handout data whenever assIndex changes
    $: (async () => {
        console.log("assLength: " + assLength);
        console.log("assIndex: " + $assIndex);
        assLength = await getAssLength()
        console.log("assLength: " + assLength);

        if ($assIndex <= assLength ) { // && assLength !== undefined
            if (assLength !== undefined){
                try {
                    console.log('try')
                    const response = await fetch(`/api/grade/handout/${$assIndex}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const jsonData = await response.json();
                    console.log(jsonData);
                    handoutData = jsonData[0]['handout'];
                } catch (error) {
                    console.error("Error fetching handout:", error);
                    handoutData = null;
                }
            }
                
        } else {
            setTimeout(() => {
                alert("You have reached the end of the assignment. Congratulations!!");
            }, 0);
        }
    })();

</script>

<div>
    <p>{$assIndex}</p>
    <h3 class="font-bold">
        {#if handoutData === undefined}
            <p>Loading...</p>
        {:else if handoutData !== null}
            <p>{handoutData}</p>
        {:else}
            <p>Error fetching handout data</p>
        {/if}
    </h3>
</div>
