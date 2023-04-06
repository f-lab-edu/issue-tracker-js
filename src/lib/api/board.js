import request from './config';

export const apiGetBoardList = async () => {
  try {
    const response = await request.get('/boards');
    return response.data;
  } catch (error) {
    return [];
  }
};

export const apiPostBoard = async ({ id, title }) => {
  try {
    const response = await request.post('/board', { id, title });
    return response.data;
  } catch (error) {
    return {};
  }
};
