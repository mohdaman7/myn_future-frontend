import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import commonApi from '../../../container/api';
import config from '../../../config';
import * as actions from './slice';

// GET All Intakes
function* getIntakesSaga() {
  try {
    const params = {
      api: `${config.configApi}/intake`,
      method: 'GET',
      authorization: 'Bearer',
    };
    const response = yield call(commonApi, params);
    const intakes = response.data || response || [];
    yield put(actions.getIntakesSuccess(intakes));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to load intakes';
    console.error('GET Intakes Error:', error);
    yield put(actions.getIntakesFail(errorMessage));
    toast.error(errorMessage);
  }
}

// GET Intake By ID
function* getIntakeByIdSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/intake/${action.payload}`,
      method: 'GET',
      authorization: 'Bearer',
    };
    const response = yield call(commonApi, params);
    const intake = response.data || response;
    yield put(actions.getIntakeByIdSuccess(intake));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to get intake';
    console.error('GET Intake By ID Error:', error);
    yield put(actions.getIntakeByIdFail(errorMessage));
    toast.error(errorMessage);
  }
}

// ADD Intake
function* addIntakeSaga(action) {
  try {
    console.log('Add Intake Payload:', action.payload);
    const { college, intakeMonth, intakeYear, deadlineDate, status, visible } = action.payload;
    const payload = {
      college,
      intakeMonth,
      intakeYear,
      deadlineDate,
      status: status || 'open',
      visible: visible !== undefined ? visible : true,
    };

    const params = {
      api: `${config.configApi}/intake`,
      method: 'POST',
      authorization: 'Bearer',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    };
    const response = yield call(commonApi, params);
    yield put(actions.addIntakeSuccess(response.data));
    yield put(actions.getIntakes());
    toast.success('Intake added successfully');
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to add intake';
    console.error('Add Intake Error:', error);
    yield put(actions.addIntakeFail(errorMessage));
    toast.error(errorMessage);
  }
}

// UPDATE Intake
function* updateIntakeSaga(action) {
  try {
    console.log('Update Intake Payload:', action.payload);
    const { id, college, intakeMonth, intakeYear, deadlineDate, status, visible } = action.payload;
    const payload = {
      college,
      intakeMonth,
      intakeYear,
      deadlineDate,
      status,
      visible: visible !== undefined ? visible : true,
    };

    const params = {
      api: `${config.configApi}/intake/${id}`,
      method: 'PUT',
      authorization: 'Bearer',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    };
    const response = yield call(commonApi, params);
    yield put(actions.updateIntakeSuccess(response.data));
    yield put(actions.getIntakes());
    toast.success('Intake updated successfully');
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Update failed';
    console.error('Update Intake Error:', error);
    yield put(actions.updateIntakeFail(errorMessage));
    toast.error(errorMessage);
  }
}

// DELETE Intake (soft)
function* deleteIntakeSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/intake/${action.payload}`,
      method: 'DELETE',
      authorization: 'Bearer',
    };
    const response = yield call(commonApi, params);
    yield put(actions.deleteIntakeSuccess(response.data));
    yield put(actions.getIntakes());
    toast.success('Intake deleted successfully');
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Delete failed';
    console.error('Delete Intake Error:', error);
    yield put(actions.deleteIntakeFail(errorMessage));
    toast.error(errorMessage);
  }
}

// HARD DELETE Intake
function* hardDeleteIntakeSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/intake/hard/${action.payload}`,
      method: 'DELETE',
      authorization: 'Bearer',
    };
    const response = yield call(commonApi, params);
    yield put(actions.hardDeleteIntakeSuccess(action.payload));
    yield put(actions.getIntakes());
    toast.success('Intake permanently deleted successfully');
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Hard delete failed';
    console.error('Hard Delete Intake Error:', error);
    yield put(actions.hardDeleteIntakeFail(errorMessage));
    toast.error(errorMessage);
  }
}

// DELETE All Intakes
function* deleteAllIntakesSaga() {
  try {
    const params = {
      api: `${config.configApi}/intake`,
      method: 'DELETE',
      authorization: 'Bearer',
    };
    yield call(commonApi, params);
    yield put(actions.deleteAllIntakesSuccess());
    toast.success('All intakes deleted successfully');
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to delete all intakes';
    console.error('Delete All Intakes Error:', error);
    yield put(actions.deleteAllIntakesFail(errorMessage));
    toast.error(errorMessage);
  }
}

// GET Intake Count
function* totalCountSaga() {
  try {
    const params = {
      api: `${config.configApi}/intake/count`,
      method: 'GET',
      authorization: 'Bearer',
    };
    const response = yield call(commonApi, params);
    const count = response.count || response.data?.count || 0;
    yield put(actions.totalCountSuccess({ count }));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to get intake count';
    console.error('Get Intake Count Error:', error);
    yield put(actions.totalCountFail(errorMessage));
    toast.error(errorMessage);
  }
}

export default function* IntakeActionWatcher() {
  yield takeEvery('intakes/getIntakes', getIntakesSaga);
  yield takeEvery('intakes/totalCount', totalCountSaga);
  yield takeEvery('intakes/addIntake', addIntakeSaga);
  yield takeEvery('intakes/getIntakeById', getIntakeByIdSaga);
  yield takeEvery('intakes/updateIntake', updateIntakeSaga);
  yield takeEvery('intakes/deleteIntake', deleteIntakeSaga);
  yield takeEvery('intakes/hardDeleteIntake', hardDeleteIntakeSaga);
  yield takeEvery('intakes/deleteAllIntakes', deleteAllIntakesSaga);
}