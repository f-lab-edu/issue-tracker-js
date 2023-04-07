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

export default [mockGetBoards, mockPostBoard, mockPutMoveBoard];
