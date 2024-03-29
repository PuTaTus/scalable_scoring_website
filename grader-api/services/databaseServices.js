import { sql } from "../database/database.js";

const storeGradingResult = async (programmingAssignmentId, code, userUuid, correct, grader_feedback ) => {
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

export {storeGradingResult};