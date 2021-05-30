//#region ⬇⬇ Document setup below:
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
//#endregion ⬆⬆ Document setup above. 



//#region ⬇⬇ All CRUD routes below:
/** ⬇ /tasks GET functionality:
 * Router function to handle the GET part of the server-side logic.  Will send SQL query to pull all of the tasks from the DB to update on the DOM.
 */
router.get('/', (req, res) => {
  console.log('In /tasks router GET');
  // ⬇ Declaring the SQL commands below:
  let queryText = `SELECT * FROM "tasks" ORDER BY "id";`;
  pool.query(queryText)
    .then(result => {
      console.log('In /tasks GET .then, result:', result.rows);
      // ⬇ Sends back the results in an object, we always want rows:
      res.send(result.rows);
    }) // End .then
    .catch(error => {
      console.log('In /tasks GET .catch, error:', error);
      res.sendStatus(500); // Server error. 
    }); // End .catch
}); // End /tasks GET


/** ⬇ /tasks POST functionality:
 * Router function to handle the POST part of the server-side logic.  Will send SQL query to add a new task to the DB and output to DOM. 
 */
router.post('/', (req, res) => {
  console.log('In /tasks router POST');
  // ⬇ Saving the req.body as a variable:
  let newTask = req.body;
  console.log(`Task to add is:`, newTask);
  // ⬇ Declaring the SQL commands below:
  let queryText = `INSERT INTO "tasks" ("name") VALUES ($1);`;
  pool.query(queryText, [newTask.name])
    .then(result => {
      console.log('In /tasks POST .then, response:', res);
      res.sendStatus(201); // Created. 
    }) // End .then
    .catch(error => {
      console.log(`Error adding new book`, error);
      res.sendStatus(500);
    }); // End .catch
}); // End /tasks POST


/** ⬇ /tasks PUT functionality:
 * Router function to handle the PUT part of the server-side logic.  Will send SQL query to update the task.complete property.  Set to a toggle switch of off or on.
 */
router.put('/:id', (req, res) => {
  console.log('In /tasks router PUT');
  // ⬇ Grabbing id task from the req params:
  let taskId = req.params.id;
  console.log('Task to mark complete is:', taskId);
  // ⬇ Declaring variables to compare and add to:
  let complete = req.body.complete;  
  // ⬇ Creating queryText to send to SQL:
  let queryText = ``;
  // ⬇ Creating if else statement for queryText to send to SQL:
  if (complete === 'true') {
    console.log('In /tasks PUT if complete is true');
    queryText = `UPDATE "tasks" SET "complete" = NOT "complete" WHERE "tasks".id = $1;`;
  } else {
    console.log('In /tasks PUT else');
    res.sendStatus(500);
    return; // Break early if bad.
  } // End if statement.
  // ⬇ taskId (aka $1) value needs to be sent as an array:
  pool.query(queryText, [taskId])
    .then(response => {
      console.log('Marked complete on task ID:', taskId);
      res.sendStatus(202); // Accepted.
    }) // End .then
    .catch(error => {
      console.log('Unable to mark complete, error:', error);
      res.sendStatus(500);
    }); // End .catch
}); // End /tasks PUT


/** ⬇ /tasks DELETE functionality:
 * Router function to handle the DELETE part of the server-side logic.  Will send SQL query to delete the entire row from the DB.  
 */
router.delete("/:id", (req, res) => {
  console.log('In /tasks router DELETE');
  // ⬇ Grabbing id task from the req params:
  let taskId = req.params.id;
  console.log('Task to delete is:', taskId);
  // ⬇ Creating queryText to send to SQL:
  let queryText = `DELETE FROM "tasks" WHERE "tasks".id = $1;`;
  // ⬇ taskId (aka $1) value needs to be sent as an array:
  pool.query(queryText, [taskId])
    .then(response => {
      console.log('Deleted the task with ID:', taskId);
      res.sendStatus(202); // "Accepted"
    }) // End .then
    .catch(error => {
      console.log('Unable to delete task, error:', error);
      res.sendStatus(500);
    }); // End .catch
}) // End /tasks DELETE
//#endregion ⬆⬆ All CRUD routes above. 


// ⬇ Export below:
module.exports = router;
