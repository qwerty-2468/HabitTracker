const express = require("express");
const router = express.Router();
const Habit = require("../models/habit");

router.get("/", async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getHabit, (req, res) => {
  res.json(res.habit);
});

router.post("/", async (req, res) => {
  const habit = new Habit({
    title: req.body.title,
    frequency: req.body.frequency,
    date: req.body.date,
    label: req.body.label,
  });

  try {
    const newHabit = await habit.save();
    res.status(201).json(newHabit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", getHabit, async (req, res) => {
  if (req.body.title != null) {
    res.habit.title = req.body.title;
  }
  if (req.body.frequency != null) {
    res.habit.frequency = req.body.frequency;
  }
  if (req.body.date != null) {
    res.habit.date = req.body.date;
  }
  if (req.body.label != null) {
    res.habit.label = req.body.label;
  }

  try {
    const updatedHabit = await res.habit.save();
    res.json(updatedHabit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", getHabit, async (req, res) => {
  try {
    await res.habit.deleteOne();
    res.json({ message: "Deleted habit" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getHabit(req, res, next) {
  let habit;
  try {
    habit = await Habit.findById(req.params.id);
    if (habit == null) {
      return res.status(404).json({ message: "Habit not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.habit = habit;
  next();
}

module.exports = router;
