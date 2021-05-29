//#region ⬇⬇ Document setup below:
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
//#endregion ⬆⬆ Document setup above. 



//#region ⬇⬇ All CRUD routes below:
// ⬇ /tasks GET functionality below:
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


// ⬇ /tasks POST functionality below:
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
      res.sendStatus(201);
    }) // End .then
    .catch(error => {
      console.log(`Error adding new book`, error);
      res.sendStatus(500);
    }); // End .catch
}); // End /tasks POST

// TODO - PUT
// Updates a book to show that it has been read
// Request must include a parameter indicating what book to update - the id
// Request body must include the content to update - the status

// ⬇ /tasks PUT functionality below:
router.put('/:id', (req, res) => {
  console.log('In /tasks router PUT');
  // ⬇ Grabbing id task from the req params:
  let taskId = req.params.id;
  console.log('Task to mark complete is:', taskId);
  // ⬇ Declaring variables to compare and add to:
  let complete = req.body.complete;
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
  pool.query(queryText, [taskId])
    .then(response => {
      console.log('Marked complete on tasks ID:', taskId);
      res.sendStatus(202); // Accepted.
    }) // End .then
    .catch(error => {
      console.log('Unable to mark complete, error:', error);
      res.sendStatus(500);
    }); // End .catch
}); // End /tasks PUT

// TODO - DELETE 
// Removes a book to show that it has been read
// Request must include a parameter indicating what book to update - the id

// router.delete( "/:id", ( req, res ) => {
//   console.log( 'In router.delete' );
//   // ⬇ Grabbing id of record to delete from the req params:
//   const itemToDelete = req.params.id;
//   console.log( 'The ID to delete is:', itemToDelete ); 
//   // ⬇ Creating queryText to send to SQL:
//   const queryText = `DELETE FROM "books" WHERE "books".id = $1;`;
//   // ⬇ itemToDelete needs to be an array:
//   pool.query( queryText, [itemToDelete] )
//     .then( response => {
//       console.log( 'Deleted the book with ID:', itemToDelete );
//       res.sendStatus( 202 ); // "Accepted"
//     }) // End .then
//     .catch( error => {
//       console.log( 'Unable to delete book. Error:', error );
//       res.sendStatus( 500 );
//     }); // End .catch
// }) // End router.delete

//#endregion ⬆⬆ All CRUD routes above. 


module.exports = router;
