import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  enquiries: [],
  enquiryByIdData: {},
  enquiryCount: 0,
  newCount: 0,
  newEnquiries: [], // Add field to store new enquiries
  loading: false,
  error: null,
};

const enquirySlice = createSlice({
  name: 'enquiries',
  initialState,
  reducers: {
    // Request actions
    getEnquiries: (state) => {
      state.loading = true;
      state.error = null;
    },
    getEnquiryById: (state) => {
      state.loading = true;
      state.error = null;
    },
    createEnquiry: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateEnquiry: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteEnquiry: (state) => {
      state.loading = true;
      state.error = null;
    },
    getEnquiryCount: (state) => {
      state.loading = true;
      state.error = null;
    },
    getNewEnquiryCount: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Success actions
    getEnquiriesSuccess: (state, action) => {
      state.loading = false;
      state.enquiries = action.payload.enquiry;
      state.enquiryCount = action.payload.count;
      state.error = null;
    },
    getEnquiryByIdSuccess: (state, action) => {
      state.loading = false;
      state.enquiryByIdData = action.payload.enquiry;
      state.error = null;
    },
    createEnquirySuccess: (state, action) => {
      state.loading = false;
      state.enquiries = [action.payload.enquiry, ...state.enquiries];
      state.enquiryCount += 1;
      state.newCount += 1;
      state.newEnquiries = [
        { id: action.payload.enquiry._id, fName: action.payload.enquiry.fName, enqNo: action.payload.enquiry.enqNo, createdAt: action.payload.enquiry.createdAt },
        ...state.newEnquiries,
      ];
      state.error = null;
    },
    updateEnquirySuccess: (state, action) => {
      state.loading = false;
      const updated = action.payload.enquiry;
      state.enquiries = current(state.enquiries).map((enquiry) =>
        enquiry._id === updated._id ? updated : enquiry
      );
      if (state.enquiryByIdData._id === updated._id) {
        state.enquiryByIdData = updated;
      }
      if (updated.status !== 'new' && state.newCount > 0) {
        state.newCount -= 1;
        state.newEnquiries = state.newEnquiries.filter(enq => enq.id !== updated._id);
      }
      state.error = null;
    },
    deleteEnquirySuccess: (state, action) => {
      state.loading = false;
      const deletedId = action.payload;
      const deletedEnquiry = current(state.enquiries).find(
        (enquiry) => enquiry._id === deletedId
      );
      state.enquiries = current(state.enquiries).filter(
        (enquiry) => enquiry._id !== deletedId
      );
      if (state.enquiryByIdData._id === deletedId) {
        state.enquiryByIdData = {};
      }
      if (deletedEnquiry && deletedEnquiry.status === 'new' && state.newCount > 0) {
        state.newCount -= 1;
        state.newEnquiries = state.newEnquiries.filter(enq => enq.id !== deletedId);
      }
      state.enquiryCount -= 1;
      state.error = null;
    },
    getEnquiryCountSuccess: (state, action) => {
      state.loading = false;
      state.enquiryCount = action.payload.count;
      state.error = null;
    },
    getNewEnquiryCountSuccess: (state, action) => {
      state.loading = false;
      state.newCount = action.payload.count;
      state.newEnquiries = action.payload.enquiries || [];
      state.error = null;
    },
    addNotification: (state, action) => {
      state.newCount += 1;
      state.newEnquiries = [
        { id: action.payload.id, fName: action.payload.fName, enqNo: action.payload.enqNo, createdAt: action.payload.createdAt },
        ...state.newEnquiries,
      ];
    },

    // Failure action
    enquiryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Reset action
    resetEnquiryState: () => initialState,
  },
});

export const {
  getEnquiries,
  getEnquiryById,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiryCount,
  getNewEnquiryCount,
  getEnquiriesSuccess,
  getEnquiryByIdSuccess,
  createEnquirySuccess,
  updateEnquirySuccess,
  deleteEnquirySuccess,
  getEnquiryCountSuccess,
  getNewEnquiryCountSuccess,
  addNotification,
  enquiryFailure,
  resetEnquiryState,
} = enquirySlice.actions;

export default enquirySlice.reducer;