const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  next();
});

app.post('/tasks', (req, res, next) => {
  const task = req.body;
  console.log(task);
  res.status(201).json({
    message: 'Task added succesfully'
  });
});

app.get('/tasks', (req, res, next) => {
  const tasks = [
      {id: '0281314370', name: "buy eggs", time: Date.now()-1800000},
      {id: '7036436720', name: "buy bacon", time: Date.now()-36000000},
      {id: '2148100824', name: "buy bread", time: Date.now()-345600000},
      {id: '0741274176', name: "buy milk", time: Date.now()-1209600000},
      {id: '9758541129', name: "buy orange juice", time: Date.now()-18396000000},
      {id: '3252674078', name: "buy Apple stock", time: Date.now()-1261440000000}
  ];
  res.status(200).json({
    message: 'Tasks fetched succesfully!',
    tasks: tasks
  });
});

module.exports = app;
