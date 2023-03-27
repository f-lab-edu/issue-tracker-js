import store from './lib/store';
import './ui/component';

function App({ $target }) {
  const $main = document.createElement('main');

  const init = () => {
    render();
  };

  const render = () => {
    $main.innerHTML = `<board-header></board-header><board-body></board-body>`;
    $target.appendChild($main);
  };

  init();

  store.subscribe(render);
}

export default App;
