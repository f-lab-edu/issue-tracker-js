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

export const apiDeleteBoardItem = async ({ boardId, nodeId }) => {
  try {
    const response = await request.delete(`/board/${boardId}/${nodeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiPatchBoardItem = async ({ boardId, nodeId, title }) => {
  try {
    const response = await request.patch(`/board/${boardId}/${nodeId}`, { title });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiPatchBoardColumn = async ({ boardId, title }) => {
  try {
    const response = await request.patch(`/board/${boardId}`, { title });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiPostBoardColumn = async ({ title }) => {
  try {
    const response = await request.post(`/boards`, { title });
    return response.data;
  } catch (error) {
    throw error;
  }
};
