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
      console.log('In /tasks GET .then, response:', res);
      // ⬇ Sends back the results in an object, we always want rows:
      res.send(result.rows);
    }) // End .then
    .catch(error => {
      console.log('In /tasks GET .catch, error:', error);
      res.sendStatus(500); // Server error. 
    }); // End .catch
});

// Adds a new book to the list of awesome reads
// Request body must be a book object with a title and author.
router.post('/',  (req, res) => {
  let newBook = req.body;
  console.log(`Adding book`, newBook);

  let queryText = `INSERT INTO "books" ("author", "title")
                   VALUES ($1, $2);`;
  pool.query(queryText, [newBook.author, newBook.title])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new book`, error);
      res.sendStatus(500);
    });
});

// TODO - PUT
// Updates a book to show that it has been read
// Request must include a parameter indicating what book to update - the id
// Request body must include the content to update - the status
router.put( '/:id', ( req, res ) => {
  console.log( 'In router.put' );
  // ⬇ Grabbing id of record to delete from the req params:
  const bookId = req.params.id;
  console.log( 'The book to mark read is:', bookId );
  // ⬇ Declaring variables to compare and add to:
  let isRead = req.body.isRead;
  let queryText = ``;
  // ⬇ Creating if else statement for queryText to send to SQL:
  if ( isRead === 'true' ) {
    console.log( 'In router.put if isRead true' );
    queryText = `UPDATE "books" SET "isRead" = NOT "isRead" WHERE "books".id = $1;`;
  } else {
    console.log( 'In router.put else' );
    res.sendStatus( 500 );
    return;
  } // End if statement.
  pool.query( queryText, [bookId] )
    .then( response => {
      console.log( 'Marked isRead on book ID:', bookId );
      res.sendStatus( 202 ); // Accepted.
    }) // End .then
    .catch( error => {
      console.log( 'Unable to mark isRead. Error:', error );
      res.sendStatus( 500 );
    }); // End .catch
})

// TODO - DELETE 
// Removes a book to show that it has been read
// Request must include a parameter indicating what book to update - the id
router.delete( "/:id", ( req, res ) => {
  console.log( 'In router.delete' );
  // ⬇ Grabbing id of record to delete from the req params:
  const itemToDelete = req.params.id;
  console.log( 'The ID to delete is:', itemToDelete ); 
  // ⬇ Creating queryText to send to SQL:
  const queryText = `DELETE FROM "books" WHERE "books".id = $1;`;
  // ⬇ itemToDelete needs to be an array:
  pool.query( queryText, [itemToDelete] )
    .then( response => {
      console.log( 'Deleted the book with ID:', itemToDelete );
      res.sendStatus( 202 ); // "Accepted"
    }) // End .then
    .catch( error => {
      console.log( 'Unable to delete book. Error:', error );
      res.sendStatus( 500 );
    }); // End .catch
}) // End router.delete
//#endregion ⬆⬆ All CRUD routes above. 


module.exports = router;
