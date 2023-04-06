import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
  timeout: 3000,
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError = handleErrorResponse(error);
    return Promise.reject(customError);
  },
);

export class CustomError extends Error {
  constructor(name, message, originError) {
    super(message);
    this.name = name || 'CustomError';
    this.originError = originError;
  }
}

export const handleErrorResponse = (error) => {
  const errorMessage = error?.message || 'Unknown error';
  const customError = new CustomError(null, errorMessage, error);

  if (error instanceof CustomError) {
    console.log('CustomError:', customError.name, customError.message);
  } else {
    console.log('Error:', customError.originError?.name, customError.message);
  }

  return customError;
};

export default request;
