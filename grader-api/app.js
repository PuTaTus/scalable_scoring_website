import { serve } from "./deps.js";
import { grade } from "./services/gradingService.js";
import * as databaseServices from "./services/databaseServices.js";
// import * as programmingAssignmentService from "C:/Users/josec/Downloads/starter(10)/programming-api/services/programmingAssignmentService.js";

class Queue {
  constructor() {
      this.items = [];
  }

  enqueue(element) {
      this.items.push(element);
  }

  dequeue() {
      if (this.isEmpty()) {
          return "Underflow";
      }
      return this.items.shift();
  }

  front() {
      if (this.isEmpty()) {
          return "No elements in Queue";
      }
      return this.items[0];
  }

  isEmpty() {
      return this.items.length === 0;
  }

  printQueue() {
      let str = "";
      for (let i = 0; i < this.items.length; i++) {
          str += this.items[i] + " ";
      }
      return str;
  }
}

const myQueue = new Queue();


let state = -1;

const getCode = () => {
  state = (state + 1) % 5;

  if (state == 0) {
    return `
def hello():
  return "Hello world!"
`;
  } else if (state == 1) {
    return `
def hello():
  return "hello world!"
    `;
  } else if (state == 2) {
    return `
def ohnoes():
  return "Hello world!"
    `;
  } else if (state == 3) {
    return `
:D
      `;
  } else {
    return `
while True:
  print("Hmmhmm...")
    `;
  }
};

const gradingDemo = async () => {
  let code = getCode();

  const testCode = `
import socket
def guard(*args, **kwargs):
  raise Exception("Internet is bad for you :|")
socket.socket = guard

import unittest
from code import *

class TestHello(unittest.TestCase):

  def test_hello(self):
    self.assertEqual(hello(), "Hello world!", "Function should return 'Hello world!'")

if __name__ == '__main__':
  unittest.main()  
`;

  return await grade(code, testCode);
};

// Function to constantly check for new items to dequeue
 function checkForNewItems(queue) {
  setInterval(async () => {
      if (!queue.isEmpty()) {
          const data = queue.dequeue();
          console.log('PROCESSING THIS QUEUE: ', data.userUuid)

          console.log("Dequeued item:");
          console.log(data)
          const result = await grade(data.code, data.testCode);

          console.log(result)
          const feedback = result

          console.log(feedback)
          // Is correct placeholder
          let isCorrect = false;

          // If the feedback is true, else isCorrect stay false
          if (feedback.search("OK") > 0){
            isCorrect = true
          }

          console.log('correct: ', isCorrect)
          
          // Store the result on db.
          try{
            await databaseServices.storeGradingResult(data.uniqueKey, data.index, data.code, data.userUuid, isCorrect, feedback)
            console.log("Success adding stuff to db")
          }
          catch(e){
            console.log(e)
          }


      } else {
          console.log("Queue is empty.");
      }
  }, 1000); // Check every second for new items (adjust interval as needed)
}



const handleRequest = async (request) => {
  // the starting point for the grading api grades code following the
  // gradingDemo function, but does not e.g. use code from the user
  let result;
  try {
    const requestData = await request.json();

    console.log("Request data:");
    console.log(requestData);

    const code = requestData.code;
    const testCode = requestData.testCode;
    const uuid = requestData.userUuid

    const data = {
      testCode: testCode,
      code: code,
      userUuid: uuid,
      index: requestData.index,
      uniqueKey: requestData.uniqueKey
    };

    myQueue.enqueue(data)
    console.log('QUEUE: ')
    console.log(myQueue)
    // NORMAL
    // result = await grade(code, testCode);
  } catch (e) {
    // NORMAL
    // result = await gradingDemo();
  }

  return new Response(200)

  // NORMAL
  // in practice, you would either send the code to grade to the grader-api
  // or use e.g. a message queue that the grader api would read and process
  // return new Response(JSON.stringify({ result: result }));
};

// Check for new items constantly
checkForNewItems(myQueue);

const portConfig = { port: 7000, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);


