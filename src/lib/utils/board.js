export const removeBoardItem = (boards, nodeId) =>
  boards.map((board) => ({
    ...board,
    items: board.items.filter((item) => item.id !== nodeId),
  }));

export const insertBoardItem = (boards, parentId, item, targetIndex) =>
  boards.map((board) => {
    if (board.id === parentId) {
      return {
        ...board,
        items: [...board.items.slice(0, targetIndex), item, ...board.items.slice(targetIndex)],
      };
    }
    return board;
  });

export const updateBoardItemTitleById = (boards, boardId, nodeId, title) => {
  const boardIndex = boards.findIndex((data) => data.id === boardId);
  if (boardIndex !== -1) {
    const boardItemIndex = boards[boardIndex].items.findIndex((item) => item.id === nodeId);
    if (boardItemIndex !== -1) {
      boards[boardIndex].items[boardItemIndex].title = title;
    }
  }
  return boards;
};

export const updateBoardColumnTitleById = (boards, boardId, title) => {
  const boardIndex = boards.findIndex((data) => data.id === boardId);
  if (boardIndex !== -1) {
    boards[boardIndex].title = title;
  }
  return boards;
};
