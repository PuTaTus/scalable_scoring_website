import http from "k6/http";

export const options = {
    duration: "5s",
    vus: 10,
    summaryTrendStats: ["avg", "med", "p(99)"],
};

const test = {
    "user": "76f76282-933f-461b-bd71-235859383662",
    "code": "def hello():\n    return \"Hello\"",
    "assIndex": 2,
    "userUuid": "76f76282-933f-461b-bd71-235859383662",
    "key": 14685
  }

export default function () {
    http.post("http://localhost:7800/api/grade", JSON.stringify(test));

  }