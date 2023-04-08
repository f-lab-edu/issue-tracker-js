import initializeDragAndDrop from '../../../lib/utils/initializeDragAndDrop';
import store from '../../../lib/store';
import { editBoardItemAction, moveBoardItemAction, removeBoardItemAction } from '../../../lib/store/reducer/boardReducer';
import { apiDeleteBoardItem, apiPatchBoardItem, apiPutMoveBoard } from '../../../lib/api/board';
import { attachEvent, closest } from '../../../lib/utils/dom';
import { forceNextTaskQueue } from '../../../lib/utils/timer';
import { ALERT, PAGE } from '../../../lib/constant/message';
import { useConfirm, useTextAreaModal, validateTextInputWithAlert } from '../../../lib/utils/dialog';

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
        background-color: var(--color-white);
        border-radius: 8px;
        margin-bottom: var(--spacing-medium);
        padding: var(--spacing-medium);
        display: flex;
        box-sizing: border-box;
        border: 1px solid var(--border-color);
        cursor: grab;
      }
      .board-list__empty {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        font-size: 16px;
        color: var(--color-text);
        width: 100%;
        height: 32px;
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
        font-size: var(--font-size-large);
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
    this.initEvent();
    this.attchBoardItemDoubleClickEvent();
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

  attachRemoveItemEvent() {
    attachEvent(this.shadowRoot, '.board-list__body', 'click', (e) => {
      if (e.target.tagName === 'ICON-BUTTON') {
        const { id: boardId } = e.target.closest('.board-list__body').dataset;
        const { id: nodeId } = e.target.closest('.board-list__item').dataset;
        this.handleBoardItemRemove({
          boardId,
          nodeId,
        });
      }
    });
  }

  async handleBoardItemRemove({ boardId, nodeId }) {
    const confirm = useConfirm({
      message: ALERT.BOARD_ITEM_REMOVE,
      closeOnOutsideClick: true,
    });
    const isConfirm = await confirm.open();
    if (isConfirm) {
      try {
        await apiDeleteBoardItem({ boardId, nodeId });
        store.dispatch(removeBoardItemAction({ boardId, nodeId }));
      } catch (e) {
        console.error('handleBoardItemRemove error:', e);
      }
    }
  }

  attchBoardItemDoubleClickEvent() {
    attachEvent(this.shadowRoot, '.board-list__body', 'dblclick', (e) => {
      const $target = e.target.tagName === 'ARTICLE' ? e.target : closest(e.target, 'article');
      const { id: boardId } = e.target.closest('.board-list__body').dataset;
      const { id: nodeId } = closest($target, '[data-id]').dataset;
      const { title } = this.props.items.find((item) => item.id === nodeId);
      this.handleBoardItemDoubleClick({
        boardId,
        nodeId,
        title,
      });
    });
  }

  async handleBoardItemDoubleClick({ boardId, nodeId, title = '' }) {
    const modal = useTextAreaModal({
      title: PAGE.BOARD_ITEM_MODAL_EDIT_TITLE,
      value: title,
      onSubmit: validateTextInputWithAlert.bind(this, ALERT.BOARD_ITEM_EDIT_EMPTY),
      hideDialogDuringSubmit: true,
    });
    const editFormData = await modal.open();
    try {
      await apiPatchBoardItem({ boardId, nodeId, title: editFormData.text });
      store.dispatch(editBoardItemAction({ boardId, nodeId, title: editFormData.text }));
    } catch (e) {
      console.error('handleBoardItemDoubleClick error:', e);
    }
  }

  createHTML({ id, items }) {
    return `
      <ul class="board-list__body" data-id="${id}" data-type="parent">
        ${items.length === 0 ? `<li class="board-list__empty">${PAGE.BOARD_ITEM_EMPTY}</li>` : ''}
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
                  <icon-button icon='closeIcon' alt='close'></icon-button>
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
    this.attachRemoveItemEvent();

    this.shadowRoot.innerHTML = `
      ${this.styles}
      ${this.createHTML({ id, items })}
    `;
  }
}

customElements.define('board-list', BoardList);
export default BoardList;
