import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import commonApi from '../../../container/api';
import config from '../../../config';
import * as actions from './slice';

// GET All Blogs
function* getBlogSaga() {
  try {
    console.log('getBlogSaga called');
    const params = {
      api: `${config.configApi}/blog/`,
      method: 'GET',
      authorization: false,
    };
    console.log('API params:', params.api);
    const response = yield call(commonApi, params);
    console.log('API response:', response);
    if (!response.data) throw new Error('No data returned');
    yield put(actions.getBlogSuccess(response));
  } catch (error) {
    console.error('getBlogSaga error:', error);
    yield put(actions.getBlogFail(error.message));
    toast.error(error.message || 'Failed to load blogs');
  }
}

// GET Blog by ID
function* getBlogByIdSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/blog/${action.payload}`,
      method: 'GET',
      authorization: false,
    };
    const response = yield call(commonApi, params);
    const item = response.data || response;
    yield put(actions.getBlogByIdSuccess(item));
  } catch (error) {
    yield put(actions.getBlogByIdFail(error.message));
    toast.error(error.message || 'Failed to load blog');
  }
}

// ADD Blog
function* addBlogSaga(action) {
  try {
    const { title, shortDesc, fullDesc, link, image, createdBy, updatedBy } = action.payload;
    const formData = new FormData();
    formData.append('title', title || '');
    formData.append('shortDesc', shortDesc || '');
    formData.append('fullDesc', fullDesc || '');
    formData.append('link', link || '');
    formData.append('createdBy', createdBy || 'admin');
    formData.append('updatedBy', updatedBy || 'admin');
    if (image) formData.append('image', image);

    const params = {
      api: `${config.configApi}/blog`,
      method: 'POST',
      body: formData,
      authorization: 'Bearer',
    };
    const response = yield call(commonApi, params);
    yield put(actions.addBlogSuccess(response.data));
    yield put(actions.getBlog());
    toast.success('Blog added successfully');
  } catch (error) {
    yield put(actions.addBlogFail(error.message));
    toast.error(error.message || 'Failed to add blog');
  }
}

// UPDATE Blog
function* updateBlogSaga(action) {
  try {
    const { id, data } = action.payload;
    const { title, shortDesc, fullDesc, link, updatedBy, image } = data;
    const formData = new FormData();
    if (title) formData.append('title', title);
    if (shortDesc) formData.append('shortDesc', shortDesc);
    if (fullDesc) formData.append('fullDesc', fullDesc);
    if (link) formData.append('link', link);
    if (updatedBy) formData.append('updatedBy', updatedBy);
    if (image) formData.append('image', image);

    const params = {
      api: `${config.configApi}/blog/${id}`,
      method: 'PUT',
      body: formData,
      authorization: 'Bearer',
    };
    const response = yield call(commonApi, params);

    yield put(actions.updateBlogSuccess(response.data));
    yield put(actions.getBlog());
    toast.success('Blog updated successfully');
  } catch (error) {
    console.error('updateBlogSaga error:', error);
    yield put(actions.updateBlogFail(error.message || 'Failed to update blog'));
    toast.error(error.message || 'Failed to update blog');
  }
}

// SOFT DELETE Blog
function* softDeleteBlogSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/blog/${action.payload}`,
      method: 'PATCH',
      authorization: 'Bearer',
    };
    const response = yield call(commonApi, params);
    yield put(actions.deleteBlogSuccess(action.payload));
    yield put(actions.getBlog());
    toast.success('Blog soft deleted successfully');
  } catch (error) {
    yield put(actions.deleteBlogFail(error.message));
    toast.error(error.message || 'Failed to soft delete blog');
  }
}

// HARD DELETE Blog
function* hardDeleteBlogSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/blog/${action.payload}`,
      method: 'DELETE',
      authorization: 'Bearer',
    };
    const response = yield call(commonApi, params);
    yield put(actions.deleteBlogSuccess(action.payload));
    yield put(actions.getBlog());
    toast.success('Blog permanently deleted successfully');
  } catch (error) {
    yield put(actions.deleteBlogFail(error.message));
    toast.error(error.message || 'Failed to permanently delete blog');
  }
}

// GET Total Blog Count
function* totalBlogCountSaga() {
  try {
    const params = {
      api: `${config.configApi}/blog/`,
      method: 'GET',
      authorization: false,
    };
    const response = yield call(commonApi, params);
    const count = response.total || response.data?.length || 0;
    yield put(actions.totalBlogCountSuccess({ count }));
  } catch (error) {
    yield put(actions.totalBlogCountFail(error.message));
    toast.error(error.message || 'Failed to get blog count');
  }
}

// Watcher
export default function* BlogActionWatcher() {
  yield takeEvery('blog/getBlog', getBlogSaga);
  yield takeEvery('blog/getBlogById', getBlogByIdSaga);
  yield takeEvery('blog/addBlog', addBlogSaga);
  yield takeEvery('blog/updateBlog', updateBlogSaga);
  yield takeEvery('blog/deleteBlog', softDeleteBlogSaga);
  yield takeEvery('blog/hardDeleteBlog', hardDeleteBlogSaga);
  yield takeEvery('blog/totalBlogCount', totalBlogCountSaga);
}