// import { createSlice } from '@reduxjs/toolkit';

// export const countrySlice = createSlice({
//   name: 'country',
//   initialState: {
//     countries: [],
//     selectedCountry: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     fetchCountries: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchCountriesSuccess: (state, action) => {
//       state.loading = false;
//       state.countries = action.payload;
//     },
//     fetchCountriesFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     createCountry: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     createCountrySuccess: (state, action) => {
//       state.loading = false;
//       state.countries.push(action.payload);
//     },
//     createCountryFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     getCountryById: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     getCountryByIdSuccess: (state, action) => {
//       state.loading = false;
//       state.selectedCountry = action.payload;
//     },
//     getCountryByIdFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     updateCountry: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     updateCountrySuccess: (state, action) => {
//       state.loading = false;
//       state.countries = state.countries.map(country =>
//         country._id === action.payload._id ? action.payload : country
//       );
//       if (state.selectedCountry?._id === action.payload._id) {
//         state.selectedCountry = action.payload;
//       }
//     },
//     updateCountryFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     deleteCountry: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     deleteCountrySuccess: (state, action) => {
//       state.loading = false;
//       state.countries = state.countries.filter(
//         country => country._id !== action.payload._id
//       );
//       if (state.selectedCountry?._id === action.payload._id) {
//         state.selectedCountry = null;
//       }
//     },
//     deleteCountryFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     // Added for PATCH
//     patchCountry: (state) => {
//       state.loading = true;
//       state.error = null;
//     },

//     // Added for HEAD
//     checkCountry: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//   },
// });

// export const {
//   fetchCountries, fetchCountriesSuccess, fetchCountriesFail,
//   createCountry, createCountrySuccess, createCountryFail,
//   getCountryById, getCountryByIdSuccess, getCountryByIdFail,
//   updateCountry, updateCountrySuccess, updateCountryFail,
//   deleteCountry, deleteCountrySuccess, deleteCountryFail,
//   patchCountry,
//   checkCountry,
// } = countrySlice.actions;

// export default countrySlice.reducer;



import { createSlice, current } from '@reduxjs/toolkit';

const countrySlice = createSlice({
  name: 'country',
  initialState: {
    countries: [],
    selectedCountry: {},
    countryCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    // Create
    addCountry: state => { state.loading = true; },
    addCountrySuccess: (state, action) => {
      state.loading = false;
      state.countries.push(action.payload);
    },
    addCountryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Get all
    getCountry: state => { state.loading = true; },
    getCountrySuccess: (state, action) => {
      state.loading = false;
      state.countries = action.payload;
    },
    getCountryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Get by ID
    getCountryById: state => { state.loading = true; },
    getCountryByIdSuccess: (state, action) => {
      state.loading = false;
      state.selectedCountry = action.payload;
    },
    getCountryByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Total Count
    totalCount: state => { state.loading = true; },
    totalCountSuccess: (state, action) => {
      state.loading = false;
      state.countryCount = action.payload.count;
    },
    totalCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update
    updateCountry: state => { state.loading = true; },
    updateCountrySuccess: (state, action) => {
      state.loading = false;
      const updated = action.payload;
      state.countries = state.countries.map((item) =>
        item._id === updated._id ? updated : item
      );
      if (state.selectedCountry?._id === updated._id) {
        state.selectedCountry = updated;
      }
    },
    updateCountryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete
    deleteCountry: state => { state.loading = true; },
    deleteCountrySuccess: (state, action) => {
      const deletedId = action.payload;
      state.loading = false;
      state.countries = state.countries.filter((c) => c._id !== deletedId);
      if (state.selectedCountry?._id === deletedId) {
        state.selectedCountry = {};
      }
    },
    deleteCountryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});


export const {
  getCountry,
  getCountrySuccess,
  getCountryFail,
  addCountry,
  addCountrySuccess,
  addCountryFail,
  getCountryById,
  getCountryByIdSuccess,
  getCountryByIdFail,
  totalCount,
  totalCountSuccess,
  totalCountFail,
  updateCountry,
  updateCountrySuccess,
  updateCountryFail,
  deleteCountry,
  deleteCountrySuccess,
  deleteCountryFail
} = countrySlice.actions;

export default countrySlice.reducer;

