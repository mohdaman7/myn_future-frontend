import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import commonApi from '../../../container/api';
import config from '../../../config';
import * as actions from './slice';

function createCollegeFormData(payload) {
  const formData = new FormData();
  Object.keys(payload).forEach(key => {
    if (key === 'id') return;
    const value = payload[key];
    if (value !== null && value !== undefined && value !== '') {
      if (key === 'courses' && Array.isArray(value)) {
        value.forEach((course, index) => {
          const courseId = typeof course === 'object' ? course._id : course;
          if (courseId) {
            formData.append(`courses[${index}]`, courseId);
          }
        });
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else if (key === 'image' && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    }
  });
  return formData;
}

function* getCollegesSaga(action) {
  try {
    const queryParams = action.payload ? new URLSearchParams(action.payload).toString() : '';
    const apiUrl = `${config.configApi}/college${queryParams ? `?${queryParams}` : ''}`;
    const params = { api: apiUrl, method: 'GET', authorization: false };
    const response = yield call(commonApi, params);
    const { colleges, total, totalPages, currentPage } = response;
    const pagination = { total, totalPages, currentPage };
    yield put(actions.getCollegesSuccess({ colleges, pagination }));
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch colleges';
    yield put(actions.getCollegesFail(errorMessage));
    toast.error(errorMessage);
  }
}

function* getCollegeByIdSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/college/${action.payload}`,
      method: 'GET',
      authorization: false,
    };
    const response = yield call(commonApi, params);
    const college = response.data || null;
    yield put(actions.getCollegeByIdSuccess(college));
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch college';
    yield put(actions.getCollegeByIdFail(errorMessage));
    toast.error(errorMessage);
  }
}

function* addCollegeSaga(action) {
  try {
    const formData = createCollegeFormData(action.payload);
    const params = {
      api: `${config.configApi}/college`,
      method: 'POST',
      authorization: 'Bearer',
      body: formData,
    };
    const response = yield call(commonApi, params);
    yield put(actions.addCollegeSuccess(response.data));
    yield put(actions.getColleges());
    toast.success('College added successfully');
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to add college';
    yield put(actions.addCollegeFail(errorMessage));
    toast.error(errorMessage);
  }
}

function* updateCollegeSaga(action) {
  try {
    const { id, ...updateData } = action.payload;
    const formData = createCollegeFormData(updateData);
    const params = {
      api: `${config.configApi}/college/${id}`,
      method: 'PUT',
      authorization: 'Bearer',
      body: formData,
    };
    const response = yield call(commonApi, params);
    yield put(actions.updateCollegeSuccess(response.data));
    yield put(actions.getColleges());
    toast.success('College updated successfully');
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to update college';
    yield put(actions.updateCollegeFail(errorMessage));
    toast.error(errorMessage);
  }
}

function* deleteCollegeSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/college/${action.payload}`,
      method: 'DELETE',
      authorization: 'Bearer',
    };
    yield call(commonApi, params);
    yield put(actions.deleteCollegeSuccess(action.payload));
    yield put(actions.getColleges());
    toast.success('College deleted successfully');
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to delete college';
    yield put(actions.deleteCollegeFail(errorMessage));
    toast.error(errorMessage);
  }
}

function* totalCountSaga() {
  try {
    const params = {
      api: `${config.configApi}/college/count`,
      method: 'GET',
      authorization: false,
    };
    const response = yield call(commonApi, params);
    const count = response.data?.count || 0;
    yield put(actions.totalCountSuccess({ count }));
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch college count';
    yield put(actions.totalCountFail(errorMessage));
    toast.error(errorMessage);
  }
}

export default function* CollegeActionWatcher() {
  yield takeEvery('colleges/getColleges', getCollegesSaga);
  yield takeEvery('colleges/totalCount', totalCountSaga);
  yield takeEvery('colleges/addCollege', addCollegeSaga);
  yield takeEvery('colleges/getCollegeById', getCollegeByIdSaga);
  yield takeEvery('colleges/updateCollege', updateCollegeSaga);
  yield takeEvery('colleges/deleteCollege', deleteCollegeSaga); // ✅ hard delete only
}
