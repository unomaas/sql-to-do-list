//#region ⬇⬇ All document setup & event handlers below:
// ⬇ Document setup:
console.log('JavaScript loaded!');
$(document).ready(function () {
  console.log('jQuery loaded!');
  refreshDom();
  addEventHandlers();
}); // End document setup


/** ⬇ Event handlers:
 * Function to contain all of the event handlers on the page. 
 */
function addEventHandlers() {
  $('#taskInputArea').on('click', '#submitButton', clickedSubmit);
  $('#taskOutput').on('click', '.completeBoxes', clickedComplete);
  $('#taskOutput').on('click', '.deleteButtons', clickedDelete);
} // End addEventHandlers()
//#endregion ⬆⬆ All document setup & event handlers above. 



//#region ⬇⬇ All CRUD functions below:
/** ⬇ refreshDom GET functionality:
 * Function that runs on document ready page load.  Connects to the database and pulls all tasks to render on page.  Each task row comes with a complete checkbox, task name, edit button, and delete button. 
 */
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
        // ⬇ Saving each loop iteration to simple variable:
        let task = tasks[i];
        // ⬇ For each task, append a new row to the table:
        $('#taskOutput').append(`
          <tr>
            <td><input type="checkbox" class="completeBoxes" data-id="${task.id}"></td>
            <td>${task.name}</td>
            <td><button class="editButtons" data-id="${task.id}">Edit</button></td>
            <td><button class="deleteButtons" data-id="${task.id}">Delete</button></td>
          </tr>
        `); // End #taskOutput append.
      } // End for loop.
    }) // End .then
    .catch(error => {
      console.log('In refreshDOM .catch, error:', error);
      alert('Unable to load page at this time, please try again later.')
    }) // End .catch
} // End refreshDom()



/** ⬇ clickedSubmit POST functionality:
 * Function to add a task to the list, triggered by the user clicking the "ADD" button with text in the task input field.  Task cannot be added if input field is blank.  Once done, it should add the task to the bottom of the task list.  This is reversible by clicking delete for that specific task.  
 */
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


/** ⬇ clickedComplete PUT functionality:
 * Function to mark a task as complete, triggered by the user clicking the checkbox input.  Once done, it should change the background color of the task and strike-through the text.  This is reversible by un-checking the same checkbox input. 
 */
function clickedComplete() {
  console.log('In clickedComplete');
  // ⬇ Saving the clicked task id to a variable: 
  let taskId = $(this).data("id"); 
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
      // ⬇ Can I figure out a way to have the checkbox marked if complete === true on refresh?
      // refreshDom();  
    }) // End .then
    .catch(error => {
      console.log('In PUT /tasks, error:', error);
      alert(`There was an error with marking complete:`, error)
    }); // End .catch
}// End clickedComplete()


/** ⬇ clickedDelete DELETE functionality:
 * Function to delete a task from the DOM and DB, triggered by the user clicking the delete button.  Once done, it is not reversible. 
 */
function clickedDelete() {
  console.log('In clickedDelete');
  // ⬇ Saving the clicked task id to a variable: 
  let taskId = $(this).data("id"); 
  console.log('Task to delete is:', taskId);
  // ⬇ Sending that they want to delete it to the server:
  $.ajax({
    method: 'DELETE', 
    url: `tasks/${taskId}`
  }) // End .ajax
    .then(response => {
      console.log('In DELETE /tasks, response:', response);
      refreshDom();
    }) // End .then
    .catch(error => {
      console.log('In DELETE /tasks, error:', error);
      alert(`There was an error with deleting this task:`, error);
    }); // End .catch
} // End clickedDelete()
//#endregion ⬆⬆ All CRUD functions above. 

