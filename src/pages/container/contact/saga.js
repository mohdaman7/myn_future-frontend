import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import commonApi from '../../../container/api';
import config from '../../../config';
import * as actions from './slice';

// GET All Contacts
function* getContactsSaga() {
  try {
    const params = {
      api: `${config.configApi}/contact`,
      method: 'GET',
      authorization: false,
    };
    const response = yield call(commonApi, params);
    console.log('GET Contacts Response:', response);
    const contacts = response.data || response || [];
    yield put(actions.getContactsSuccess(contacts));
  } catch (error) {
    console.error('GET Contacts Error:', error);
    yield put(actions.getContactsFail(error.message));
    toast.error(error.message || 'Failed to load contacts');
  }
}

// GET Contact By ID
function* getContactByIdSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/contact/${action.payload}`,
      method: 'GET',
      authorization: false,
    };
    const response = yield call(commonApi, params);
    const contact = response.data || response;
    yield put(actions.getContactByIdSuccess(contact));
  } catch (error) {
    console.error('GET Contact By ID Error:', error);
    yield put(actions.getContactByIdFail(error.message));
    toast.error(error.message || 'Failed to get contact');
  }
}

// ADD Contact
function* addContactSaga(action) {
  try {
    console.log('Add Contact Payload:', action.payload);
    const { name, email, message } = action.payload; // Adjust fields as needed
    const formData = new FormData();
    if (name) formData.append('name', name);
    if (email) formData.append('email', email);
    if (message) formData.append('message', message);

    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const params = {
      api: `${config.configApi}/contact`,
      method: 'POST',
      authorization: 'Bearer',
      body: formData,
    };
    const response = yield call(commonApi, params);
    yield put(actions.addContactSuccess(response.data));
    yield put(actions.getContacts()); // Refresh the list
    toast.success('Contact message added successfully');
  } catch (error) {
    console.error('Add Contact Error:', error);
    yield put(actions.addContactFail(error.message));
    toast.error(error.message || 'Failed to add contact');
  }
}

// UPDATE Contact Status
function* updateContactStatusSaga(action) {
  try {
    console.log('Update Contact Status Payload:', action.payload);
    const { id, status } = action.payload;
    const formData = new FormData();
    if (status) formData.append('status', status);

    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const params = {
      api: `${config.configApi}/contact/${id}/status`,
      method: 'PUT',
      body: formData,
      authorization: 'Bearer',
    };
    const response = yield call(commonApi, params);
    yield put(actions.updateContactStatusSuccess(response.data));
    yield put(actions.getContacts()); // Refresh the list
    toast.success('Contact status updated successfully');
  } catch (error) {
    console.error('Update Contact Status Error:', error);
    yield put(actions.updateContactStatusFail(error.message));
    toast.error(error.message || 'Update failed');
  }
}

// DELETE Contact
function* deleteContactSaga(action) {
  try {
    const params = {
      api: `${config.configApi}/contact/${action.payload}`,
      method: 'DELETE',
      authorization: 'Bearer',
    };
    yield call(commonApi, params);
    yield put(actions.deleteContactSuccess(action.payload));
    yield put(actions.getContacts()); // Refresh the list
    toast.success('Contact deleted successfully');
  } catch (error) {
    console.error('Delete Contact Error:', error);
    yield put(actions.deleteContactFail(error.message));
    toast.error(error.message || 'Delete failed');
  }
}

// DELETE All Contacts
function* deleteAllContactsSaga() {
  try {
    const params = {
      api: `${config.configApi}/contact`,
      method: 'DELETE',
      authorization: 'Bearer',
    };
    yield call(commonApi, params);
    yield put(actions.deleteAllContactsSuccess());
    toast.success('All contacts deleted successfully');
  } catch (error) {
    console.error('Delete All Contacts Error:', error);
    yield put(actions.deleteAllContactsFail(error.message));
    toast.error(error.message || 'Failed to delete all contacts');
  }
}

// GET Contact Count
function* totalCountSaga() {
  try {
    const params = {
      api: `${config.configApi}/contact/count`,
      method: 'GET',
      authorization: false,
    };
    const response = yield call(commonApi, params);
    const count = response.count || response.data?.count || 0;
    yield put(actions.totalCountSuccess({ count }));
  } catch (error) {
    console.error('Get Contact Count Error:', error);
    yield put(actions.totalCountFail(error.message));
    toast.error(error.message || 'Failed to get contact count');
  }
}

export default function* ContactActionWatcher() {
  yield takeEvery('contact/getContacts', getContactsSaga);
  yield takeEvery('contact/totalCount', totalCountSaga);
  yield takeEvery('contact/addContact', addContactSaga);
  yield takeEvery('contact/getContactById', getContactByIdSaga);
  yield takeEvery('contact/updateContactStatus', updateContactStatusSaga);
  yield takeEvery('contact/deleteContact', deleteContactSaga);
  yield takeEvery('contact/deleteAllContacts', deleteAllContactsSaga);
}