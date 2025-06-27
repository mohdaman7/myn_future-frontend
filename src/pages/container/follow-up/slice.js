import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  followUps: [],
  followUp: null,
  loading: false,
  error: null,
};

const followUpSlice = createSlice({
  name: 'followUp',
  initialState,
  reducers: {
    // Get All
    getFollowUps: (state) => {
      state.loading = true;
      state.error = null;
    },
    getFollowUpsSuccess: (state, action) => {
      state.loading = false;
      state.followUps = Array.isArray(action.payload) ? action.payload : action.payload.followUp || [];
    },

    // Get By Enquiry ID
    getFollowUpsByEnquiryId: (state) => {
      state.loading = true;
      state.error = null; // Clear error on new request
    },
    getFollowUpsByEnquiryIdSuccess: (state, action) => {
      state.loading = false;
      state.followUps = Array.isArray(action.payload) ? action.payload : [];
    },

    // Get Single
    getFollowUpById: (state) => {
      state.loading = true;
      state.error = null; // Clear error on new request
    },
    getFollowUpByIdSuccess: (state, action) => {
      state.loading = false;
      state.followUp = action.payload || null;
    },

    // Create
    createFollowUp: (state) => {
      state.loading = true;
      state.error = null; // Clear error on new request
    },
    createFollowUpSuccess: (state, action) => {
      state.loading = false;
      state.followUps = [action.payload, ...state.followUps]; // More explicit spread
    },

    // Update
    updateFollowUp: (state) => {
      state.loading = true;
      state.error = null; // Clear error on new request
    },
    updateFollowUpSuccess: (state, action) => {
      state.loading = false;
      state.followUps = state.followUps.map((fu) =>
        fu._id === action.payload._id ? action.payload : fu
      );
      state.followUp = action.payload; // Update single followUp if necessary
    },

    // Delete (Soft)
    deleteFollowUp: (state) => {
      state.loading = true;
      state.error = null; // Clear error on new request
    },
    deleteFollowUpSuccess: (state, action) => {
      state.loading = false;
      state.followUps = state.followUps.filter((fu) => fu._id !== action.payload);
      state.followUp = null; // Clear single followUp if deleted
    },

    // Error
    followUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'An error occurred';
    },
  },
});

export const {
  getFollowUps,
  getFollowUpsSuccess,
  getFollowUpsByEnquiryId,
  getFollowUpsByEnquiryIdSuccess,
  getFollowUpById,
  getFollowUpByIdSuccess,
  createFollowUp,
  createFollowUpSuccess,
  updateFollowUp,
  updateFollowUpSuccess,
  deleteFollowUp,
  deleteFollowUpSuccess,
  followUpFailure,
} = followUpSlice.actions;

export default followUpSlice.reducer;