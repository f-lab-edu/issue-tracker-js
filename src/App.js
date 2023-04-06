import './ui/component';
import './ui/component/layout';
import { apiGetBoardList } from './lib/api/board';
import store from './lib/store';
import { setInitialBoardAction } from './lib/store/reducer/boardReducer';

function App({ $target }) {
  const $main = document.createElement('main');

  const updateInitialBoard = async () => {
    const boards = await apiGetBoardList();
    store.dispatch(setInitialBoardAction(boards));
  };

  const render = async () => {
    await updateInitialBoard();
    $main.innerHTML = `<page-layout></page-layout>`;
    $target.appendChild($main);
  };

  render();
}

export default App;
