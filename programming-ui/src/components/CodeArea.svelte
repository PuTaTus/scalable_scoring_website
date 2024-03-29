<script>
    import GradingButton from "./GradingButton.svelte";
    // import GradingButton from GradingButton
    import { assIndex } from "../stores/stores.js";

    let codeInput = "";
    function exportCode() {
        // Do something with the exported code, e.g., send it to an API, save it to a file, etc.
        console.log("Exported Code:", codeInput);
    }
</script>

<p>{$assIndex}</p>

<div class="bg-gray-100 p-8">
    <label for="codeInput">Write your code:</label>
    <textarea
      class="w-full h-48 rounded-md border-solid border"
      bind:value={codeInput}
      id="codeInput"
      name="codeInput"
      placeholder="Enter your code here..."
    ></textarea>
  </div>

<GradingButton on:click={exportCode()}  userCode={codeInput} />
