import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import commonApi from '../api';
import config from '../../config';
import {
  userLogin,
  loginSuccess,
  loginFail
} from './slice';

function* login(action) {
  try {
    const params = {
      api: `${config.configApi}/users/login`,
      method: 'POST',
      successAction: loginSuccess,
      failAction: loginFail,
      authorization: 'Basic',
      body: action.payload,
    };

    const res = yield call(commonApi, params);

    if (res?.token) {
      yield call([localStorage, 'setItem'], 'adminUser', JSON.stringify(res));
      yield call([localStorage, 'setItem'], 'adminToken', res.token);

      yield put(loginSuccess(res));

      if (action.payload.navigate) {
        yield call(action.payload.navigate, '/');
      }

      yield call(toast.success, 'Login successful', { autoClose: 3000 });
    } else {
      yield put(loginFail(res));
      yield call(toast.error, 'Login failed. Please try again.', { autoClose: 3000 });
    }

  } catch (error) {
    yield put(loginFail(error));
    yield call(toast.error, 'Login failed. Please try again.', { autoClose: 3000 });
  }
}

export default function* LoginActionWatcher() {
  yield takeEvery(userLogin.type, login);
}
