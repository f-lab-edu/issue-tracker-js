import { uuidv4 } from '../utils/string';
import { insertBoardItem, removeBoardItem, updateBoardColumnTitleById, updateBoardItemTitleById } from '../utils/board';

const getTemplateBoardColumn = (title = '') => ({
  id: uuidv4(),
  title,
  isTextareaOpen: false,
  items: [],
});

const getTemplateBoardColumnWithItems = (title = '') => ({
  id: uuidv4(),
  title,
  isTextareaOpen: false,
  items: [
    { id: uuidv4(), title: `${title} - 1`, content: [], author: 'bytrustu' },
    { id: uuidv4(), title: `${title} - 2`, content: [], author: 'bytrustu' },
    { id: uuidv4(), title: `${title} - 3`, content: [], author: 'bytrustu' },
    { id: uuidv4(), title: `${title} - 4`, content: [], author: 'bytrustu' },
  ],
});

const getTemplateBoardItem = (title = '') => ({
  id: uuidv4(),
  title,
  content: [],
  author: 'bytrustu',
});

class MockData {
  constructor() {
    this.boards = [getTemplateBoardColumnWithItems('할 일'), getTemplateBoardColumnWithItems('진행 중'), getTemplateBoardColumnWithItems('완료')];
  }

  getBoards() {
    return this.boards;
  }

  getBoardById(id) {
    return this.boards.find((data) => data.id === id);
  }

  getBoardItemById({ boardId, nodeId }) {
    const board = this.getBoardById(boardId);
    return board.items.find((item) => item.id === nodeId);
  }

  getBoardLastItemById(id) {
    const board = this.getBoardById(id);
    return board.items[board.items.length - 1];
  }

  addBoardById({ id, title }) {
    const boardIndex = this.boards.findIndex((data) => data.id === id);
    if (boardIndex !== -1) {
      const board = getTemplateBoardItem(title);
      this.boards[boardIndex].items.push(board);
    }
  }

  moveBoardItem({ nodeId, parentId, targetIndex }) {
    const findBoardItem = [...this.boards.map((board) => board.items).flat()].find((item) => item.id === nodeId);
    const boardsWithoutItem = removeBoardItem(this.boards, nodeId);
    this.boards = insertBoardItem(boardsWithoutItem, parentId, findBoardItem, targetIndex);
  }

  removeBoardColumnById(id) {
    this.boards = this.boards.filter((data) => data.id !== id);
  }

  removeBoardItemById({ boardId, nodeId }) {
    const boardIndex = this.boards.findIndex((data) => data.id === boardId);
    if (boardIndex !== -1) {
      this.boards[boardIndex].items = this.boards[boardIndex].items.filter((item) => item.id !== nodeId);
    }
  }

  updateBoardItemById({ boardId, nodeId, title }) {
    this.boards = updateBoardItemTitleById(this.boards, boardId, nodeId, title);
  }

  updateBoardColumnById({ boardId, title }) {
    this.boards = updateBoardColumnTitleById(this.boards, boardId, title);
  }

  addBoardColumn(title) {
    const board = getTemplateBoardColumn(title);
    this.boards.push(board);
    return board;
  }
}

const mockData = new MockData();

export default mockData;
