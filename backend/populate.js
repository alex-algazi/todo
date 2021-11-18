const mongoose = require('mongoose');

const Task = require('./models/task');

mongoose.connect('mongodb+srv://asa10:8492@cluster0.fseo5.mongodb.net/todo?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database! Populating...')
  })
  .catch(() => {
    console.log('Connection failed!');
  });

const task1 = new Task({
  name: "buy eggs",
  time: Date.now()-1800000
});
task1.save();

const task2 = new Task({
  name: "buy bacon",
  time: Date.now()-36000000
});
task2.save();

const task3 = new Task({
  name: "buy bread",
  time: Date.now()-345600000
});
task3.save();

const task4 = new Task({
  name: "buy milk",
  time: Date.now()-1209600000
});
task4.save();

const task5 = new Task({
  name: "buy orange juice",
  time: Date.now()-18408600000
});
task5.save();

const task6 = new Task({
  name: "buy apple stock",
  time: Date.now()-1262277040000
});
task6.save();
