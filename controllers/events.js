const Event = require("../models/Events");

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("user", "name");

    res.json({ ok: true, events });
  } catch {
    res.status(500).json({ ok: false, msg: "Server error" });
  }
};

const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);

    event.user = req.uid;

    const createdEvent = await event.save();

    res.status(201).json({ ok: true, msg: "Event created", createdEvent });
  } catch {
    res.status(500).json({ ok: false, msg: "Server error" });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ ok: false, msg: "Event does not exist" });
    }

    if (event.user.toString() !== req.uid) {
      return res.status(403).json({
        ok: false,
        msg: "Event does not belong to the user",
      });
    }

    const newEvent = {
      ...req.body,
      user: req.uid,
    };

    const updatedEvent = await Event.findByIdAndUpdate(id, newEvent, {
      new: true,
    });

    res.json({ ok: true, msg: "Event updated", updatedEvent });
  } catch {
    res.status(500).json({ ok: false, msg: "Server error" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ ok: false, msg: "Event does not exist" });
    }

    if (event.user.toString() !== req.uid) {
      return res.status(403).json({
        ok: false,
        msg: "Event does not belong to the user",
      });
    }

    const deletedEvent = await Event.findByIdAndDelete(id);

    res.json({ ok: true, msg: "Event deleted", deletedEvent });
  } catch {
    res.status(500).json({ ok: false, msg: "Server error" });
  }
};

module.exports = { getAllEvents, createEvent, updateEvent, deleteEvent };
