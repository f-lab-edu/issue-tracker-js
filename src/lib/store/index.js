import reducer, { initialState } from './reducer';
import Store from './config/store';

const store = new Store(reducer, initialState);

export default store;
