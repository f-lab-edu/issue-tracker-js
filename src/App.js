import store from './lib/store';
import './ui/component';

function App({ $target }) {
  const $main = document.createElement('main');

  const render = () => {
    $main.innerHTML = `<board-header></board-header><board-body></board-body>`;
    $target.appendChild($main);
  };

  render();
}

export default App;
