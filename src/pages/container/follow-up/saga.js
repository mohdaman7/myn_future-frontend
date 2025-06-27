import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import commonApi from '../../../container/api';
import config from '../../../config';
import * as actions from './slice';

// GET All FollowUps
function* getFollowUpsSaga() {
  try {
    const params = {
      api: `${config.configApi}/followUp`,
      method: 'GET',
    };
    const response = yield call(commonApi, params);
    yield put(actions.getFollowUpsSuccess(response)); // Pass response as-is
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch follow-ups';
    yield put(actions.followUpFailure(errorMessage));
    toast.error(errorMessage);
  }
}

// GET FollowUps by Enquiry ID
function* getFollowUpsByEnquiryIdSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/followUp/enqId/${action.payload}`,
      method: 'GET',
    };
    const response = yield call(commonApi, params);
    yield put(actions.getFollowUpsByEnquiryIdSuccess(response));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch follow-ups for enquiry';
    yield put(actions.followUpFailure(errorMessage));
    toast.error(errorMessage);
  }
}

// GET Single FollowUp by ID
function* getFollowUpByIdSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/followUp/${action.payload}`,
      method: 'GET',
    };
    const response = yield call(commonApi, params);
    yield put(actions.getFollowUpByIdSuccess(response));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch follow-up';
    yield put(actions.followUpFailure(errorMessage));
    toast.error(errorMessage);
  }
}

// CREATE FollowUp
function* createFollowUpSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/followUp`,
      method: 'POST',
      body: action.payload,
    };
    const response = yield call(commonApi, params);
    yield put(actions.createFollowUpSuccess(response));
    yield put(actions.getFollowUps());
    toast.success('Follow-up created successfully');
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to create follow-up';
    yield put(actions.followUpFailure(errorMessage));
    toast.error(errorMessage);
  }
}

// UPDATE FollowUp
function* updateFollowUpSaga(action) {
  try {
    const { id, data } = action.payload;
    const params = {
      api: `${config.configApi}/followUp/${id}`,
      method: 'PUT',
      body: data,
    };
    const response = yield call(commonApi, params);
    yield put(actions.updateFollowUpSuccess(response));
    yield put(actions.getFollowUps());
    toast.success('Follow-up updated successfully');
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to update follow-up';
    yield put(actions.followUpFailure(errorMessage));
    toast.error(errorMessage);
  }
}

// SOFT DELETE FollowUp
function* deleteFollowUpSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/followUp/${action.payload}`,
      method: 'DELETE',
    };
    yield call(commonApi, params);
    yield put(actions.deleteFollowUpSuccess(action.payload));
    yield put(actions.getFollowUps());
    toast.success('Follow-up deleted successfully');
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to delete follow-up';
    yield put(actions.followUpFailure(errorMessage));
    toast.error(errorMessage);
  }
}

// Watcher Saga
export default function* followUpWatcher() {
  yield takeEvery('followUp/getFollowUps', getFollowUpsSaga);
  yield takeEvery('followUp/getFollowUpById', getFollowUpByIdSaga);
  yield takeEvery('followUp/getFollowUpsByEnquiryId', getFollowUpsByEnquiryIdSaga);
  yield takeEvery('followUp/createFollowUp', createFollowUpSaga);
  yield takeEvery('followUp/updateFollowUp', updateFollowUpSaga);
  yield takeEvery('followUp/deleteFollowUp', deleteFollowUpSaga);
}