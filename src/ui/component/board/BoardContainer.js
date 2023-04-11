import { css, html } from 'lit';
import CoreComponent from '../CoreComponent';
import store from '../../../lib/store';
import { addBoardItemAction, closeBoardTextareaAction, editBoardColumnAction, openBoardTextareaAction, removeBoardColumnAction } from '../../../lib/store/reducer/boardReducer';
import { apiDeleteBoardColumn, apiPatchBoardColumn, apiPostBoard } from '../../../lib/api/board';
import { ALERT, PAGE } from '../../../lib/constant/message';
import { useAlert, useConfirm, useTextInputModal, validateTextInputWithAlert } from '../../../lib/utils/dialog';
import { attachEvent } from '../../../lib/utils/dom';
import { INPUT_TEXT } from '../../../lib/constant/dom';

class BoardContainer extends CoreComponent {
  constructor() {
    super(['board']);
  }

  static get styles() {
    return css`
      .board-container {
        width: 320px;
        height: auto;
        min-height: 64px;
        margin-right: 32px;
      }
      .board-container__header {
        display: flex;
        align-content: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .board-container__title {
        display: flex;
        align-items: center;
        height: 26px;
        margin: 0;
      }
      .board-container__action {
        display: flex;
        align-items: center;
      }
      .board-container__button-icon {
        width: 20px;
        height: 20px;
        display: flex;
        background-color: transparent;
        border: unset;
        justify-content: center;
        align-items: center;
        padding: 0;
        cursor: pointer;
      }
      .board-container__button-icon img {
        width: 10px;
        height: auto;
      }
      .board-container__title-text {
        font-size: var(--font-size-default);
        font-weight: var(--font-weight-medium);
        color: #000000ab;
        border-radius: var(--border-radius);
        padding: 6px 10px;
        margin: 0;
        background-color: #ffba74b3;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .board-container__count {
        display: flex;
        align-items: center;
        font-size: var(--font-size-default);
        font-weight: var(--font-weight-bold);
        color: var(--color-text-light);
        margin: 0 0 0 var(--spacing-medium);
      }
      .board-container__input-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: var(--spacing-medium);
      }
      .board-container__input-text {
        width: 100%;
        min-height: 64px;
        height: 64px;
        max-height: var(--max-height-textarea);
        border-radius: var(--border-radius);
        border: 1px solid var(--color-border);
        padding: var(--spacing-medium);
        box-sizing: border-box;
        resize: vertical;
      }
      .board-container__input-text:focus {
        outline: none;
      }
      .board-container__button-group {
        display: flex;
        align-items: center;
        width: 100%;
        margin-top: var(--spacing-small);
      }
      .board-container__button {
        width: calc(100% - 24px);
        height: 32px;
        border: unset;
        border-radius: 4px;
        padding: 0;
        cursor: pointer;
        background-color: var(--color-white);
      }
      .board-container__button + .board-container__button {
        margin-left: var(--spacing-medium);
      }
      .board-container__button-cancel {
        background-color: #d4d4d482;
        color: var(--color-text-light);
      }
      .board-container__button-add {
        background-color: var(--color-primary);
        color: var(--color-white);
      }
    `;
  }

  static properties = {
    board: { type: String },
  };

  connectedCallback() {
    super.connectedCallback();
    this.attachRemoveItemEvent();
    this.attchBoardColumnTitleDoubleClickEvent();
  }

  shouldUpdate(_changedProperties) {
    super.shouldUpdate(_changedProperties);
    return true;
  }

  handleTextareaOpen(id) {
    store.dispatch(openBoardTextareaAction(id));
  }

  handleTextareaClose(id) {
    store.dispatch(closeBoardTextareaAction(id));
  }

  async handleBoardItemAdd(id) {
    const $textarea = this.shadowRoot.querySelector('.board-container__input-text');
    const title = $textarea.value;

    if (title.trim() === '') {
      const alert = useAlert({
        message: ALERT.TEXT_MIN_LENGTH,
        closeOnOutsideClick: true,
      });
      await alert.open();
      return;
    }

    try {
      const item = await apiPostBoard({ id, title });
      store.dispatch(addBoardItemAction({ id, item }));

      $textarea.value = '';
      $textarea.focus();
    } catch (e) {
      console.error('handleBoardItemAdd error: ', e);
    }
  }

  attachRemoveItemEvent() {
    const { id, title } = JSON.parse(this.props.board);
    attachEvent(this.shadowRoot, 'icon-button[icon=closeIcon]', 'click', this.handleRemoveBoardColumn.bind(this, { id, title }));
  }

  async handleRemoveBoardColumn({ id, title }) {
    const confirm = useConfirm({ message: `"${title}" ${ALERT.BOARD_COLUMN_REMOVE}`, closeOnOutsideClick: true });
    const isRemoveBoardColumn = await confirm.open();
    if (isRemoveBoardColumn) {
      try {
        await apiDeleteBoardColumn(id);
        store.dispatch(removeBoardColumnAction(id));
      } catch (e) {
        console.error('handleRemoveBoardColumn error: ', e);
      }
    }
  }

  attchBoardColumnTitleDoubleClickEvent() {
    const { title, id: boardId } = JSON.parse(this.props.board);
    attachEvent(this.shadowRoot, '.board-container__title', 'dblclick', this.handleBoardColumnTitleDoubleClickEvent.bind(this, { boardId, title }));
  }

  async handleBoardColumnTitleDoubleClickEvent() {
    const { title, id: boardId } = JSON.parse(this.props.board);
    const modal = useTextInputModal({
      title: PAGE.BOARD_COLUMN_MODAL_EDIT_TITLE,
      value: title,
      onSubmit: validateTextInputWithAlert.bind(null, ALERT.BOARD_COLUMN_EDIT_EMPTY),
      hideDialogDuringSubmit: true,
    });
    const editColumnFormData = await modal.open();
    try {
      await apiPatchBoardColumn({ boardId, title: editColumnFormData.text });
      store.dispatch(editBoardColumnAction({ boardId, title: editColumnFormData.text }));
    } catch (error) {
      console.error('attchBoardColumnTitleDoubleClickEvent error:', error);
    }
  }

  render() {
    const board = JSON.parse(this.props.board);
    return html`
      <section class="board-container">
        <header class="board-container__header">
          <h2 class="board-container__title">
            <span class="board-container__title-text" title="${board.title}">${board.title}</span>
            <span class="board-container__count">${board.items.length}</span>
          </h2>
          <nav class="board-container__action">
            <icon-button icon="addIcon" alt="add" @icon-button-click="${() => this.handleTextareaOpen(board.id)}"></icon-button>
            <icon-button icon="closeIcon" alt="close"></icon-button>
          </nav>
        </header>
        ${board.isTextareaOpen
          ? html`
              <div class="board-container__input-container">
                <textarea class="board-container__input-text" maxlength="${INPUT_TEXT.BOARD_ITEM_TITLE_LENGTH}" placeholder="Enter a note"></textarea>
                <div class="board-container__button-group">
                  <button class="board-container__button board-container__button-cancel" @click="${() => this.handleTextareaClose(board.id)}">취소</button>
                  <button class="board-container__button board-container__button-add" @click="${() => this.handleBoardItemAdd(board.id)}">추가</button>
                </div>
              </div>
            `
          : null}
        <board-list id="${board.id}" items="${JSON.stringify(board.items)}"></board-list>
      </section>
    `;
  }
}

customElements.define('board-container', BoardContainer);
export default BoardContainer;
