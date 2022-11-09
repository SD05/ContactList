import axios from "axios";

const API_URL = "/api/contacts/";

// Create new Contact
const createContact = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  debugger;
  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};

// Get Contacts
const getContacts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Update user Contact
const updateContact = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + goalId, config);

  return response.data;
};

// Delete user Contact
const deleteContact = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + goalId, config);

  return response.data;
};

const goalService = {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
};

export default goalService;
