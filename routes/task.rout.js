const express = require("express");
const Router = express.Router();
const Task = require("../models/task");

Router.route("/tasks")
  .get(async (req, res) => {
    try {
      const tasks = await Task.find({}, { __v: false });
      res.status(200).json({ status: "success", data: { tasks } });
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  })
  .post(async (req, res) => {
    try {
      const task = new Task(req.body);
      await task.save();
      res.status(200).json({ status: "success", data: { task } });
    } catch (err) {
      res.status(400).json({ Error: err.message });
    }
  });

Router.route("/tasks/:id").put(async (req, res) => {
  try {
    const { id } = req.params;
    const datatoUpdate = req.body;
    const task =await Task.findByIdAndUpdate(id, datatoUpdate, { new: true });
     res.status(200).json({ status: "success", data: { task } });
  } catch (err) { res.status(400).json({ Error: err.message });}
}).delete(async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ status: "success", data: null });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
}).get(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id, { __v: false });
  if (!task) return res.status(400).json({ Error: 'Course Not found' })
  res.status(200).json({ status: "success", data: { task } });
})

module.exports = Router;
