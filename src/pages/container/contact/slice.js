import { createSlice } from '@reduxjs/toolkit';

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: [],
    selectedContact: {},
    contactCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    // Create contact message
    addContact: (state) => {
      state.loading = true;
      state.error = null;
    },
    addContactSuccess: (state, action) => {
      state.loading = false;
      state.contacts.push(action.payload);
    },
    addContactFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Get all contact messages
    getContacts: (state) => {
      state.loading = true;
      state.error = null;
    },
    getContactsSuccess: (state, action) => {
      state.loading = false;
      state.contacts = action.payload;
    },
    getContactsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Get contact by ID
    getContactById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getContactByIdSuccess: (state, action) => {
      state.loading = false;
      state.selectedContact = action.payload;
    },
    getContactByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Get total count
    totalCount: (state) => {
      state.loading = true;
      state.error = null;
    },
    totalCountSuccess: (state, action) => {
      state.loading = false;
      state.contactCount = action.payload.count;
    },
    totalCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update contact status
    updateContactStatus: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateContactStatusSuccess: (state, action) => {
      state.loading = false;
      const updated = action.payload;
      state.contacts = state.contacts.map((item) =>
        item._id === updated._id ? updated : item
      );
      if (state.selectedContact?._id === updated._id) {
        state.selectedContact = updated;
      }
    },
    updateContactStatusFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete contact
    deleteContact: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteContactSuccess: (state, action) => {
      const deletedId = action.payload;
      state.loading = false;
      state.contacts = state.contacts.filter((c) => c._id !== deletedId);
      if (state.selectedContact?._id === deletedId) {
        state.selectedContact = {};
      }
    },
    deleteContactFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete all contacts
    deleteAllContacts: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteAllContactsSuccess: (state) => {
      state.loading = false;
      state.contacts = [];
      state.selectedContact = {};
      state.contactCount = 0;
    },
    deleteAllContactsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addContact,
  addContactSuccess,
  addContactFail,
  getContacts,
  getContactsSuccess,
  getContactsFail,
  getContactById,
  getContactByIdSuccess,
  getContactByIdFail,
  totalCount,
  totalCountSuccess,
  totalCountFail,
  updateContactStatus,
  updateContactStatusSuccess,
  updateContactStatusFail,
  deleteContact,
  deleteContactSuccess,
  deleteContactFail,
  deleteAllContacts,
  deleteAllContactsSuccess,
  deleteAllContactsFail,
} = contactSlice.actions;

export default contactSlice.reducer;