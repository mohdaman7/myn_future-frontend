import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  services: [],
  selectedService: null,
  serviceCount: 0,
  loading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    /* ───────── GET ALL ───────── */
    getServices: (state) => {
      state.loading = true;
      state.error = null;
    },
    getServicesSuccess: (state, { payload }) => {
      state.loading = false;
      state.services = Array.isArray(payload.data) ? payload.data : [];
      state.serviceCount = payload.total || 0;
      state.error = null;
    },
    getServicesFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    /* ───────── GET BY ID ─────── */
    getServiceById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getServiceByIdSuccess: (state, { payload }) => {
      state.loading = false;
      state.selectedService = payload;
      state.error = null;
    },
    getServiceByIdFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    /* ───────── TOTAL COUNT ───── */
    totalServiceCount: (state) => {
      state.loading = true;
      state.error = null;
    },
    totalServiceCountSuccess: (state, { payload }) => {
      state.loading = false;
      state.serviceCount = payload.count || 0;
      state.error = null;
    },
    totalServiceCountFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    /* ───────── ADD ───────────── */
    addService: (state) => {
      state.loading = true;
      state.error = null;
    },
    addServiceSuccess: (state, { payload }) => {
      state.loading = false;
      state.services = [payload, ...state.services]; // Prepend new service
      state.serviceCount += 1;
      state.error = null;
    },
    addServiceFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    /* ───────── UPDATE ────────── */
    updateService: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateServiceSuccess: (state, { payload }) => {
      state.loading = false;
      state.services = state.services.map((item) =>
        item._id === payload._id ? { ...item, ...payload } : item
      );
      if (state.selectedService?._id === payload._id) {
        state.selectedService = { ...state.selectedService, ...payload };
      }
      state.error = null;
    },
    updateServiceFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    /* ───────── SOFT DELETE ───── */
    deleteService: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteServiceSuccess: (state, { payload: id }) => {
      state.loading = false;
      state.services = state.services.filter((s) => s._id !== id);
      state.serviceCount -= 1;
      if (state.selectedService?._id === id) state.selectedService = null;
      state.error = null;
    },
    deleteServiceFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    /* ───────── HARD DELETE ───── */
    hardDeleteService: (state) => {
      state.loading = true;
      state.error = null;
    },
    hardDeleteServiceSuccess: (state, { payload: id }) => {
      state.loading = false;
      state.services = state.services.filter((s) => s._id !== id);
      state.serviceCount -= 1;
      if (state.selectedService?._id === id) state.selectedService = null;
      state.error = null;
    },
    hardDeleteServiceFail: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  getServices,
  getServicesSuccess,
  getServicesFail,
  getServiceById,
  getServiceByIdSuccess,
  getServiceByIdFail,
  totalServiceCount,
  totalServiceCountSuccess,
  totalServiceCountFail,
  addService,
  addServiceSuccess,
  addServiceFail,
  updateService,
  updateServiceSuccess,
  updateServiceFail,
  deleteService,
  deleteServiceSuccess,
  deleteServiceFail,
  hardDeleteService,
  hardDeleteServiceSuccess,
  hardDeleteServiceFail,
} = serviceSlice.actions;

export default serviceSlice.reducer;