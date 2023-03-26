class MockData {
  constructor() {
    this.boards = [];
  }

  getBoards() {
    return this.boards;
  }

  addBoard(board) {
    this.boards.push(board);
  }
}

const mockData = new MockData();

export default mockData;
