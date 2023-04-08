import { rest } from 'msw';
import { isObjectEmpty } from '../utils/object';
import mockData from './mockData';

const mockServer = ({ method, path, statusCode, responseCallback }) =>
  rest[method.toLowerCase()](path, (req, res, ctx) => {
    const hasParams = !isObjectEmpty(req.params);
    const hasData = ['POST', 'PUT', 'PATCH'].includes(method) && !isObjectEmpty(req.body);
    const response = responseCallback({
      ...(hasParams && { params: req.params }),
      ...(hasData && { data: req.body }),
    });
    return res(ctx.status(statusCode), ctx.json(response));
  });

export const mockGetBoards = () =>
  mockServer({
    method: 'GET',
    path: '/api/boards',
    statusCode: 200,
    responseCallback: () => mockData.getBoards(),
  });

export const mockPostBoard = () =>
  mockServer({
    method: 'POST',
    path: '/api/board',
    statusCode: 200,
    responseCallback: ({ data }) => {
      const { id, title } = data;
      mockData.addBoardById({ id, title });
      return mockData.getBoardLastItemById(id);
    },
  });

export const mockPutMoveBoard = () =>
  mockServer({
    method: 'PUT',
    path: '/api/board/move',
    statusCode: 200,
    responseCallback: ({ data }) => {
      const { nodeId, parentId, targetIndex } = data;
      mockData.moveBoardItem({ nodeId, parentId, targetIndex });
      return mockData.getBoards();
    },
  });

export const mockDeleteBoardColumn = () =>
  mockServer({
    method: 'DELETE',
    path: '/api/boards/:id',
    statusCode: 200,
    responseCallback: ({ params }) => {
      const { id } = params;
      mockData.removeBoardColumnById(id);
    },
  });

export const mockDeleteBoardItem = () =>
  mockServer({
    method: 'DELETE',
    path: '/api/board/:boardId/:nodeId',
    statusCode: 200,
    responseCallback: ({ params }) => {
      const { boardId, nodeId } = params;
      mockData.removeBoardItemById({ boardId, nodeId });
    },
  });

export const mockPatchBoardItem = () =>
  mockServer({
    method: 'PATCH',
    path: '/api/board/:boardId/:nodeId',
    statusCode: 200,
    responseCallback: ({ params, data }) => {
      const { boardId, nodeId } = params;
      const { title } = data;
      mockData.updateBoardItemById({ boardId, nodeId, title });
      return mockData.getBoardItemById({ boardId, nodeId });
    },
  });

export const mockPatchBoardColumn = () =>
  mockServer({
    method: 'PATCH',
    path: '/api/board/:boardId',
    statusCode: 200,
    responseCallback: ({ params, data }) => {
      mockData.updateBoardColumnById({ boardId: params.boardId, title: data.title });
      return mockData.getBoardById(params.boardId).title;
    },
  });

export const mockPostBoardColumn = () =>
  mockServer({
    method: 'POST',
    path: '/api/boards',
    statusCode: 200,
    responseCallback: ({ data }) => {
      const { title } = data;
      return mockData.addBoardColumn(title);
    },
  });

export default [mockGetBoards, mockPostBoard, mockPutMoveBoard, mockDeleteBoardColumn, mockDeleteBoardItem, mockPatchBoardItem, mockPatchBoardColumn, mockPostBoardColumn];
