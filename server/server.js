const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const tasksRouter = require('./routes/tasks.router.js');
app.use(bodyParser.urlencoded({extended: true}));
// Serve back static files by default
app.use(express.static('server/public'))
// ROUTES
app.use('/tasks', tasksRouter);
// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});

