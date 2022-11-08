const express = require("express");
const router = express.Router();
const {
  getContacts,
  setContacts,
  updateContacts,
  deleteContacts,
} = require("../controllers/contactController");

router.route("/").get(getContacts).post(setContacts);
router.route("/:id").delete(deleteContacts).put(updateContacts);

module.exports = router;
