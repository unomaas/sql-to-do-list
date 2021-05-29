//#region ⬇⬇ All document setup & event handlers below:
// ⬇ Document setup below:
console.log('JavaScript loaded!');
$(document).ready(function () {
  console.log('jQuery loaded!');
  refreshDom();
  addEventHandlers();
}); // End document ready


// ⬇ Event handlers below:
function addEventHandlers() {
  $('#taskInputArea').on('click', '#submitButton', clickedSubmit);
  $('#taskOutput').on('click', '.checkboxes', markComplete);
} // End addEventHandlers()
//#endregion ⬆⬆ All document setup & event handlers above. 



//#region ⬇⬇ All functions below:
// ⬇ refreshDom GET functionality below:
function refreshDom() {
  console.log('In refreshDom');
  // ⬇ Getting the data from the server to load on page:
  $.ajax({
    method: 'GET',
    url: '/tasks'
  }) // End .ajax
    .then(response => {
      console.log('In refreshDOM .then, response:', response);
      // ⬇ Saving the response to a variable:
      let tasks = response;
      // ⬇ Emptying the output area each time:
      $('#taskOutput').empty();
      // ⬇ Looping through the DB to append to DOM:
      for (let i = 0; i < tasks.length; i += 1) {
        let task = tasks[i];
        // For each task, append a new row to our table
        $('#taskOutput').append(`
          <tr>
            <td><input type="checkbox" class="checkboxes" data-id="${task.id}"></td>
            <td>${task.name}</td>
            <td><button class="editButtons" data-id="${task.id}">Edit</button></td>
            <td><button class="editButtons" data-id="${task.id}">Delete</button></td>
          </tr>
        `); // End #taskOutput append.
      } // End for loop.
    }) // End .then
    .catch(error => {
      console.log('In refreshDOM .catch, error:', error);
      alert('Unable to load page at this time, please try again later.')
    }) // End .catch
} // End refreshDom()


// ⬇ clickedSubmit POST functionality below:
function clickedSubmit() {
  console.log('In clickedSubmit');
  // ⬇ Declaring empty object variable to hold the task input:
  let task = {};
  task.name = $('#taskInput').val();
  // ⬇ Sending that input to the server /tasks POST route:
  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: task,
  }) // End .ajax
    .then(response => {
      console.log('In clickedSubmit .then, response:', response);
      refreshDom();
    }) // End .then
    .catch(error => {
      console.log('In clickedSubmit .catch, error:', error);
      alert('Unable to add task at this time, please try again later.')
    }); // End .catch
} // End clickedSubmit() 

// {/* <td><button class="editButtons" data-id="${task.id}">Edit</button></td> */}

function markComplete() {
  console.log('In markComplete');
  // ⬇ Saving the clicked task id to a variable: 
  let taskId = $(this).data("id"); // Something wrong here. 
  console.log('Task to mark complete is:', taskId);
  // ⬇ Sending that they marked it complete to the server:
  $.ajax({
    method: 'PUT',
    url: `tasks/${taskId}`,
    data: {
      complete: true // Will be on: req.body.complete
    } // End data object
  }) // End .ajax
    .then(response => {
      console.log('In PUT /tasks, response:', response);
      refreshBooks();
    }) // End .then
    .catch(error => {
      console.log('In PUT /tasks, error:', error);
      alert(`There was an error with marking complete:`, error)
    }); // End .catch
}// End markComplete()
//#endregion ⬆⬆ All functions above. 



// Function to handle the click event and pass the book id to the deleteBook function:
// function readHandler() {
//   console.log('In readHandler');
//   markedRead($(this).data("id"));
// } // End readHandler()

// function markedRead(bookId) {
//   console.log('In markedRead');
//   $.ajax({
//     method: 'PUT',
//     url: `books/${bookId}`,
//     data: {
//       isRead: true // Will be on: req.body.isRead
//     }
//   }) // End .ajax
//     .then(response => {
//       console.log('In PUT /books/id. Response:', response);
//       refreshBooks();
//     }) // End .then
//     .catch(error => {
//       console.log('In PUT /books/id. Error:', error);
//       alert(`There was an error with markedRead:`, error)
//     }); // End .catch
// } // End markRead()

// // Function to handle the click event and pass the book id to the deleteBook function:
// function deleteHandler() {
//   console.log('In deleteHandler');
//   deleteBook($(this).data("id"));
// } // End deleteHandler()

// function deleteBook(bookId) {
//   console.log('In deleteBook');
//   $.ajax({
//     method: 'DELETE',
//     url: `/books/${bookId}`,
//   }) // End .ajax
//     .then(response => {
//       console.log('In DELETE /books/id. Response:', response);
//       refreshBooks();
//     }) // End .then
//     .catch(error => {
//       console.log('In DELETE /books/id. Error:', error);
//       alert(`There was a problem deleting that book, please try again:`, error);
//     }); // End .catch
// } // End deleteBook()



// // refreshBooks will get all books from the server and render to page
// function refreshBooks() {
//   $.ajax({
//     type: 'GET',
//     url: '/books'
//   }).then(function (response) {
//     console.log(response);
//     renderBooks(response);
//   }).catch(function (error) {
//     console.log('error in GET', error);
//   });
// }


// // Displays an array of books to the DOM
// function renderBooks(books) {
//   $('#bookShelf').empty();

//   for (let i = 0; i < books.length; i += 1) {
//     let book = books[i];
//     // For each book, append a new row to our table
//     $('#bookShelf').append(`
//       <tr>
//         <td>${book.title}</td>
//         <td>${book.author}</td>
//         <td>${book.isRead}</td>
//         <td><button class="readButtons" data-id="${book.id}">Mark As Read</button></td>
//         <td><button class="deleteButtons" data-id="${book.id}">Delete Book</button></td>
//       </tr>
//     `);
//   }
// }


