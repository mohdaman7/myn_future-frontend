import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import commonApi from '../../../container/api';
import config from '../../../config';
import * as actions from './slice';

// GET All Gallery Items
function* getGallerySaga() {
  try {
    console.log('getGallerySaga called');
    const params = {
      api: `${config.configApi}/gallery/`,
      method: 'GET',
      authorization: false,
    };
    console.log('API params:', params.api);
    const response = yield call(commonApi, params);
    console.log('API response:', response);
    if (!response.data) throw new Error('No data returned');
    yield put(actions.getGalleriesSuccess(response.data));
  } catch (error) {
    console.error('getGallerySaga error:', error);
    yield put(actions.getGalleriesFail(error.message));
    toast.error(error.message || 'Failed to load gallery items');
  }
}
// GET Gallery Item by ID
function* getGalleryByIdSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/gallery/${action.payload}`,
      method: 'GET',
      authorization: false,
    };
    const response = yield call(commonApi, params);
    const item = response.data || response;
    yield put(actions.getGalleryByIdSuccess(item));
  } catch (error) {
    yield put(actions.getGalleryByIdFail(error.message));
    toast.error(error.message || 'Failed to load gallery item');
  }
}

// ADD Gallery Item
// ADD Gallery Item
function* addGallerySaga(action) {
  try {
    const { title, from, link, image, date } = action.payload;
    const formData = new FormData();
    formData.append('title', title || '');
    formData.append('from', from || '');
    formData.append('link', link || '');
    formData.append('date', date || new Date().toISOString());
    if (image) formData.append('image', image);

    const params = {
      api: `${config.configApi}/gallery`,
      method: 'POST',
      body: formData,
      authorization: 'Bearer',
    };
    const response = yield call(commonApi, params);
    yield put(actions.addGallerySuccess(response.data));
    toast.success('Gallery item added successfully');
  } catch (error) {
    yield put(actions.addGalleryFail(error.message));
    toast.error(error.message || 'Failed to add gallery item');
  }
}

// UPDATE Gallery Item
function* updateGallerySaga(action) {
  try {
    const { id, data } = action.payload;
    const { title, from, link, date, image } = data;
    const formData = new FormData();
    if (title) formData.append('title', title);
    if (from) formData.append('from', from);
    if (link) formData.append('link', link);
    if (date) formData.append('date', date);
    if (image) formData.append('image', image);

    const params = {
      api: `${config.configApi}/gallery/${id}`,
      method: 'PUT',
      body: formData,
      authorization: 'Bearer',
    };
    const response = yield call(commonApi, params);
    yield put(actions.updateGallerySuccess(response.data));
    toast.success('Gallery item updated successfully');
  } catch (error) {
    yield put(actions.updateGalleryFail(error.message));
    toast.error(error.message || 'Failed to update gallery item');
  }
}

// DELETE Gallery Item
function* deleteGallerySaga(action) {
  try {
    const params = {
      api: `${config.configApi}/gallery/soft/${action.payload}`, // Updated to soft delete endpoint
      method: 'DELETE',
      authorization: 'Bearer',
    };
    const response = yield call(commonApi, params);
    yield put(actions.deleteGallerySuccess(action.payload));
    toast.success('Gallery item deleted successfully');
  } catch (error) {
    yield put(actions.deleteGalleryFail(error.message));
    toast.error(error.message || 'Failed to delete gallery item');
  }
}

// GET Total Gallery Count
function* totalGalleryCountSaga() {
  try {
    const params = {
      api: `${config.configApi}/gallery/`, // Use existing endpoint, as /count doesn't exist
      method: 'GET',
      authorization: false,
    };
    const response = yield call(commonApi, params);
    const count = response.total || response.data?.length || 0;
    yield put(actions.totalGalleryCountSuccess({ count }));
  } catch (error) {
    yield put(actions.totalGalleryCountFail(error.message));
    toast.error(error.message || 'Failed to get gallery count');
  }
}

// Watcher
export default function* GalleryActionWatcher() {
  yield takeEvery('gallery/getGalleries', getGallerySaga);
  yield takeEvery('gallery/getGalleryById', getGalleryByIdSaga);
  yield takeEvery('gallery/addGallery', addGallerySaga);
  yield takeEvery('gallery/updateGallery', updateGallerySaga);
  yield takeEvery('gallery/deleteGallery', deleteGallerySaga);
  yield takeEvery('gallery/totalGalleryCount', totalGalleryCountSaga);
}