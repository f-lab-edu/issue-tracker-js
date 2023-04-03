import { getUniqueId } from '../utils/string';

const getTemplateBoardColumn = (title = '') => ({
  id: getUniqueId(),
  title,
  isTextareaOpen: false,
  items: [
    { id: getUniqueId(), title: `제목 ${getUniqueId(4)}`, content: [`컨텐츠 ${getUniqueId(4)}`], author: 'bytrustu' },
    { id: getUniqueId(), title: `제목 ${getUniqueId(4)}`, content: [`컨텐츠 ${getUniqueId(4)}`], author: 'bytrustu' },
  ],
});

const getTemplateBoardItem = (title = '') => ({
  id: getUniqueId(),
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
}

const mockData = new MockData();

export default mockData;
