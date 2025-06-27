// import { createSlice } from '@reduxjs/toolkit';

// const courseSlice = createSlice({
//   name: 'courses',
//   initialState: {
//     allCourses: [],
//     domestic: [],
//     international: [],
//     selectedCourse: null,
//     loading: false,
//     error: null,
//     totalCount: 0
//   },
//   reducers: {
//     // CREATE
//     addCourse: (state) => { state.loading = true; },
//     addCourseSuccess: (state, action) => {
//       state.loading = false;
//       state.allCourses.push(action.payload);
//     },
//     addCourseFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     // READ ALL
//     getAllCourses: (state) => { state.loading = true; },
//     getAllCoursesSuccess: (state, action) => {
//       state.loading = false;
//       state.allCourses = action.payload.data || [];
//       state.totalCount = action.payload.count || 0;
//       state.error = null;
//     },
//     getAllCoursesFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     // READ DOMESTIC
//     getDomesticCourses: (state) => { state.loading = true; },
//     getDomesticCoursesSuccess: (state, action) => {
//       state.loading = false;
//       state.domestic = action.payload.data || [];
//       state.error = null;
//     },
//     getDomesticCoursesFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     // READ INTERNATIONAL
//     getInternationalCourses: (state) => { state.loading = true; },
//     getInternationalCoursesSuccess: (state, action) => {
//       state.loading = false;
//       state.international = action.payload.data || [];
//       state.error = null;
//     },
//     getInternationalCoursesFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     // READ BY ID
//     getCourseById: (state) => { state.loading = true; },
//     getCourseByIdSuccess: (state, action) => {
//       state.loading = false;
//       state.selectedCourse = action.payload;
//     },
//     getCourseByIdFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     // UPDATE
//     updateCourse: (state) => { state.loading = true; },
//     updateCourseSuccess: (state, action) => {
//       state.loading = false;
//       const updated = action.payload;
//       state.allCourses = state.allCourses.map(course =>
//         course._id === updated._id ? updated : course
//       );
//     },
//     updateCourseFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     // DELETE
//     deleteCourse: (state) => { state.loading = true; },
//     deleteCourseSuccess: (state, action) => {
//       state.loading = false;
//       state.allCourses = state.allCourses.filter(course => course._id !== action.payload);
//     },
//     deleteCourseFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     }
//   }
// });

// export const {
//   addCourse, addCourseSuccess, addCourseFail,
//   getAllCourses, getAllCoursesSuccess, getAllCoursesFail,
//   getDomesticCourses, getDomesticCoursesSuccess, getDomesticCoursesFail,
//   getInternationalCourses, getInternationalCoursesSuccess, getInternationalCoursesFail,
//   getCourseById, getCourseByIdSuccess, getCourseByIdFail,
//   updateCourse, updateCourseSuccess, updateCourseFail,
//   deleteCourse, deleteCourseSuccess, deleteCourseFail
// } = courseSlice.actions;

// export default courseSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    allCourses: [],
    domestic: [],
    international: [],
    selectedCourse: null,
    loading: false,
    error: null,
    totalCount: 0,
  },
  reducers: {
    // CREATE
    addCourse: (state) => {
      state.loading = true;
      state.error = null; // Reset error on new action
    },
    addCourseSuccess: (state, action) => {
      state.loading = false;
      state.allCourses.push(action.payload || {});
      state.error = null; // Clear error on success
    },
    addCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'An error occurred';
    },

    // READ ALL
    getAllCourses: (state) => {
      state.loading = true;
      state.error = null; // Reset error
    },
    getAllCoursesSuccess: (state, action) => {
      state.loading = false;
      state.allCourses = action.payload?.data || [];
      state.totalCount = action.payload?.count || 0;
      state.error = null;
    },
    getAllCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch courses';
    },

    // READ DOMESTIC
    getDomesticCourses: (state) => {
      state.loading = true;
      state.error = null;
    },
    getDomesticCoursesSuccess: (state, action) => {
      state.loading = false;
      state.domestic = action.payload?.data || [];
      state.error = null;
    },
    getDomesticCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch domestic courses';
    },

    // READ INTERNATIONAL
    getInternationalCourses: (state) => {
      state.loading = true;
      state.error = null;
    },
    getInternationalCoursesSuccess: (state, action) => {
      state.loading = false;
      state.international = action.payload?.data || [];
      state.error = null;
    },
    getInternationalCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch international courses';
    },

    // READ BY ID
    getCourseById: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCourseByIdSuccess: (state, action) => {
      state.loading = false;
      state.selectedCourse = action.payload || null;
      state.error = null;
    },
    getCourseByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch course';
    },

    // UPDATE
    updateCourse: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateCourseSuccess: (state, action) => {
      state.loading = false;
      const updated = action.payload || {};
      state.allCourses = state.allCourses.map((course) =>
        course._id === updated._id ? { ...course, ...updated } : course
      );
      state.error = null;
    },
    updateCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to update course';
    },

    // DELETE
    deleteCourse: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteCourseSuccess: (state, action) => {
      state.loading = false;
      state.allCourses = state.allCourses.filter((course) => course._id !== action.payload);
      state.error = null;
    },
    deleteCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to delete course';
    },
  },
});

export const {
  addCourse,
  addCourseSuccess,
  addCourseFail,

  getAllCourses,
  getAllCoursesSuccess,
  getAllCoursesFail,

  getDomesticCourses,
  getDomesticCoursesSuccess,
  getDomesticCoursesFail,

  getInternationalCourses,
  getInternationalCoursesSuccess,
  getInternationalCoursesFail,

  getCourseById,
  getCourseByIdSuccess,
  getCourseByIdFail,

  updateCourse,
  updateCourseSuccess,
  updateCourseFail,

  deleteCourse,
  deleteCourseSuccess,
  deleteCourseFail,
  
} = courseSlice.actions;

export default courseSlice.reducer;