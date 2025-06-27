import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

// project import
import reducers from './reducers';
import saga from './saga';
import config from 'config';

const sagaMiddleware = createSagaMiddleware();

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

// const store = configureStore({
//   reducer: reducers,
//   middleware: (getDefaultMiddleware) =>
//     config.env === 'stage'
//       ? getDefaultMiddleware().concat(sagaMiddleware)
//       : getDefaultMiddleware().concat(logger, sagaMiddleware)
// });

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(
      config.env === 'stage' ? sagaMiddleware : [logger, sagaMiddleware]
    )
});


sagaMiddleware.run(saga);

const { dispatch } = store;

export { store, dispatch };
