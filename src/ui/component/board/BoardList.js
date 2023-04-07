import initializeDragAndDrop from '../../../lib/utils/initializeDragAndDrop';
import store from '../../../lib/store';
import { moveBoardItemAction } from '../../../lib/store/reducer/boardReducer';
import { apiPutMoveBoard } from '../../../lib/api/board';
import { forceNextTaskQueue } from '../../../lib/utils/timer';

class BoardList extends HTMLElement {
  constructor() {
    super();
    this.props = {};
    this.attachShadow({ mode: 'open' });
    this.props.initReder = false;
  }

  get styles() {
    return `
      <style>
      .board-list__body {
        padding: 0;
        margin: 0;
      }
      .board-list__item {
        width: 100%;
        height: auto;
        min-height: 64px;
        background-color: #fff;
        border-radius: 8px;
        margin-bottom: 12px;
        padding: 12px;
        display: flex;
        box-sizing: border-box;
        border: 1px solid var(--color-border);
        cursor: grab;
      }
      .board-list__item.last {
        min-height: 3px;
        background-color: transparent;
        border: unset;
      }
      .board-list__content {
        padding: 0 4px 4px 10px;
        width: 84%;
        line-break: anywhere;
        box-sizing: border-box;
      }
      .board-list__content ul {
        margin: 20px 0 0 0;
        padding: 0 0 0 20px;
      }
      .board-list__content li {
        font-size: 16px;
        color: var(--color-text);
      }
      .board-list__content-title {
        margin: 4px 0 0 0;
        padding: 0;
        font-weight: 400;
        font-size: 18px;
        color: var(--color-text);
      }
      .board-list__author {
        margin: 20px 0 0 0;
      }
      .board-list__author span {
        color: var(--color-text-light);
      }
      .board-list__icon {
        width: 8%;
        height: 100%;
        margin: 0;
      }
      .board-list__icon img {
        width: 100%;
        height: auto;
      }
      .board-list__item-footer {
        width: 8%;
        position: relative;
      }
      .board-list__item-footer button {
        width: 100%;
        cursor: pointer;
        border: unset;
        background-color: unset;
      }
      .board-list__item-footer button img {
        width: 10px;
        height: auto;
      }
      .page-layout__footer {
        grid-area: footer;
      }
      .todo-item.dragging {
        opacity: 0.5;
      }
      .todo-placeholder {
        height: 40px;
        background-color: rgba(128, 128, 128, 0.5);
        border: 2px dashed #000;
      }
      </style>
    `;
  }

  static get observedAttributes() {
    return ['id', 'items'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.props[name] = name === 'items' ? JSON.parse(newValue) : newValue;
  }

  connectedCallback() {
    this.render();
    store.subscribe(() => {
      forceNextTaskQueue(() => {
        const storeBoard = store.getState().boards.find((board) => board.id === this.props.id);
        if (!storeBoard) {
          return;
        }
        this.props.items = storeBoard.items;
        this.render();
      });
    });
  }

  async moveBoardItemWithAPI(moveElementInfo) {
    try {
      await apiPutMoveBoard(moveElementInfo);
      store.dispatch(moveBoardItemAction(moveElementInfo));
    } catch (e) {
      console.error('moveBoardItemWithAPI error:', e);
    }
  }

  initEvent() {
    forceNextTaskQueue(() => {
      const $list = this.shadowRoot.querySelector('.board-list__body');
      if ($list) {
        initializeDragAndDrop($list, this.moveBoardItemWithAPI);
        this.props.initReder = true;
      }
    });
  }

  createHTML({ id, items }) {
    return `
      <ul class="board-list__body" data-id="${id}" data-type="parent">
        ${items.reduce(
          (htmlString, item) =>
            `${htmlString}
              <li class="board-list__item" draggable="true" data-id="${item.id}" key="${item.id}">
                <figure class="board-list__icon">
                  <img src="https://i.imgur.com/ZiLeFCC.png" alt="todo" />
                </figure>
                <article class="board-list__content">
                  <h3 class="board-list__content-title">${item.title}</h3>
                  <footer class="board-list__author">
                    <span>Added by</span>
                    <strong>${item.author}</strong>
                  </footer>
                </article>
                <aside class="board-list__item-footer">
                  <icon-button icon="addIcon" alt="close" @icon-button-click="${this.handleButtonClick}"></icon-button>
                </aside>
              </li>
            `,
          '',
        )}
        <li class="board-list__item last"></li>
      </ul>
    `;
  }

  render() {
    const { id, items } = this.props;

    this.initEvent();

    this.shadowRoot.innerHTML = `
      ${this.styles}
      ${this.createHTML({ id, items })}
    `;
  }
}

customElements.define('board-list', BoardList);
export default BoardList;
