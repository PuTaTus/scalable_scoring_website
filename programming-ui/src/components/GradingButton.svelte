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

      const uniqueKey = Math.floor(Math.random() * 90000) + 10000;
      let data = {
        user: $userUuid,
        code: userCode, // code from the user passed from CodeArea.svelte through index.astro
        assIndex: $assIndex,
        userUuid: $userUuid,
        key: uniqueKey
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
      console.log("POLLING")
      let pollingFinished = false;

      // Function to perform short polling
      async function shortPolling() {
          console.log("SHORT POLLING", uniqueKey);
          try {
              const response = await fetch(`api/grade/shortPolling/${uniqueKey}`, {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json",
                  },
              });

              const jsonData = await response.json();

              console.log(jsonData);

              if (Object.keys(jsonData).length === 0 && jsonData.constructor === Object) {
                console.log('Empty response data');
                // Schedule the next polling after a delay
                setTimeout(shortPolling, 2000); // Polling interval of 2000 milliseconds (2 seconds)
                return; // Exit the function to prevent further execution
              }
              else{
                console.log('POLLING FINISHED')
                pollingFinished = true
              }


              let status = jsonData.correct;
              let feedback = jsonData.feedback;
              console.log('Continue with your stuff')

              if (status == true) {
                  console.log("CORRECT");
                  setTimeout(() => {
                      alert("Congratulations!!! You are correct. Proceed to next assignment.");
                  }, 1000);

                  // Iterate the $assIndex to show next assignment
                  $assIndex = $assIndex + 1;
              } else {
                  console.log("NOT CORRECT");
                  setTimeout(() => {
                      alert(`Oops, there is some mistake in your program:\n${feedback}`);
                  }, 1000);
              }

              console.log(jsonData);

              // In each scenario, submit
              // submit empty code to update the index to the as a submission
              const data = {
                  user: $userUuid,
                  code: "", // code from the user passed from CodeArea.svelte through index.astro
                  assIndex: $assIndex,
                  userUuid: $userUuid,
                  key: uniqueKey
              };
              console.log('Send something to db so that it will not go back to previous')
              console.log(data)

              // SUBMIT the latest $assIndex so the DB won't go back to the previous question 
              const r = await fetch("/api/grade/sendPreventPrevious", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
              });
              
              console.log("REQUEST SENT", await response.json())

          } catch (error) {
              // Handle errors
              // console.error('Error:', error);
          }

          // Schedule the next polling after a delay
          if (!pollingFinished) {
              setTimeout(shortPolling, 2000); // Polling interval of 2000 milliseconds (2 seconds)
          }
      }

      await shortPolling();


      // Function to wait until polling is finished
      // async function waitForPolling() {
      //   while (!pollingFinished) {
      //     console.log("Short Polling, check for result")
      //     await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 100 milliseconds before checking again
      //   }
      //   console.log('Short polling is complete.');
      //   // You can add further actions to be performed after polling is complete here
      // }

      // // Start short polling and wait until it's finished
      // async function startPolling() {
      //     await shortPolling();
      //     await waitForPolling();
      // }

      // // Call startPolling function
      // startPolling();

      ////

      // UNCOMMENT IF NEEDED!!
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
