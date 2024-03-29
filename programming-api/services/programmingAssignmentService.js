import { sql } from "../database/database.js";

const findAll = async () => {
  return await sql`SELECT * FROM programming_assignments;`;
};

const findSubmission = async() => {
  return await sql`SELECT * FROM programming_assignment_submissions`
}

const getHandout = async (assIndex) => {
  return await sql`SELECT handout FROM programming_assignments WHERE assignment_order=${assIndex}`
}

// Total number of assignment handouts.
const getNumberHandouts = async () => {
  return await sql`SELECT COUNT(*) FROM programming_assignments;`
}

const getLatestAss = async (userUuid) => {
  return await sql`
    SELECT programming_assignment_id 
    FROM programming_assignment_submissions 
    WHERE user_uuid = ${userUuid}
    ORDER BY last_updated DESC
  `;
};

const insertSubmission = async (programmingAssignmentId, code, userUuid, correct, grader_feedback ) => {
  const query = sql`
    INSERT INTO programming_assignment_submissions
      (programming_assignment_id, code, user_uuid, correct, grader_feedback)
    VALUES
      (${programmingAssignmentId}, ${code}, ${userUuid}, ${correct}, ${grader_feedback})
    RETURNING *;`;

  try {
    const result = await query;
    return result;
  } catch (error) {
    console.error('Error inserting submission:', error);
    throw error;
  }
};

const isSamecode = async (code, index ) => {
  return await sql`
  SELECT grader_feedback, correct 
  FROM programming_assignment_submissions 
  WHERE code=${code} AND programming_assignment_id=${index}`
}

const getAssignmentByKey = async (key) => {
  return await sql`
    SELECT * 
    FROM programming_assignment_submissions 
    WHERE id = ${key}
  `;
};


export { findAll, getHandout, getNumberHandouts, insertSubmission, getLatestAss, isSamecode, findSubmission, getAssignmentByKey };
