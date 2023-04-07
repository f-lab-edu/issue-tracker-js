import { uuidv4 } from '../utils/string';
import { insertBoardItem, removeBoardItem } from '../utils/board';

const getTemplateBoardColumn = (title = '') => ({
  id: uuidv4(),
  title,
  isTextareaOpen: false,
  items: [
    { id: uuidv4(), title: `제목 ${title} - 0`, content: [], author: 'bytrustu' },
    { id: uuidv4(), title: `제목 ${title} - 1`, content: [], author: 'bytrustu' },
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
    this.boards = [getTemplateBoardColumn('할 일'), getTemplateBoardColumn('진행 중'), getTemplateBoardColumn('완료')];
  }

  getBoards() {
    return this.boards;
  }

  getBoardById(id) {
    return this.boards.find((data) => data.id === id);
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
}

const mockData = new MockData();

export default mockData;
