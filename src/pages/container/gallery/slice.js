import { createSlice } from '@reduxjs/toolkit';

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    galleries: [],
    selectedGallery: {},
    galleryCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    // Create
    addGallery: state => { state.loading = true; },
    addGallerySuccess: (state, action) => {
      state.loading = false;
      state.galleries.push(action.payload);
    },
    addGalleryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Get all
    getGalleries: state => { state.loading = true; },
    getGalleriesSuccess: (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload)) {
        state.galleries = action.payload;
        state.galleryCount = action.payload.length || 0;
      } else {
        state.galleries = action.payload.data || [];
        state.galleryCount = action.payload.total || action.payload.data?.length || 0;
      }
      state.error = null; // Clear previous errors
    },

    getGalleriesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Get by ID
    getGalleryById: state => { state.loading = true; },
    getGalleryByIdSuccess: (state, action) => {
      state.loading = false;
      state.selectedGallery = action.payload;
      state.error = null; // Clear previous errors
    },
    getGalleryByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Total Count (optional, can be removed if using getGalleriesSuccess)
    totalGalleryCount: state => { state.loading = true; },
    totalGalleryCountSuccess: (state, action) => {
      state.loading = false;
      state.galleryCount = action.payload.count;
    },
    totalGalleryCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update
    updateGallery: state => { state.loading = true; },
    updateGallerySuccess: (state, action) => {
      state.loading = false;
      const updated = action.payload;
      state.galleries = state.galleries.map((item) =>
        item._id === updated._id ? updated : item
      );
      if (state.selectedGallery?._id === updated._id) {
        state.selectedGallery = updated;
      }
    },
    updateGalleryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete
    deleteGallery: state => { state.loading = true; },
    deleteGallerySuccess: (state, action) => {
      const deletedId = action.payload;
      state.loading = false;
      state.galleries = state.galleries.filter((g) => g._id !== deletedId);
      if (state.selectedGallery?._id === deletedId) {
        state.selectedGallery = {};
      }
    },
    deleteGalleryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getGalleries,
  getGalleriesSuccess,
  getGalleriesFail,
  addGallery,
  addGallerySuccess,
  addGalleryFail,
  getGalleryById,
  getGalleryByIdSuccess,
  getGalleryByIdFail,
  totalGalleryCount,
  totalGalleryCountSuccess,
  totalGalleryCountFail,
  updateGallery,
  updateGallerySuccess,
  updateGalleryFail,
  deleteGallery,
  deleteGallerySuccess,
  deleteGalleryFail
} = gallerySlice.actions;

export default gallerySlice.reducer;