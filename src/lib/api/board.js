import request, { handleErrorResponse } from './config';

export const apiGetBoardList = async () => {
  try {
    const response = await request.get('/board');
    return response.data;
  } catch (error) {
    handleErrorResponse(error);
    throw error;
  }
};
