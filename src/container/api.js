// import { put } from 'redux-saga/effects';
// import config from '../config';

// // Main API handler generator for Redux-Saga
// function* commonApi(value) {
//   console.log('value===', value);

//   // Get token from config
//   const token = config.token;

//   // Build authorization header (supports Basic and Bearer)
//   let authorization = value.authorization
//     ? value.authorization === 'Basic'
//       ? 'Basic ' + btoa(value.body.email + ':' + value.body.password)
//       : token
//     : token;

//   // Headers with and without authorization
//   const authHeader = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: authorization };
//   const noauthHeader = {
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   };

//   try {
//     // Build fetch options
//     const fetchOptions = {
//       method: `${value.method}`,
//       headers: value.authorization ? authHeader : noauthHeader
//     };
//     // Only add body if present and method is not GET or HEAD
//     if (value.body && !['GET', 'HEAD'].includes(value.method.toUpperCase())) {
//       fetchOptions.body = JSON.stringify(value.body);
//     }

//     // Perform the API call
//     const response = yield fetch(`${value.api}`, fetchOptions);
//     console.log("==resp==", response);

//     if (!response.ok) {
//       // If response is not ok, throw to catch block
//       throw response;
//     } else {
//       // Parse JSON and dispatch success action
//       const resJSON = yield response.json();

//       yield put(value.successAction(resJSON)); // use action creator
//       return resJSON;
//     }
//   } catch (error) {
//     // Log and dispatch fail action
//     console.error('error', error);
//     yield put(value.failAction(error)); // use action creator
//   }
// }

// export default commonApi;


// import { put } from 'redux-saga/effects';
// import config from '../config';

// function* commonApi(value) {
//   console.log('commonApi ->', value);

//   // 1. Get token from localStorage or fallback to config
//   const token = localStorage.getItem('adminToken') || config.token;

//   // 2. Build Authorization header
//   let authorization = '';

//   if (value.authorization === 'Basic') {
//     const { email, password } = value.body || {};
//     if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
//       throw new Error('Missing or invalid Basic auth credentials');
//     }
//     authorization = 'Basic ' + btoa(`${email}:${password}`);
//   } else if (value.authorization === 'Bearer') {
//     if (!token) {
//       throw new Error('Bearer token is required but not found');
//     }
//     authorization = `Bearer ${token}`;
//   } else if (value.authorization) {
//     authorization = token ? `${value.authorization} ${token}` : '';
//   } else {
//     authorization = token ? `Bearer ${token}` : '';
//   }

//   // 3. Detect content type
//   const isFormData = value.body instanceof FormData;

//   // 4. Setup headers
//   const headers = {
//     Accept: 'application/json',
//     ...(authorization && { Authorization: authorization }),
//     ...(!isFormData && { 'Content-Type': 'application/json' }),
//   };

//   // 5. Configure fetch options
//   const method = (value.method || 'GET').toUpperCase();
//   const options = {
//     method,
//     headers,
//   };

//   if (value.body && !['GET', 'HEAD'].includes(method)) {
//     options.body = isFormData ? value.body : JSON.stringify(value.body);
//   }

//   try {
//     // 6. Perform API call
//     const response = yield fetch(value.api, options);

//     if (!response.ok) {
//       let errorMsg = response.statusText || 'Unknown error';
//       try {
//         const contentType = response.headers.get('content-type');
//         if (contentType && contentType.includes('application/json')) {
//           const errData = yield response.json();
//           errorMsg = errData?.message || errData?.error || errorMsg;
//         }
//       } catch (parseError) {
//         console.warn('Failed to parse error response:', parseError);
//       }
//       throw new Error(`${response.status}: ${errorMsg}`);
//     }

//     // 7. Handle no content (HEAD or 204 responses)
//     if (response.status === 204 || (method === 'HEAD' && response.status === 200)) {
//       const result = { status: response.status, message: 'No Content' };
//       if (value.successAction) yield put(value.successAction(result));
//       return result;
//     }

//     // 8. Parse response JSON
//     const contentType = response.headers.get('content-type');
//     if (!contentType || !contentType.includes('application/json')) {
//       throw new Error('Response is not JSON');
//     }
//     const result = yield response.json();

//     // 9. Dispatch success action if provided
//     if (value.successAction) yield put(value.successAction(result));

//     // 10. Return result to saga caller
//     return result;
//   } catch (error) {
//     console.error('API error:', error.message);

//     // Dispatch failure action if provided
//     if (value.failAction) yield put(value.failAction(error.message));

//     // Throw error for further saga handling
//     throw error;
//   }
// }

// export default commonApi;

// ------------------------------------------------------------------------------

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
      ...(value.body && !['get', 'head'].includes(value.method.toLowerCase()) && {
        data: value.body,
      }),
      ...(value.method.toLowerCase() === 'get' && value.body && {
        params: value.body,
      }),
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
    let errorMessage = 'Unknown error';

    if (error.response) {
      errorMessage = error.response.data?.message || error.response.data?.error || error.response.statusText;
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

    throw new Error(errorMessage);
  }
}

export default commonApi;
