const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Task = require('./models/task');

const app = express();

mongoose.connect('mongodb+srv://asa10:8492@cluster0.fseo5.mongodb.net/todo?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  next();
});

app.post('/tasks', (req, res, next) => {
  const task = new Task({
    name: req.body.name,
    time: req.body.time
  });
  task.save().then(createdTask => {
    res.status(201).json({
      message: 'Task added succesfully',
      taskId: createdTask._id
    });
  });
});

app.get('/tasks', (req, res, next) => {
  Task.find()
    .then(documents => {
      res.status(200).json({
        message: 'Tasks fetched succesfully!',
        tasks: documents
      });
    });
});

app.delete('/tasks/:id', (req, res, next) => {
  Task.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Task deleted!' });
  });
});

module.exports = app;
