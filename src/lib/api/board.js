import request from './config';

export const apiGetBoardList = async () => {
  try {
    const response = await request.get('/boards');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiDeleteBoardColumn = async (id) => {
  try {
    const response = await request.delete(`/boards/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiPostBoard = async ({ id, title }) => {
  try {
    const response = await request.post('/board', { id, title });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiPutMoveBoard = async ({ nodeId, parentId, targetIndex }) => {
  try {
    const response = await request.put('/board/move', { nodeId, parentId, targetIndex });
    return response.data;
  } catch (error) {
    throw error;
  }
};
