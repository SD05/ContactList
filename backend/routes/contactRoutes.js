const express = require("express");
const router = express.Router();
const {
  getContacts,
  setContacts,
  updateContacts,
  deleteContacts,
} = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getContacts).post(protect, setContacts);
router
  .route("/:id")
  .delete(protect, deleteContacts)
  .put(protect, updateContacts);

module.exports = router;
