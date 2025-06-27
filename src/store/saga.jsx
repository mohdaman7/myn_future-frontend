import { all, call } from 'redux-saga/effects';

import LoginActionWatcher from '../container/LoginContainer/saga';
import CountrySagaWatcher from '../pages/container/country/saga';
import GalleryActionWatcher from '../pages/container/gallery/saga';
import BlogActionWatcher from '../pages/container/blog/saga';
import serviceWatcherSaga from '../pages/container/service/saga';
import EnquiryWatcher from '../pages/container/enquries/saga';
import followUpWatcher from '../pages/container/follow-up/saga';
import ContactActionWatcher from '../pages/container/contact/saga';
import CollegeActionWatcher from '../pages/container/colleges/saga';
import CourseActionWatcher from '../pages/container/courses/saga';
import IntakeActionWatcher from '../pages/container/intake/saga';

function* rootSaga() {
  yield all([
    call(LoginActionWatcher),
    call(CountrySagaWatcher),
    call(GalleryActionWatcher),
    call(BlogActionWatcher),
    call(serviceWatcherSaga),
    call(EnquiryWatcher),
    call(followUpWatcher),
    call(ContactActionWatcher),
    call(CollegeActionWatcher),
    call(CourseActionWatcher),
    call(IntakeActionWatcher),
  ]);
}

export default rootSaga;
