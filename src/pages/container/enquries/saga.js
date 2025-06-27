import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import commonApi from '../../../container/api';
import config from '../../../config';
import * as actions from './slice';

// GET All Enquiries
function* getEnquiriesSaga() {
  try {
    const params = {
      api: `${config.configApi}/enquiries`,
      method: 'GET',
    };
    const response = yield call(commonApi, params);
    yield put(actions.getEnquiriesSuccess(response));
  } catch (error) {
    yield put(actions.enquiryFailure(error.message));
    toast.error(error.message || 'Failed to fetch enquiries');
  }
}

// GET Enquiry by ID
function* getEnquiryByIdSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/enquiries/${action.payload}`,
      method: 'GET',
    };
    const response = yield call(commonApi, params);
    yield put(actions.getEnquiryByIdSuccess(response));
  } catch (error) {
    yield put(actions.enquiryFailure(error.message));
    // toast.error(error.message || 'Failed to fetch enquiry');
  }
}

// POST Create Enquiry
function* createEnquirySaga(action) {
  try {
    const params = {
      api: `${config.configApi}/enquiries`,
      method: 'POST',
      body: action.payload,
    };
    const response = yield call(commonApi, params);
    yield put(actions.createEnquirySuccess(response));
    yield put(actions.getEnquiries());
    toast.success('Enquiry created successfully');
  } catch (error) {
    yield put(actions.enquiryFailure(error.message));
    toast.error(error.message || 'Failed to create enquiry');
  }
}

// PUT Update Enquiry
function* updateEnquirySaga(action) {
  try {
    const { id, data } = action.payload;
    const params = {
      api: `${config.configApi}/enquiries/status/${id}`,
      method: 'PUT',
      body: data,
    };
    const response = yield call(commonApi, params);
    yield put(actions.updateEnquirySuccess(response));
    yield put(actions.getEnquiries());
    // toast.success('Enquiry status updated successfully');
  } catch (error) {
    yield put(actions.enquiryFailure(error.message));
    toast.error(error.message || 'Failed to update enquiry');
  }
}

// PATCH Soft Delete Enquiry
function* deleteEnquirySaga(action) {
  try {
    const params = {
      api: `${config.configApi}/enquiries/${action.payload}`,
      method: 'PATCH',
    };
    yield call(commonApi, params);
    yield put(actions.deleteEnquirySuccess(action.payload));
    yield put(actions.getEnquiries());
    toast.success('Enquiry deleted (soft) successfully');
  } catch (error) {
    yield put(actions.enquiryFailure(error.message));
    toast.error(error.message || 'Failed to delete enquiry');
  }
}

// GET Enquiry Count
function* getEnquiryCountSaga() {
  try {
    const params = {
      api: `${config.configApi}/enquiries/total/count`,
      method: 'GET',
    };
    const response = yield call(commonApi, params);
    yield put(actions.getEnquiryCountSuccess({ count: response.enquiry }));
  } catch (error) {
    yield put(actions.enquiryFailure(error.message));
    // toast.error(error.message || 'Failed to get enquiry count');
  }
}

// GET New Enquiry Count
function* getNewEnquiryCountSaga() {
  try {
    const params = {
      api: `${config.configApi}/enquiries/new/count`,
      method: 'GET',
    };
    const response = yield call(commonApi, params);
    yield put(actions.getNewEnquiryCountSuccess(response));
  } catch (error) {
    yield put(actions.enquiryFailure(error.message));
    // toast.error(error.message || 'Failed to get new enquiry count');
  }
}

// Watcher Saga
export default function* EnquiryWatcher() {
  yield takeEvery('enquiries/getEnquiries', getEnquiriesSaga);
  yield takeEvery('enquiries/getEnquiryById', getEnquiryByIdSaga);
  yield takeEvery('enquiries/createEnquiry', createEnquirySaga);
  yield takeEvery('enquiries/updateEnquiry', updateEnquirySaga);
  yield takeEvery('enquiries/deleteEnquiry', deleteEnquirySaga);
  yield takeEvery('enquiries/getEnquiryCount', getEnquiryCountSaga);
  yield takeEvery('enquiries/getNewEnquiryCount', getNewEnquiryCountSaga);
}