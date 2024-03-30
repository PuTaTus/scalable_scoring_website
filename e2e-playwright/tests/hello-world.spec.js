const { test, expect } = require('@playwright/test');
// import {test, expect} from "./node_modules/@playwright/test"

// test("Server responds with a page with the title 'Programming assignments'", async ({ page }) => {
//   console.log('TADA')
//   await page.goto("/");
//   expect(await page.title()).toBe("Programming assignments");
// });
test("Server responds with a page with the title 'Programming assignments'", async ({ page }) => {
  await page.goto('localhost:7800/');

  // Expect a title "to contain" a substring. 
  await expect(page).toHaveTitle("Programming assignments");
});



test("creating a submission that fails the tests and checking the feedback on incorrect submission", async ({ page }) => {
  const wrongTestFeedback = 
`Oops, there is some mistake in your program:
Traceback (most recent call last):
  File "/usr/lib/python3.10/runpy.py", line 196, in _run_module_as_main
    return _run_code(code, main_globals, None,
  File "/usr/lib/python3.10/runpy.py", line 86, in _run_code
    exec(code, run_globals)
  File "/usr/lib/python3.10/unittest/__main__.py", line 18, in <module>
    main(module=None)
  File "/usr/lib/python3.10/unittest/main.py", line 100, in __init__
    self.parseArgs(argv)
  File "/usr/lib/python3.10/unittest/main.py", line 147, in parseArgs
    self.createTests()
  File "/usr/lib/python3.10/unittest/main.py", line 158, in createTests
    self.test = self.testLoader.loadTestsFromNames(self.testNames,
  File "/usr/lib/python3.10/unittest/loader.py", line 220, in loadTestsFromNames
    suites = [self.loadTestsFromName(name, module) for name in names]
  File "/usr/lib/python3.10/unittest/loader.py", line 220, in <listcomp>
    suites = [self.loadTestsFromName(name, module) for name in names]
  File "/usr/lib/python3.10/unittest/loader.py", line 154, in loadTestsFromName
    module = __import__(module_name)
  File "/app/submission/test-code.py", line 7, in <module>
    from code import *
  File "/app/submission/code.py", line 1
    ooga booga
         ^^^^^
SyntaxError: invalid syntax`

  await page.goto('localhost:7800/');

  // Expect a title "to contain" a substring. 
  await page.locator("textarea").fill('ooga booga');
  await page.locator("button").click();

  page.on('dialog', async dialog => {
    console.log(dialog.message())
    expect(dialog.message()).toEqual(wrongTestFeedback)
    // await dialog.accept()
  });

  // await expect(page).toHaveTitle("Programming assu");

});


test("creating a submission that passes the tests and checking the notification on the correctness of the submission", async ({ page }) => {
  const rightTestFeedback = 
`Congratulations!!! You are correct. Proceed to next assignment.`
  const testCode = 
`def hello():
  return "Hello"
`
  await page.goto('localhost:7800/');

  // Expect a title "to contain" a substring. 
  await page.locator("textarea").fill(testCode);
  await page.locator("button").click();

  page.on('dialog',  dialog => {
    console.log(dialog.message())
    expect(dialog.message()).toEqual(rightTestFeedback)
    // await dialog.accept()
  });


});


test("creating a submission that passes the tests, checking the notification on the correctness of the submission, moving to the next assignment, and checking that the assignment is a new one.", async ({ page }) => {
  const rightTestFeedback = 
    `Congratulations!!! You are correct. Proceed to next assignment.`;
  const testCode = 
    `def hello():
  return "Hello"
`;
  await page.goto('localhost:7800/');

  const firstQuestion = await page.locator('#handoutData');
  const firstText = await firstQuestion.innerText();

  // Fill the textarea and submit
  await page.locator("textarea").fill(testCode);
  await page.locator("button").click();


  // Handle dialog
  page.once('dialog', async dialog => {
    console.log("Dialog: ");
    console.log(dialog.message());
    expect(dialog.message()).toEqual(rightTestFeedback);
    
    
    console.log('First Text');
    console.log(firstText);
    // dialog.accept()

    new Promise(async (resolve) =>  {
      console.log('Next Text');
      const nextQuestion = await page.locator('#handoutData');
      // const nextQuestionText = await nextQuestion;
      resolve(nextQuestion)
    }).then(async (data)=>{
      console.log(data)
      const nextQuestionText = await data.innerText();
      // console.log(nextQuestionText)
      // await expect(data).not.toEqual(firstText);

      data(nextQuestionText)
    }).then(async (data) => {
      console.log('hello')
      console.log(data)
      await expect(data).not.toEqual(firstText);
    })
    .catch((error) => {
      console.error('Error:', error); // Handle any errors that occurred
    });


  });
});
