import initialWorker from './lib/mocks';
import App from './App';

const init = async () => {
  const isWorker = await initialWorker();
  if (isWorker) {
    const $app = document.querySelector('#app');
    new App({ $target: $app });
  }
};

document.addEventListener('DOMContentLoaded', init);
