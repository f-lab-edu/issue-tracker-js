import request, { handleErrorResponse } from './config';

export const apiGetBoardList = async () => {
  try {
    const response = await request.get('/boards');
    return response.data;
  } catch (error) {
    handleErrorResponse(error);
    throw error;
  }
};

export const apiPostBoard = async ({ id, title }) => {
  try {
    const response = await request.post('/board', { id, title });
    return response.data;
  } catch (error) {
    handleErrorResponse(error);
    throw error;
  }
};
