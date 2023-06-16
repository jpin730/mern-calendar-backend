const Event = require("../models/Events");

const getAllEvents = (req, res) => {
  res.json({ ok: true, msg: "getAllEvents" });
};

const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);

    event.user = req.uid;

    const createdEvent = await event.save();

    res.status(201).json({ ok: true, msg: "createEvent", createdEvent });
  } catch {
    res.status(500).json({ ok: false, msg: "Server error" });
  }
};

const updateEvent = (req, res) => {
  res.json({ ok: true, msg: "updateEvent" });
};

const deleteEvent = (req, res) => {
  res.json({ ok: true, msg: "deleteEvent" });
};

module.exports = { getAllEvents, createEvent, updateEvent, deleteEvent };
