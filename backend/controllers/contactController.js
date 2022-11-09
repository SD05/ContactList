const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");
const User = require("../models/userModel");

// @desc    Get Contacts
// @route   Get /api/goals
// @access  Public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user: req.user.id });

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
  const contact = await Contact.create({
    user: req.user.id,
    name,
    number,
    number2,
  });
  if (contact) {
    res.status(201).json({
      _id: contact.id,
      name: contact.name,
      number: contact.number,
      number2: contact.number2,
      user: contact.user,
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

  // Check for User
  if (!req.user) {
    res.status(401);
    throw new Error("User not Found");
  }

  // Make sure the logged in user matches with the goal user
  if (contact.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
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
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("Goal not found");
  }
  const deleteContact = await Contact.findByIdAndRemove(req.params.id);
  res.status(200).json(deleteContact);
});

module.exports = { getContacts, setContacts, updateContacts, deleteContacts };
