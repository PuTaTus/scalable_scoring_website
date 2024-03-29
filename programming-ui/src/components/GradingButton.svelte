<script>
  import { userUuid } from "../stores/stores.js";
  import { assIndex } from "../stores/stores.js";

  export let userCode;

  const doSimpleGradingDemo = async () => {
    console.log("code:" + userCode)
    // alert("HELLO!!!")

    const checkData = {
      code: userCode,
      assIndex: $assIndex
    }
    // But first, check whether it exist or not 
    const existRes = await fetch("/api/grade/checkSame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkData),
    });

    // read the data
    const jsonCheckData = await existRes.json();
    console.log(jsonCheckData)

    // jsonCheckData.status == 1, means there exist exisiting similar code
    // Then we simply skip the grading and get the result in the DB instead
    if (jsonCheckData.status == 1){
      console.log("THERE IS PREVIOUS LOG")

      // If the code turns out to be correct
      if (jsonCheckData.correct == 1){
        alert("Congratulations!!! You are correct. Proceed to next assignment.")

        // Iterate the $assIndex to show next assignment
        $assIndex = $assIndex + 1
      }

      // If it is INCORRECT
      else{
        alert(`Oops, there is some mistake in your program:\n${jsonCheckData.grader_feedback}`)
      }
      
    }

    // IF There is no previous log
    else{
      // SEND FOR GRADING
      console.log("THERE IS NO PREVIOUS LOG")
      console.log("usercode: ", userCode)
      let data = {
        user: $userUuid,
        code: userCode, // code from the user passed from CodeArea.svelte through index.astro
        assIndex: $assIndex,
        userUuid: $userUuid
      };

      console.log("GRADE")
      console.log(data)
      
      // send to grade: 
      const response = await fetch("/api/grade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      ////
      let pollingFinished = false;


      // Function to perform short polling
      async function shortPolling() {
          try {
              const response = await fetch('server_endpoint_url'); // URL of the server endpoint to check for updates
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.text(); // Assuming server responds with plain text
              // Handle the response from the server
              document.getElementById('status').innerHTML = data; // Update the status on the webpage
          } catch (error) {
              // Handle errors
              console.error('Error:', error);
          } finally {
              pollingFinished = true; // Set flag to indicate polling is finished
          }
      }

      // Function to wait until polling is finished
      async function waitForPolling() {
        while (!pollingFinished) {
            await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100 milliseconds before checking again
        }
        console.log('Short polling is complete.');
        // You can add further actions to be performed after polling is complete here
      }


      ////

      // UNCOMMENT THIS LATER!!!
      // const jsonData = await response.json();

      // console.log(jsonData)
      // // console.log(jsonData['result'])
      // // console.log(jsonData['result']['status'])

      // let status = jsonData.ret.status
      // let feedback = jsonData.ret.res
      // if (status === 1){
      //   console.log("CORRECT")
      //   // showToast('Congratulations!!! You are correct. Proceed to next assignment.');
      //   setTimeout(()=> {alert("Congratulations!!! You are correct. Proceed to next assignment.")}, 1000);

      //   // Iterate the $assIndex to show next assignment
      //   $assIndex = $assIndex + 1
      // }
      // else{
      //   console.log("NOT CORRECT")
      //   // alert()
      //   setTimeout(()=> {alert(`Oops, there is some mistake in your program:\n${feedback}`)}, 1000);
      // }

      // console.log(jsonData);

      // // In each scenario, submit
      // // submit empty code to update the index to the as a submission
      // data = {
      //   user: $userUuid,
      //   code: "", // code from the user passed from CodeArea.svelte through index.astro
      //   assIndex: $assIndex,
      //   userUuid: $userUuid
      // };

      // // SUBMIT the latest $assIndex so the DB won't go back to the previous question 
      // const r = await fetch("/api/grade", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });
      
      ////
    }
  };
</script>




<button
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded m-4"
  on:click={doSimpleGradingDemo}
>
  Grade!
</button>
