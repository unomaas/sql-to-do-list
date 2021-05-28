$(document).ready(function(){
  console.log('jQuery sourced.');
  refreshBooks();
  addClickHandlers();
});

function addClickHandlers() {
  $('#submitBtn').on('click', handleSubmit);
  // TODO - Add code for edit & delete buttons
  $( '#bookShelf' ).on( 'click', '.deleteButtons', deleteHandler );
  $( '#bookShelf' ).on( 'click', '.readButtons', readHandler );
}

// Function to handle the click event and pass the book id to the deleteBook function:
function readHandler() {
  console.log( 'In readHandler' );
  markedRead( $(this).data( "id" ) );
} // End readHandler()

function markedRead(bookId) {
  console.log( 'In markedRead' );
  $.ajax({
    method: 'PUT', 
    url: `books/${bookId}`,
    data: {
      isRead: true // Will be on: req.body.isRead
    }
  }) // End .ajax
    .then( response => {
      console.log( 'In PUT /books/id. Response:', response );
      refreshBooks();
    }) // End .then
    .catch( error => {
      console.log( 'In PUT /books/id. Error:', error );
      alert( `There was an error with markedRead:`, error )
    }); // End .catch
} // End markRead()

// Function to handle the click event and pass the book id to the deleteBook function:
function deleteHandler() {
  console.log( 'In deleteHandler' );
  deleteBook( $(this).data( "id" ) );
} // End deleteHandler()

function deleteBook(bookId) {
  console.log( 'In deleteBook' );
  $.ajax({
    method: 'DELETE',
    url: `/books/${bookId}`,
  }) // End .ajax
    .then( response => {
      console.log( 'In DELETE /books/id. Response:', response ); 
      refreshBooks();
    }) // End .then
    .catch( error => {
      console.log( 'In DELETE /books/id. Error:', error );
      alert( `There was a problem deleting that book, please try again:`, error );
    }); // End .catch
} // End deleteBook()

function handleSubmit() {
  console.log('Submit button clicked.');
  let book = {};
  book.author = $('#author').val();
  book.title = $('#title').val();
  addBook(book);
} // End handleSubmit()

// adds a book to the database
function addBook(bookToAdd) {
  $.ajax({
    type: 'POST',
    url: '/books',
    data: bookToAdd,
    }) // End .ajax
      .then(function(response) {
        console.log('Response from server.', response);
        refreshBooks();
    }) // End .then
      .catch(function(error) {
        console.log('Error in POST', error)
        alert('Unable to add book at this time. Please try again later.');
    }); // End .catch
} // End addBook()

// refreshBooks will get all books from the server and render to page
function refreshBooks() {
  $.ajax({
    type: 'GET',
    url: '/books'
  }).then(function(response) {
    console.log(response);
    renderBooks(response);
  }).catch(function(error){
    console.log('error in GET', error);
  });
}


// Displays an array of books to the DOM
function renderBooks(books) {
  $('#bookShelf').empty();

  for(let i = 0; i < books.length; i += 1) {
    let book = books[i];
    // For each book, append a new row to our table
    $('#bookShelf').append(`
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isRead}</td>
        <td><button class="readButtons" data-id="${book.id}">Mark As Read</button></td>
        <td><button class="deleteButtons" data-id="${book.id}">Delete Book</button></td>
      </tr>
    `);
  }
}


