const express = require('express');

const Task = require('../models/task');

const router = express.Router();

router.post('', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
  const task = new Task ({
    _id: req.body.id,
    name: req.body.name,
    time: req.body.time
  });
  Task.updateOne({_id: req.params.id}, task).then(result => {
    res.status(200).json({message: "Update successful!"});
  });
});

router.get('', (req, res, next) => {
  Task.find()
    .then(documents => {
      res.status(200).json({
        message: 'Tasks fetched succesfully!',
        tasks: documents
      });
    });
});

router.get('/:id', (req, res, next) => {
  Task.findById(req.params.id).then(task => {
    if (task) {
      res.status(200).json(task);
    }
    else {
      res.status(404).json({message: 'Task not found!'});
    }
  });
});

router.delete('/:id', (req, res, next) => {
  Task.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Task deleted!' });
  });
});

module.exports = router;
