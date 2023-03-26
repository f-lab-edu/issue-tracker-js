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
    path: '/api/board',
    statusCode: 200,
    responseCallback: () => mockData.getBoards(),
  });

export const mockPostBoards = () =>
  mockServer({
    method: 'POST',
    path: '/api/board',
    statusCode: 200,
    responseCallback: ({ data }) => {
      mockData.addBoard(data);
      return mockData.getBoards();
    },
  });

export default [mockGetBoards, mockPostBoards];
