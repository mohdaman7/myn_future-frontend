// import { put } from 'redux-saga/effects';
// import config from '../config';
// import { Base64 } from 'js-base64';

// function* commonApi(value) {
//   try {
//     // Get token from localStorage
//     const token = localStorage.getItem(config.token);

//     // Build authorization header
//     let authorization = '';
//     if (value.authorization === 'Basic') {
//       authorization = 'Basic ' + Base64.btoa(value.body.email + ':' + value.body.password);
//     } else if (value.authorization === 'Bearer' || value.authorization === true) {
//       authorization = `Bearer ${token}`;
//     }

//     // Check if body is FormData
//     const isFormData = value.body instanceof FormData;

//     // Build headers
//     const headers = {
//       Accept: 'application/json',
//       ...(authorization && { Authorization: authorization }),
//       // Don't set Content-Type for FormData - let browser set it with boundary
//       ...(!isFormData && { 'Content-Type': 'application/json' }),
//     };

//     // Build fetch options
//     const fetchOptions = {
//       method: value.method.toUpperCase(),
//       headers,
//     };

//     // Add body if present and method supports it
//     if (value.body && !['GET', 'HEAD'].includes(value.method.toUpperCase())) {
//       fetchOptions.body = isFormData ? value.body : JSON.stringify(value.body);
//     }

//     console.log('API Request:', {
//       url: value.api,
//       method: value.method,
//       headers: fetchOptions.headers,
//       bodyType: isFormData ? 'FormData' : 'JSON'
//     });

//     // Perform the API call
//     const response = yield fetch(value.api, fetchOptions);

//     if (!response.ok) {
//       let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
//       try {
//         const errorData = yield response.json();
//         errorMessage = errorData.message || errorData.error || errorMessage;
//       } catch (parseError) {
//         console.warn('Could not parse error response:', parseError);
//       }
//       throw new Error(errorMessage);
//     }

//     // Handle 204 No Content
//     if (response.status === 204) {
//       const result = { status: 204, message: 'Success' };
//       if (value.successAction) {
//         yield put({
//           type: value.successAction.type,
//           payload: value.payload || result
//         });
//       }
//       return result;
//     }

//     // Parse JSON response
//     const data = yield response.json();
//     console.log('API Response:', data);

//     // Dispatch success action
//     if (value.successAction) {
//       yield put({
//         type: value.successAction.type,
//         payload: data
//       });
//     }

//     return data;

//   } catch (error) {
//     console.error('API Error:', error);

//     // Dispatch fail action
//     if (value.failAction) {
//       yield put({
//         type: value.failAction.type,
//         payload: error.message || 'Unknown error'
//       });
//     }

//     throw error;
//   }
// }

// export default commonApi;

// --------------------------------------------------------------------------------------------------


// import axios from 'axios';
// import { put } from 'redux-saga/effects';
// import config from '../config';
// import { Base64 } from 'js-base64';

// function* commonApi(value) {
//   try {
//     // Get token from localStorage or config
//     const token = localStorage.getItem(config.token) || config.token;

//     // Build authorization header
//     let authorization = '';
//     if (value.authorization === 'Basic') {
//       const credentials = `${value.body.email}:${value.body.password}`;
//       authorization = 'Basic ' + Base64.btoa(credentials);
//     } else if (value.authorization === 'Bearer' || value.authorization === true) {
//       authorization = `Bearer ${token}`;
//     }

//     // Check if body is FormData
//     const isFormData = value.body instanceof FormData;

//     // Configure headers
//     const headers = {
//       Accept: 'application/json',
//       ...(authorization && { Authorization: authorization }),
//       ...(!isFormData && { 'Content-Type': 'application/json' }),
//     };

//     // Axios request config
//     const axiosConfig = {
//       url: value.api,
//       method: value.method.toLowerCase(),
//       headers,
//       ...(value.body && !['get', 'head'].includes(value.method.toLowerCase()) && {
//         data: value.body,
//       }),
//       ...(value.method.toLowerCase() === 'get' && value.body && {
//         params: value.body,
//       }),
//     };

//     console.log('API Request:', axiosConfig);

//     // Perform API request
//     const response = yield axios(axiosConfig);
//     const data = response.data;

//     console.log('API Response:', data);

//     // Dispatch success action
//     if (value.successAction) {
//       yield put({
//         type: value.successAction.type,
//         payload: data,
//       });
//     }

//     return data;

//   } catch (error) {
//     let errorMessage = 'Unknown error';

//     if (error.response) {
//       errorMessage = error.response.data?.message || error.response.data?.error || error.response.statusText;
//     } else if (error.message) {
//       errorMessage = error.message;
//     }

//     console.error('API Error:', errorMessage);

//     // Dispatch fail action
//     if (value.failAction) {
//       yield put({
//         type: value.failAction.type,
//         payload: errorMessage,
//       });
//     }

//     throw new Error(errorMessage);
//   }
// }

// export default commonApi;

// --------------------------------------------------------------------------------------------------

import axios from 'axios';
import { put } from 'redux-saga/effects';
import config from '../config';
import { Base64 } from 'js-base64';

function* commonApi(value) {
  try {
    // Get token from localStorage or config
    const token = localStorage.getItem(config.token) || config.token;

    // Build authorization header
    let authorization = '';
    if (value.authorization === 'Basic') {
      const credentials = `${value.body.email}:${value.body.password}`;
      authorization = 'Basic ' + Base64.btoa(credentials);
    } else if (value.authorization === 'Bearer' || value.authorization === true) {
      authorization = `Bearer ${token}`;
    }

    // Check if body is FormData
    const isFormData = value.body instanceof FormData;

    // Configure headers
    const headers = {
      Accept: 'application/json',
      ...(authorization && { Authorization: authorization }),
      ...(!isFormData && { 'Content-Type': 'application/json' }),
    };

    // Axios request config
    const axiosConfig = {
      url: value.api,
      method: value.method.toLowerCase(),
      headers,
      ...(value.body &&
        !['get', 'head'].includes(value.method.toLowerCase()) && {
          data: value.body,
        }),
      ...(value.method.toLowerCase() === 'get' &&
        value.body && {
          params: value.body,
        }),
      timeout: 30000, // prevent hanging requests
    };

    console.log('API Request:', axiosConfig);

    // Perform API request
    const response = yield axios(axiosConfig);
    const data = response.data;

    console.log('API Response:', data);

    // Dispatch success action
    if (value.successAction) {
      yield put({
        type: value.successAction.type,
        payload: data,
      });
    }

    return data;
  } catch (error) {
    let errorMessage = 'Something went wrong, please try again later.';

    if (error.response) {
      // Backend returned error
      if (error.response.status === 413) {
        errorMessage = 'Upload is too large. Max 50MB allowed.';
      } else {
        errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          error.response.statusText;
      }
    } else if (error.request) {
      // No response received (CORS / network issue)
      errorMessage =
        'Unable to reach server. Please check your connection or try again later.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    console.error('API Error:', errorMessage);

    // Dispatch fail action
    if (value.failAction) {
      yield put({
        type: value.failAction.type,
        payload: errorMessage,
      });
    }

    // Instead of crashing saga, return safe object
    return { success: false, message: errorMessage };
  }
}

export default commonApi;

