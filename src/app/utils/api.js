import axios from 'axios';
import { API_HOST, API_ROOT } from '../constants/api';

export async function callApi(endpoint, params = {}) {
  console.log('[CALL API] Called with endpoint', endpoint);

  const { method = 'GET', body = null } = params;

  const url = endpoint.indexOf('http') !== 0 ? `${API_HOST}${API_ROOT}${endpoint}` : endpoint;
  const options = {
    url,
    method,
  };

  console.log('[API]', url);

  if (body) {
    if (method === 'GET') {
      options.url += optionsToParameterizedUrl(body);
    } else {
      options.data = body;
    }
  }

  const result = await axios(options);

  console.log('[API CALL RESPONSE]', result);

  return result;
}

export function optionsToParameterizedUrl(options) {
  if (!options) return '';

  const values = Object.keys(options)
    .map(key => `${key}=${options[key]}`)
    .join('&');

  return values.length ? `?${values}` : '';
}

export async function request(endpoint, options, checkErrors = true) {
  const response = await callApi(endpoint, options);
  console.log('RESPONSE', response);
  if (checkErrors) {
    checkSuccess(response);
  }

  return response.data;
}

export const Request = {
  get: (endpoint, data) => request(endpoint, { body: data }),
  post: (endpoint, data) => request(endpoint, { method: 'POST', body: data }),
  put: (endpoint, data) => request(endpoint, { method: 'PUT', body: data }),
  delete: (endpoint, data) => request(endpoint, { method: 'DELETE', body: data }),
};

function checkSuccess(response) {
  const isError = !response;
  if (isError) {
    throw new Error('[NETWORK ERROR]');
  }
}
