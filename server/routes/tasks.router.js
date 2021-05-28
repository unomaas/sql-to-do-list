const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Get all books
router.get('/', (req, res) => {
  let queryText = 'SELECT * FROM "books" ORDER BY "title";';
  pool.query(queryText).then(result => {
    // Sends back the results in an object
    res.send(result.rows);
  })
  .catch(error => {
    console.log('error getting books', error);
    res.sendStatus(500);
  });
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

module.exports = router;
