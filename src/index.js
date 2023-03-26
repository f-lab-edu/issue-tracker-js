import initialWorker from './lib/mocks';
import request from './lib/api';

const init = async () => {
  const isWorker = await initialWorker();
  if (isWorker) {
    const btn1 = document.createElement('button');
    btn1.setAttribute('id', 'btn-1');
    btn1.textContent = '등록1';
    btn1.addEventListener('click', () => {
      request.post('/board', { title: 'test1' }).then((response) => {
        console.log(response);
      });
    });

    const btn2 = document.createElement('button');
    btn2.setAttribute('id', 'btn-2');
    btn2.textContent = '등록2';
    btn2.addEventListener('click', () => {
      request.post('/board', { title: 'test2' }).then((response) => {
        console.log(response);
      });
    });

    const btn3 = document.createElement('button');
    btn3.setAttribute('id', 'btn-3');
    btn3.textContent = '조회';
    btn3.addEventListener('click', () => {
      request.get('/board').then((response) => {
        console.log(response);
      });
    });

    const $app = document.querySelector('#app');
    $app.appendChild(btn1);
    $app.appendChild(btn2);
    $app.appendChild(btn3);
  }
};

document.addEventListener('DOMContentLoaded', init);
