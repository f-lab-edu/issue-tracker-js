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
