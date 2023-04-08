import { insertBoardItem, removeBoardItem, updateBoardColumnTitleById, updateBoardItemTitleById } from '../../utils/board';

export const SET_INITIAL_BOARD_ACTION = 'BOARD/SET_INITIAL';
export const ADD_BOARD_ITEM_ACTION = 'BOARD/ADD_ITEM';
export const REMOVE_BOARD_ITEM_ACTION = 'BOARD/REMOVE_ITEM';
export const EDIT_BOARD_ITEM_ACTION = 'BOARD/EDIT_ITEM';
export const ADD_BOARD_COLUMN_ACTION = 'BOARD/ADD_COLUMN';
export const EDIT_BOARD_COLUMN_ACTION = 'BOARD/EDIT_COLUMN';
export const MOVE_BOARD_ITEM_ACTION = 'BOARD/MOVE_ITEM';
export const REMOVE_BOARD_COLUMN_ACTION = 'BOARD/REMOVE_COLUMN';
export const OPEN_BOARD_TEXTAREA_ACTION = 'BOARD/OPEN_TEXTAREA';
export const CLOSE_BOARD_TEXTAREA_ACTION = 'BOARD/CLOSE_TEXTAREA';

export const initialState = {
  boards: [],
};

export const setInitialBoardAction = (payload) => ({
  type: SET_INITIAL_BOARD_ACTION,
  payload,
});

export const addBoardItemAction = (payload) => ({
  type: ADD_BOARD_ITEM_ACTION,
  payload,
});

export const removeBoardItemAction = (payload) => ({
  type: REMOVE_BOARD_ITEM_ACTION,
  payload,
});

export const editBoardItemAction = (payload) => ({
  type: EDIT_BOARD_ITEM_ACTION,
  payload,
});

export const addBoardColumnAction = (payload) => ({
  type: ADD_BOARD_COLUMN_ACTION,
  payload,
});

export const editBoardColumnAction = (payload) => ({
  type: EDIT_BOARD_COLUMN_ACTION,
  payload,
});

export const moveBoardItemAction = (payload) => ({
  type: MOVE_BOARD_ITEM_ACTION,
  payload,
});

export const removeBoardColumnAction = (payload) => ({
  type: REMOVE_BOARD_COLUMN_ACTION,
  payload,
});

export const openBoardTextareaAction = (payload) => ({
  type: OPEN_BOARD_TEXTAREA_ACTION,
  payload,
});

export const closeBoardTextareaAction = (payload) => ({
  type: CLOSE_BOARD_TEXTAREA_ACTION,
  payload,
});

const boardReducer = (state, action) => {
  switch (action.type) {
    case SET_INITIAL_BOARD_ACTION:
      return {
        ...state,
        boards: action.payload,
      };
    case ADD_BOARD_ITEM_ACTION:
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id === action.payload.id) {
            return {
              ...board,
              items: [...board.items, action.payload.item],
            };
          }
          return board;
        }),
      };
    case REMOVE_BOARD_ITEM_ACTION:
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id === action.payload.boardId) {
            return {
              ...board,
              items: board.items.filter((item) => item.id !== action.payload.nodeId),
            };
          }
          return board;
        }),
      };
    case EDIT_BOARD_ITEM_ACTION: {
      const { boardId, nodeId, title } = action.payload;
      const boards = updateBoardItemTitleById(state.boards, boardId, nodeId, title);
      return {
        ...state,
        boards,
      };
    }
    case ADD_BOARD_COLUMN_ACTION:
      return {
        ...state,
        boards: [...state.boards, action.payload],
      };
    case EDIT_BOARD_COLUMN_ACTION: {
      const { boardId, title } = action.payload;
      return {
        ...state,
        boards: updateBoardColumnTitleById(state.boards, boardId, title),
      };
    }
    case MOVE_BOARD_ITEM_ACTION: {
      const findBoardItem = state.boards.flatMap((board) => board.items).find((item) => item.id === action.payload.nodeId);
      const boardsWithoutItem = removeBoardItem(state.boards, action.payload.nodeId);
      return {
        ...state,
        boards: insertBoardItem(boardsWithoutItem, action.payload.parentId, findBoardItem, action.payload.targetIndex),
      };
    }
    case REMOVE_BOARD_COLUMN_ACTION:
      return {
        ...state,
        boards: state.boards.filter((board) => board.id !== action.payload),
      };
    case OPEN_BOARD_TEXTAREA_ACTION:
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id === action.payload) {
            return {
              ...board,
              isTextareaOpen: !board.isTextareaOpen,
            };
          }
          return board;
        }),
      };
    case CLOSE_BOARD_TEXTAREA_ACTION:
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id === action.payload) {
            return {
              ...board,
              isTextareaOpen: false,
            };
          }
          return board;
        }),
      };

    default:
      return state;
  }
};

export default boardReducer;
