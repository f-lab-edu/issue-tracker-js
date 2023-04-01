import initialWorker from './lib/mocks';
import App from './App';
import './ui/styles/reset.css';
import './ui/styles/root.css';

const init = async () => {
  const isWorker = await initialWorker();
  if (isWorker) {
    const $app = document.querySelector('#app');
    new App({ $target: $app });
  }
};

document.addEventListener('DOMContentLoaded', init);
