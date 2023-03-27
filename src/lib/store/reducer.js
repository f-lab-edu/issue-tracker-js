import { ADD_BOARD } from './actionTypes';
import { getUniqueId } from '../utils/string';

const makeBoard = (title = '') => ({
  id: getUniqueId(),
  title,
  items: [],
});

export const initialState = {
  boards: [makeBoard('할 일'), makeBoard('진행 중'), makeBoard('완료')],
};

export const addBoardAction = (title) => ({
  type: ADD_BOARD,
  payload: title,
});

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_BOARD:
      return {
        ...state,
        boards: [...state.boards, makeBoard(action.payload)],
      };
    default:
      return state;
  }
};

export default reducer;
