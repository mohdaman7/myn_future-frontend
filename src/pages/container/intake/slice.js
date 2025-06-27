import { createSlice } from '@reduxjs/toolkit';

const intakeSlice = createSlice({
  name: 'intakes',
  initialState: {
    intakes: [],
    selectedIntake: {},
    intakeCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    // Create intake
    addIntake: (state) => {
      state.loading = true;
      state.error = null;
    },
    addIntakeSuccess: (state, action) => {
      state.loading = false;
      state.intakes.push(action.payload);
      state.error = null; // Clear error on success
    },
    addIntakeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to add intake';
    },

    // Get all intakes
    getIntakes: (state) => {
      state.loading = true;
      state.error = null;
    },
    getIntakesSuccess: (state, action) => {
      state.loading = false;
      state.intakes = Array.isArray(action.payload) ? action.payload : [];
      state.error = null;
    },
    getIntakesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch intakes';
    },

    // Get intake by ID
    getIntakeById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getIntakeByIdSuccess: (state, action) => {
      state.loading = false;
      state.selectedIntake = action.payload || {};
      state.error = null;
    },
    getIntakeByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch intake';
    },

    // Get total count
    totalCount: (state) => {
      state.loading = true;
      state.error = null;
    },
    totalCountSuccess: (state, action) => {
      state.loading = false;
      state.intakeCount = action.payload?.count ?? 0;
      state.error = null;
    },
    totalCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch intake count';
    },

    // Update intake
    updateIntake: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateIntakeSuccess: (state, action) => {
      state.loading = false;
      const updated = action.payload;
      if (updated?._id) {
        state.intakes = state.intakes.map((item) =>
          item._id === updated._id ? updated : item
        );
        if (state.selectedIntake?._id === updated._id) {
          state.selectedIntake = updated;
        }
      }
      state.error = null;
    },
    updateIntakeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to update intake';
    },

    // Delete intake (soft)
    deleteIntake: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteIntakeSuccess: (state, action) => {
      const updated = action.payload;
      state.loading = false;
      if (updated?._id) {
        state.intakes = state.intakes.map((item) =>
          item._id === updated._id ? updated : item
        );
        if (state.selectedIntake?._id === updated._id) {
          state.selectedIntake = updated;
        }
      }
      state.error = null;
    },
    deleteIntakeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to delete intake';
    },

    // Hard delete intake
    hardDeleteIntake: (state) => {
      state.loading = true;
      state.error = null;
    },
    hardDeleteIntakeSuccess: (state, action) => {
      const deletedId = action.payload;
      state.loading = false;
      state.intakes = state.intakes.filter((c) => c._id !== deletedId);
      if (state.selectedIntake?._id === deletedId) {
        state.selectedIntake = {};
      }
      state.error = null;
    },
    hardDeleteIntakeFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to permanently delete intake';
    },

    // Delete all intakes
    deleteAllIntakes: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteAllIntakesSuccess: (state) => {
      state.loading = false;
      state.intakes = [];
      state.selectedIntake = {};
      state.intakeCount = 0;
      state.error = null;
    },
    deleteAllIntakesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to delete all intakes';
    },

    // Reset error
    resetError: (state) => {
      state.error = null;
    },

    // Reset state
    resetState: (state) => {
      state.intakes = [];
      state.selectedIntake = {};
      state.intakeCount = 0;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  addIntake,
  addIntakeSuccess,
  addIntakeFail,
  getIntakes,
  getIntakesSuccess,
  getIntakesFail,
  getIntakeById,
  getIntakeByIdSuccess,
  getIntakeByIdFail,
  totalCount,
  totalCountSuccess,
  totalCountFail,
  updateIntake,
  updateIntakeSuccess,
  updateIntakeFail,
  deleteIntake,
  deleteIntakeSuccess,
  deleteIntakeFail,
  hardDeleteIntake,
  hardDeleteIntakeSuccess,
  hardDeleteIntakeFail,
  deleteAllIntakes,
  deleteAllIntakesSuccess,
  deleteAllIntakesFail,
  resetError,
  resetState,
} = intakeSlice.actions;

export default intakeSlice.reducer;