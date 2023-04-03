import store from './lib/store';
import './ui/component';
import './ui/component/layout';

function App({ $target }) {
  const $main = document.createElement('main');

  const render = () => {
    $main.innerHTML = `<page-layout></page-layout>`;
    $target.appendChild($main);
  };

  render();
}

export default App;
