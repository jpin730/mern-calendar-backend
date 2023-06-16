const { Router } = require("express");
const { check } = require("express-validator");

const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { validateFields } = require("../middlewares/validateFields");
const { validateJwt } = require("../middlewares/validateJwt");
const { isDate } = require("../helpers/isDate");

const router = Router();

router.use(validateJwt);

router.get("/", getAllEvents);

router.post(
  "/",
  [
    check("title", "Valid title is required").not().isEmpty(),
    check("start", "Valid start date is required").custom(isDate),
    check("end", "Valid end date is required").custom(isDate),
    validateFields,
  ],
  createEvent
);

router.put(
  "/:id",
  [
    check("title", "Valid title is required").not().isEmpty(),
    check("start", "Valid start date is required").custom(isDate),
    check("end", "Valid end date is required").custom(isDate),
    validateFields,
  ],
  updateEvent
);

router.delete("/:id", deleteEvent);

module.exports = router;
