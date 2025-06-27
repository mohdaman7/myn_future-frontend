import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import commonApi from '../../../container/api';
import config from '../../../config';
import * as actions from './slice';

// GET All Countries
function* getCountrySaga() {
  try {
    const params = {
      api: `${config.configApi}/countries`,
      method: 'GET',
      authorization: false,
    };
    const response = yield call(commonApi, params);
    console.log('GET Country Response:', response); // ✅ Log
    const countries = response.data || response || [];
    yield put(actions.getCountrySuccess(countries));
  } catch (error) {
    console.error('GET Country Error:', error);
    yield put(actions.getCountryFail(error.message));
    toast.error(error.message || 'Failed to load countries');
  }
}


// GET Country By ID
function* getCountryByIdSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/countries/${action.payload}`,
      method: 'GET',
      authorization: false,
      successAction: actions.addCountrySuccess,
      failAction: actions.getCountryByIdFail
    };
    const response = yield call(commonApi, params);
    const country = response.data || response;
    yield put(actions.getCountryByIdSuccess(country));
  } catch (error) {
    yield put(actions.getCountryByIdFail(error.message));
    toast.error(error.message || 'Failed to get country');
  }
}

// ADD Country
function* addCountrySaga(action) {
  try {
    console.log('Add Country Payload:', action.payload);
    const { name, code, isoCode, dialCode, currency, image } = action.payload;
    const formData = new FormData();
    formData.append('name', name || '');
    formData.append('code', code || '');
    formData.append('isoCode', isoCode || '');
    formData.append('dialCode', dialCode || '');
    formData.append('currency', currency || '');
    if (image) {
      formData.append('image', image);
    }

    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const params = {
      api: `${config.configApi}/countries`,
      method: 'POST',
      authorization: 'Bearer',
      body: formData,
      successAction: actions.addCountrySuccess,
      failAction: actions.addCountryFail
    };

    yield call(commonApi, params);
    yield put(actions.getCountry());// Refresh the list after adding
    toast.success('Country added successfully');
  } catch (error) {
    console.error('Add Country Error:', error);
    yield put(actions.addCountryFail(error.message || 'Error while adding country'));
    toast.error(error.message || 'Failed to add country');
  }
}

// UPDATE Country
function* updateCountrySaga(action) {
  try {
    console.log('Update Country Payload:', action.payload);
    const { id, data } = action.payload;
    const { name, code, isoCode, dialCode, currency, image } = data;
    const formData = new FormData();
    if (name) formData.append('name', name);
    if (code) formData.append('code', code);
    if (isoCode) formData.append('isoCode', isoCode);
    if (dialCode) formData.append('dialCode', dialCode);
    if (currency) formData.append('currency', currency);
    if (image) formData.append('image', image);

    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const params = {
      api: `${config.configApi}/countries/${id}`,
      method: 'PUT',
      body: formData,
      authorization: 'Bearer',
      successAction: actions.updateCountrySuccess,
      failAction: actions.updateCountryFail
    };

    yield call(commonApi, params);
    yield put(actions.getCountry());
    toast.success('Country updated successfully');
  } catch (error) {
    console.error('Update Country Error:', error);
    yield put(actions.updateCountryFail(error.message));
    toast.error(error.message || 'Update failed');
  }
}

// DELETE Country
// function* deleteCountrySaga(action) {
//   try {
//     const params = {
//       api: `${config.configApi}/countries/${action.payload}`,
//       method: 'DELETE',
//       authorization: 'Bearer',
//       successAction: actions.deleteCountrySuccess,
//       failAction: actions.deleteCountryFail
//     };
//     yield call(commonApi, params);
//     yield put(actions.deleteCountrySuccess(action.payload));
//      yield put(actions.getCountry());
//     toast.success('Country deleted successfully');
//   } catch (error) {
//     console.error('Delete Country Error:', error);
//     yield put(actions.deleteCountryFail(error.message));
//     toast.error(error.message || 'Delete failed');
//   }
// }

function* deleteCountrySaga(action) {
  try {
    const { id, name } = action.payload;

    if (name?.toLowerCase() === 'india') {
      toast.error('Cannot delete India');
      return;
    }

    const params = {
      api: `${config.configApi}/countries/${action.payload}`,
      method: 'DELETE',
      authorization: 'Bearer',
      successAction: actions.deleteCountrySuccess,
      failAction: actions.deleteCountryFail,
    };

    yield call(commonApi, params);
    yield put(actions.deleteCountrySuccess(action.payload));
    yield put(actions.getCountry());
    toast.success('Country deleted successfully');
  } catch (error) {
    console.error('Delete Country Error:', error);
    yield put(actions.deleteCountryFail(error.message));
    toast.error(error.message || 'Failed to delete country');
  }
}


// GET Country Count
function* totalCountSaga() {
  try {
    const params = {
      api: `${config.configApi}/countries/count`,
      method: 'GET',
      authorization: false,
    };
    const response = yield call(commonApi, params);
    const count = response.count || response.data?.count || 0;
    yield put(actions.totalCountSuccess({ count }));
  } catch (error) {
    yield put(actions.totalCountFail(error.message));
    toast.error(error.message || 'Failed to get count');
  }
}

export default function* CountryActionWatcher() {
  yield takeEvery('country/getCountry', getCountrySaga);
  yield takeEvery('country/totalCount', totalCountSaga);
  yield takeEvery('country/addCountry', addCountrySaga);
  yield takeEvery('country/getCountryById', getCountryByIdSaga);
  yield takeEvery('country/updateCountry', updateCountrySaga);
  yield takeEvery('country/deleteCountry', deleteCountrySaga);
}