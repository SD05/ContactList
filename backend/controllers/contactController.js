const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");

// @desc    Get Contacts
// @route   Get /api/goals
// @access  Public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();

  res.status(200).json(contacts);
});

// @desc    Set Contacts
// @route   Set /api/goals
// @access  Public
const setContacts = asyncHandler(async (req, res) => {
  const { name, number, number2 } = req.body;
  if (!name || !number || !number2) {
    res.status(400);
    throw new Error("Please add all the required fields");
  }

  // Check if contact exists
  const userExists = await Contact.findOne({ number });
  if (userExists) {
    res.status(400);
    throw new Error("Contact already exists");
  }

  // Create Contact
  const contact = await Contact.create({ name, number, number2 });
  if (contact) {
    res.status(201).json({
      _id: contact.id,
      name: contact.name,
      number: contact.number,
      number2: contact.number2,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Contact Data");
  }
});

// @desc    Update Contacts
// @route   PUT /api/goals
// @access  Public
const updateContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedContact);
});

// @desc    Delete Contacts
// @route   DELETE /api/goals
// @access  Public
const deleteContacts = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  const deleteGoal = await Goal.findByIdAndRemove(req.params.id);
  res.status(200).json(deleteGoal);
});

module.exports = { getContacts, setContacts, updateContacts, deleteContacts };
