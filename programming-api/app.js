import * as programmingAssignmentService from "./services/programmingAssignmentService.js";
import { serve } from "./deps.js";
import { sql } from "./database/database.js";
// import { connect } from "./deps.js";

// import { createClient } from "npm:redis@4.6.4";

// const client = createClient({
//   url: "redis://redis:6379",
//   pingInterval: 1000,
// });
// await client.connect();

// import { createClient } from "npm:redis@^4.5";

// const redis = new createClient({
//   url: "redis://localhost:6379",
// });

// await redis.connect();


// Use redis to implement message queue
// const redis = await connect({
//   hostname: "redis",
//   port: 6379,
// });


const getGrade = async (request) => {
  const programmingAssignments = await programmingAssignmentService.findAll();
  const requestData = await request.json();
  console.log(requestData)

  // requestData["assIndex"] contains the current order of assignment used by user
  const testCode = programmingAssignments[requestData["assIndex"] - 1]["test_code"]; 
  const user_code = requestData.code
  const userUuid = requestData.userUuid
  const data = {
    testCode: testCode,
    code: user_code,
    userUuid: userUuid
  };

  console.log("Data: ")
  console.log(data)

  // push the data to queue, use userUuid as the key
  // await redis.rpush(`${userUuid}`, JSON.stringify(data))
  // const server = new WebSocket.Server({ port: 3000 });


  // OLD HTTP REQUEST
  const response = await fetch("http://grader-api:7000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let apiRes = await response.json()
  console.log("apiRes:")
  console.log(apiRes)

  let feedback = apiRes.result
  let ret;
  if (feedback.search("OK") > 0){ // feedback.search("Traceback") || feedback.search("ERROR") || feedback.search("error")
    // 1 means PASS
    console.log("PASS")
    ret = {res: feedback, status: 1}
    console.log("ret: ")
    console.log(ret)
    // return new Response(JSON.stringify({ result: ret }));

  }
  else{
    // 0 means FAIL
    console.log("ERROR")
    ret = {res: feedback, status: 0}
    console.log("ret: ")
    console.log(ret)
    // return new Response(JSON.stringify({ result: ret }));
  }


  // init variable
  var isCorrect = ret.status === 1 ? true : false;

  try{
    // Submitting programming assignment to DB
    console.log("INSERTING SUBMISSION: ")
    console.log('res: ', user_code)
    // console.log("res: ", apiRes['result'])
    // params: programmingAssignmentId, code, userUuid, correct, grader_feedback
    console.log("res: ", requestData["assIndex"], user_code, requestData.userUuid, isCorrect, feedback)
    await programmingAssignmentService.insertSubmission(requestData["assIndex"], user_code, requestData.userUuid, isCorrect, feedback)
    console.log("Success inserting assignment")
  
  }
  catch(e){
    console.log(e)
  }

  return new Response(JSON.stringify({ ret }));
  // Subscribe to the uuid
  // redis.subscribe(`${userUuid}`);

  // await client.subscribe(
  //   `${userUuid}`,
  //   (message, channel) => console.log("INFO",message, channel),
  // );

  // client.publish(`channel`, "HELO")


  // let apiRes = await response.json()

  console.log("apiRes:")
  console.log(apiRes)


  // console.log(client)
  console.log("userUuid: ",userUuid)
  
  // If the message is available 
  // await client.subscribe(`chan`, async (message, channel) => {
  //   console.log(`Received message from channel ${channel}: ${message}`);

  //   let ret
  //   let feedback = apiRes.result

  //   console.log(feedback)
  //   console.log("find: ", feedback.search("Traceback"), feedback.search("ERROR"), feedback.search("error"))
  //   console.log(feedback.search("OK"))
  //   // string.find() will return -1 if there is NO "Traceback" or error
  //   if (feedback.search("OK") > 0){ // feedback.search("Traceback") || feedback.search("ERROR") || feedback.search("error")
  //     // 1 means PASS
  //     console.log("PASS")
  //     ret = {res: feedback, status: 1}
  //     console.log("ret: ")
  //     console.log(ret)
  //     // return new Response(JSON.stringify({ result: ret }));

  //   }
  //   else{
  //     // 0 means FAIL
  //     console.log("ERROR")
  //     ret = {res: feedback, status: 0}
  //     console.log("ret: ")
  //     console.log(ret)
  //     // return new Response(JSON.stringify({ result: ret }));
  //   }

    // init variable
    var isCorrect = ret.status === 1 ? true : false;

    try{
      // Submitting programming assignment to DB
      console.log("INSERTING SUBMISSION: ")
      console.log('res: ', user_code)
      // console.log("res: ", apiRes['result'])
      // params: programmingAssignmentId, code, userUuid, correct, grader_feedback
      console.log("res: ", requestData["assIndex"], user_code, requestData.userUuid, isCorrect, feedback)
      await programmingAssignmentService.insertSubmission(requestData["assIndex"], user_code, requestData.userUuid, isCorrect, feedback)
      console.log("Success inserting assignment")
    
    }
    catch(e){
      console.log(e)
    }

    // Quit redis
    // redis.quit()

    // In the end after the submission is stored, return the result
    return new Response(JSON.stringify({ ret }));
  // }
  // );


  
};

// Get number of API, directly update it to svelte store
const getNumberHandoutsApi = async () =>{
  // run it, and update lenAssignment
  let lenAssignment = await programmingAssignmentService.getNumberHandouts()
  console.log(lenAssignment)
  lenAssignment = lenAssignment[0]
  console.log("lenASs: " + lenAssignment)
  return new Response(JSON.stringify({ result: lenAssignment }));
}
// getNumberHandoutsApi()


const getHandout = async (request, urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;
  const handout = await programmingAssignmentService.getHandout(id);
  console.log(id)
  if (handout.length === 0) {
    return new Response("Program not found", { status: 404 });
  }
  return Response.json(handout);
  }

const getLatestAss = async (request) => {
  const requestData = await request.json();

  // Get the latest assignmentID of a user
  let assId;
  let handout;
  try{ // The user doesn't exist yet
    assId = await programmingAssignmentService.getLatestAss(requestData.userUuid)
    console.log("assID: ", assId)
    assId = assId[0].programming_assignment_id
    console.log("assID: ", assId)
    
  }
  catch(e){
    console.log(e)
    console.log("User not yet have any submission")
    return new Response(JSON.stringify({ result: null, status: 0 }))
  }
  // Get the handout from the assignmentID
  let handoutStr = await programmingAssignmentService.getHandout(assId)

  // CREATING OR REASSIGNING VARIABLE, AS IF YOU DIRECTLY ACCESS
  // THE DATA FROM AWAIT FUNCTION, IT WILL RETURN UNDEFINED
  handoutStr = handoutStr[0].handout
  console.log(handoutStr)
  // console.log(handout.handout)
  // console.log(handout[0])
  // console.log(handout[0].handout)


  if (handoutStr.length === 0) {
    console.log("Status: 0")
    return new Response(JSON.stringify({ result: handoutStr, status: 0, assId: assId }));
  }
  console.log("Status: 1")

  return new Response(JSON.stringify({ result: handoutStr, status: 1, assId: assId }));
}


// Check whether the SAME CODE exist
const checkSameCode = async (request) =>{
  // CHECK
  let s = await programmingAssignmentService.findSubmission()
  console.log("SUBMISSIONS :", s)
  // CHECK
  const requestData = await request.json()
  console.log(requestData)
  const checkData = await programmingAssignmentService.isSamecode(requestData.code, requestData.assIndex)
  console.log("Check:", checkData)
  
  // If there is no similar code, result checkData would be empty
  if (checkData === undefined || checkData.length === 0){
    console.log("CHECK DATA UNDEFINED")
    return new Response(JSON.stringify({result: null, status: 0, correct:null}))
  }

  console.log("CHECK DATA DEFINED")
  console.log(checkData[0])
  return new Response(JSON.stringify({grader_feedback: checkData[0].grader_feedback, status:1, correct:checkData[0].correct}))
}


const urlMapping = [
  {
      method: "GET",
      pattern: new URLPattern({pathname: "/grade/handout/:id"}),
      fn: getHandout
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/grade/latestAss" }),
    fn: getLatestAss,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/grade" }),
    fn: getGrade,
  },
  {
    method: "POST",
    pattern: new URLPattern({pathname: "/grade/checkSame"}),
    fn: checkSameCode
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/grade/lenAss"}),
    fn: getNumberHandoutsApi
  }

];

const handleRequest = async (request) => {
  const mapping = urlMapping.find(
    (um) => um.method === request.method && um.pattern.test(request.url)
  );

  if (!mapping) {
    return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);
  try{
    return await mapping.fn(request, mappingResult)
  }catch (e){
    console.log(e)
    return new Response(e.stack, {status: 500})
  }
};


const portConfig = { port: 7777, hostname: "0.0.0.0" };
serve(handleRequest, portConfig);
