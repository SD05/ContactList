const asyncHandler = require("express-async-handler");

// @desc    Get Contacts
// @route   Get /api/goals
// @access  Public
const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Contacts" });
});

// @desc    Set Contacts
// @route   Set /api/goals
// @access  Public
const setContacts = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add the required fields");
  }
  res.status(200).json({ message: "Create Contacts" });
});

// @desc    Update Contacts
// @route   PUT /api/goals
// @access  Public
const updateContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Contacts ${req.params.id}` });
});

// @desc    Delete Contacts
// @route   DELETE /api/goals
// @access  Public
const deleteContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Contacts ${req.params.id}` });
});

module.exports = { getContacts, setContacts, updateContacts, deleteContacts };
