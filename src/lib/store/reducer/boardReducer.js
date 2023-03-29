import { getUniqueId } from '../../utils/string';

const makeBoard = (title = '') => ({
  id: getUniqueId(),
  title,
  items: [],
});

const ADD_BOARD_COLUMN_ACTION = 'BOARD/ADD_COLUMN';

export const initialState = {
  boards: [makeBoard('할 일'), makeBoard('진행 중'), makeBoard('완료')],
};

export const addBoardAction = (title) => ({
  type: ADD_BOARD_COLUMN_ACTION,
  payload: title,
});

const boardReducer = (state, action) => {
  switch (action.type) {
    case ADD_BOARD_COLUMN_ACTION:
      return {
        ...state,
        boards: [...state.boards, makeBoard(action.payload)],
      };
    default:
      return state;
  }
};

export default boardReducer;
