import boardReducer, { initialState } from './reducer/boardReducer';
import Store from './config/store';

const store = new Store(boardReducer, initialState);

export default store;
