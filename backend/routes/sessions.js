const express = require("express");
const router = express.Router();
const FocusSession = require("../models/FocusSession");

router.post("/", async (req, res) => {
  try {
    const session = new FocusSession(req.body);
    const saved = await session.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const sessions = await FocusSession.find();
  res.json(sessions);
});

module.exports = router;
