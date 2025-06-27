import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [], // Fixed from 'galleries'
    selectedBlog: {},
    blogCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    // Create
    addBlog: state => { state.loading = true; },
    addBlogSuccess: (state, action) => {
      state.loading = false;
      state.blogs.push(action.payload);
      state.blogCount += 1; // Increment count
    },
    addBlogFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Get all
    getBlog: state => { state.loading = true; },
    getBlogSuccess: (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload)) {
        console.warn('Received array payload, expected { data, total }:', action.payload);
        state.blogs = action.payload;
        state.blogCount = action.payload.length || 0;
      } else {
        state.blogs = action.payload.data || [];
        state.blogCount = action.payload.total || action.payload.data?.length || 0;
      }
      state.error = null; // Clear previous errors
    },
    getBlogFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Get by ID
    getBlogById: state => { state.loading = true; },
    getBlogByIdSuccess: (state, action) => {
      state.loading = false;
      state.selectedBlog = action.payload;
      state.error = null; // Clear previous errors
    },
    getBlogByIdFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Total Count (optional, can be removed if using getBlogSuccess)
    totalBlogCount: state => { state.loading = true; },
    totalBlogCountSuccess: (state, action) => {
      state.loading = false;
      state.blogCount = action.payload.count;
    },
    totalBlogCountFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update
    updateBlog: state => { state.loading = true; },
    updateBlogSuccess: (state, action) => {
      state.loading = false;
      const updated = action.payload;
      if (updated && updated._id) {
        state.blogs = state.blogs.map((item) =>
          item._id === updated._id ? updated : item
        );
        if (state.selectedBlog?._id === updated._id) {
          state.selectedBlog = updated;
        }
      } else {
        console.warn('Invalid updateBlogSuccess payload:', updated);
        state.error = 'Invalid blog update data received';
      }
    },
    updateBlogFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Soft Delete
    deleteBlog: state => { state.loading = true; },
    deleteBlogSuccess: (state, action) => {
      const deletedId = action.payload;
      state.loading = false;
      state.blogs = state.blogs.filter((g) => g._id !== deletedId);
      if (state.selectedBlog?._id === deletedId) {
        state.selectedBlog = {};
      }
      state.blogCount -= 1; // Decrement count
    },
    deleteBlogFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Hard Delete
    hardDeleteBlog: state => { state.loading = true; },
    hardDeleteBlogSuccess: (state, action) => {
      const deletedId = action.payload;
      state.loading = false;
      state.blogs = state.blogs.filter((g) => g._id !== deletedId);
      if (state.selectedBlog?._id === deletedId) {
        state.selectedBlog = {};
      }
      state.blogCount -= 1; // Decrement count
    },
    hardDeleteBlogFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const {
  getBlog, getBlogSuccess, getBlogFail,
  addBlog, addBlogSuccess, addBlogFail,
  getBlogById, getBlogByIdSuccess, getBlogByIdFail,
  totalBlogCount, totalBlogCountSuccess, totalBlogCountFail,
  updateBlog, updateBlogSuccess, updateBlogFail,
  deleteBlog, deleteBlogSuccess, deleteBlogFail,
  hardDeleteBlog, hardDeleteBlogSuccess, hardDeleteBlogFail
} = blogSlice.actions;

export default blogSlice.reducer;