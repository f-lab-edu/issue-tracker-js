export const SET_INITIAL_BOARD_ACTION = 'BOARD/SET_INITIAL';
export const ADD_BOARD_COLUMN_ACTION = 'BOARD/ADD_COLUMN';
export const ADD_BOARD_ITEM_ACTION = 'BOARD/ADD_ITEM';
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
    case ADD_BOARD_COLUMN_ACTION:
      return {
        ...state,
        boards: [],
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
    case OPEN_BOARD_TEXTAREA_ACTION:
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id === action.payload) {
            return {
              ...board,
              isTextareaOpen: true,
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
