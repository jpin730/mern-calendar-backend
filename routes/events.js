const { Router } = require("express");

const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { validateJwt } = require("../middlewares/validateJwt");

const router = Router();

router.use(validateJwt);

router.get("/", getAllEvents);

router.post("/", createEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
