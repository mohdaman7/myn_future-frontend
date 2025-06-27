import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import commonApi from '../../../container/api';
import config from '../../../config';
import * as actions from './slice';

// Get All Services
function* getServicesSaga() {
  try {
    const params = {
      api: `${config.configApi}/services`,
      method: 'GET',
      authorization: false,
    };
    const response = yield call(commonApi, params);
    yield put(actions.getServicesSuccess({ data: response.data, total: response.total }));
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch services';
    yield put(actions.getServicesFail(errorMessage));
    toast.error(errorMessage);
  }
}

// Get Service by ID
function* getServiceByIdSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/services/${action.payload}`,
      method: 'GET',
      authorization: false,
    };
    const response = yield call(commonApi, params);
    yield put(actions.getServiceByIdSuccess(response));
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch service';
    yield put(actions.getServiceByIdFail(errorMessage));
    toast.error(errorMessage);
  }
}

// Add Service
function* addServiceSaga(action) {
  try {
    const { title, shortDesc, fullDesc, createdBy, updatedBy, image, points } = action.payload;
    const formData = new FormData();
    formData.append('title', title || '');
    formData.append('shortDesc', shortDesc || '');
    formData.append('fullDesc', fullDesc || '');
    formData.append('createdBy', createdBy || 'admin');
    formData.append('updatedBy', updatedBy || 'admin');
    if (image) formData.append('image', image);
    if (points && Array.isArray(points)) {
      formData.append('points', JSON.stringify(points));
    }

    const params = {
      api: `${config.configApi}/services`,
      method: 'POST',
      body: formData,
      authorization: true, // Assume authentication is required
    };

    const response = yield call(commonApi, params);
    yield put(actions.addServiceSuccess(response));
    yield put(actions.getServices()); // Refresh the service list
    toast.success('Service added successfully');
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Failed to add service';
    yield put(actions.addServiceFail(errorMessage));
    toast.error(errorMessage);
  }
}

// Update Service
function* updateServiceSaga(action) {
  try {
    const { id, data } = action.payload;
    const { title, shortDesc, fullDesc, updatedBy, image, points } = data;

    const formData = new FormData();
    if (title) formData.append('title', title);
    if (shortDesc) formData.append('shortDesc', shortDesc);
    if (fullDesc) formData.append('fullDesc', fullDesc);
    if (updatedBy) formData.append('updatedBy', updatedBy);
    if (image) formData.append('image', image);
    if (points && Array.isArray(points)) {
      formData.append('points', JSON.stringify(points));
    }

    const params = {
      api: `${config.configApi}/services/${id}`,
      method: 'PUT',
      body: formData,
      authorization: true, // Assume authentication is required
    };

    const response = yield call(commonApi, params);
    yield put(actions.updateServiceSuccess(response));
    yield put(actions.getServices()); // Refresh the service list
    toast.success('Service updated successfully');
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Failed to update service';
    yield put(actions.updateServiceFail(errorMessage));
    toast.error(errorMessage);
  }
}

// Soft Delete Service
function* deleteServiceSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/services/${action.payload}`,
      method: 'PATCH',
      authorization: true, // Assume authentication is required
    };
    yield call(commonApi, params);
    yield put(actions.deleteServiceSuccess(action.payload));
    yield put(actions.getServices()); // Refresh the service list
    toast.success('Service soft deleted successfully');
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Failed to soft delete service';
    yield put(actions.deleteServiceFail(errorMessage));
    toast.error(errorMessage);
  }
}

// Hard Delete Service
function* hardDeleteServiceSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/services/${action.payload}`,
      method: 'DELETE',
      authorization: true, // Assume authentication is required
    };
    yield call(commonApi, params);
    yield put(actions.hardDeleteServiceSuccess(action.payload));
    yield put(actions.getServices()); // Refresh the service list
    toast.success('Service permanently deleted');
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Failed to permanently delete service';
    yield put(actions.hardDeleteServiceFail(errorMessage));
    toast.error(errorMessage);
  }
}

// Total Service Count
function* totalServiceCountSaga() {
  try {
    const params = {
      api: `${config.configApi}/services/count`,
      method: 'GET',
      authorization: false,
    };
    const response = yield call(commonApi, params);
    yield put(actions.totalServiceCountSuccess(response));
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch service count';
    yield put(actions.totalServiceCountFail(errorMessage));
    toast.error(errorMessage);
  }
}

// Root Saga
export default function* serviceWatcherSaga() {
  yield takeEvery('services/getServices', getServicesSaga);
  yield takeEvery('services/getServiceById', getServiceByIdSaga);
  yield takeEvery('services/addService', addServiceSaga);
  yield takeEvery('services/updateService', updateServiceSaga);
  yield takeEvery('services/deleteService', deleteServiceSaga);
  yield takeEvery('services/hardDeleteService', hardDeleteServiceSaga);
  yield takeEvery('services/totalServiceCount', totalServiceCountSaga);
}