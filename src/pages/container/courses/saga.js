import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import commonApi from '../../../container/api';
import config from '../../../config';
import * as actions from './slice';

// All Courses
function* getAllCoursesSaga() {
  try {
    const params = {
      api: `${config.configApi}/courses`,
      method: 'GET'
    };
    const response = yield call(commonApi, params);
    yield put(actions.getAllCoursesSuccess(response));
  } catch (error) {
    yield put(actions.getAllCoursesFail(error.message));
    toast.error(error.message || 'Failed to fetch courses');
  }
}

// Domestic Courses
function* getDomesticCoursesSaga() {
  try {
    const params = {
      api: `${config.configApi}/courses`,
      method: 'GET',
      body: { domestic: true }
    };
    const response = yield call(commonApi, params);
    yield put(actions.getDomesticCoursesSuccess(response));

  } catch (error) {
    yield put(actions.getDomesticCoursesFail(error.message));
    toast.error(error.message || 'Failed to fetch domestic courses');
  }
}

// International Courses
function* getInternationalCoursesSaga() {
  try {
    const params = {
      api: `${config.configApi}/courses`,
      method: 'GET',
      body: { domestic: false }
    };
    const response = yield call(commonApi, params);
    yield put(actions.getInternationalCoursesSuccess(response));
  } catch (error) {
    yield put(actions.getInternationalCoursesFail(error.message));
    toast.error(error.message || 'Failed to fetch international courses');
  }
}

// Get Course By ID
function* getCourseByIdSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/courses/${action.payload}`,
      method: 'GET'
    };
    const response = yield call(commonApi, params);
    yield put(actions.getCourseByIdSuccess(response));
  } catch (error) {
    yield put(actions.getCourseByIdFail(error.message));
    toast.error(error.message || 'Failed to fetch course');
  }
}

// Add Course
function* addCourseSaga(action) {
  try {
    const formData = new FormData();
    for (const key in action.payload) {
      const value = action.payload[key];
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, value);
      }
    }

    const params = {
      api: `${config.configApi}/courses`,
      method: 'POST',
      body: formData,
      authorization: 'Bearer'
    };
    const response = yield call(commonApi, params);
    yield put(actions.addCourseSuccess(response));
    yield put(actions.getAllCourses());
    toast.success('Course added successfully');
  } catch (error) {
    yield put(actions.addCourseFail(error.message));
    toast.error(error.message || 'Failed to add course');
  }
}

// Update Course
function* updateCourseSaga(action) {
  try {
    const { id, ...updateData } = action.payload;
    const formData = new FormData();
    for (const key in updateData) {
      const value = updateData[key];
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, value);
      }
    }

    const params = {
      api: `${config.configApi}/courses/${id}`,
      method: 'PUT',
      body: formData,
      authorization: 'Bearer'
    };
    const response = yield call(commonApi, params);
    yield put(actions.updateCourseSuccess(response));
    yield put(actions.getAllCourses());
    toast.success('Course updated successfully');
  } catch (error) {
    yield put(actions.updateCourseFail(error.message));
    toast.error(error.message || 'Failed to update course');
  }
}

// Delete Course
function* deleteCourseSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/courses/${action.payload}`,
      method: 'DELETE',
      authorization: 'Bearer'
    };
    yield call(commonApi, params);
    yield put(actions.deleteCourseSuccess(action.payload));
    yield put(actions.getAllCourses());
    toast.success('Course deleted successfully');
  } catch (error) {
    yield put(actions.deleteCourseFail(error.message));
    toast.error(error.message || 'Failed to delete course');
  }
}

// Watcher
export default function* courseWatcher() {
  yield takeEvery('courses/getAllCourses', getAllCoursesSaga);
  yield takeEvery('courses/getDomesticCourses', getDomesticCoursesSaga);
  yield takeEvery('courses/getInternationalCourses', getInternationalCoursesSaga);
  yield takeEvery('courses/getCourseById', getCourseByIdSaga);
  yield takeEvery('courses/addCourse', addCourseSaga);
  yield takeEvery('courses/updateCourse', updateCourseSaga);
  yield takeEvery('courses/deleteCourse', deleteCourseSaga);
}
