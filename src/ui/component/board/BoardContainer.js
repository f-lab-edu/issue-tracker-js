import { css, html } from 'lit';
import CoreComponent from '../CoreComponent';
import store from '../../../lib/store';
import { addBoardItemAction, closeBoardTextareaAction, openBoardTextareaAction, removeBoardColumnAction } from '../../../lib/store/reducer/boardReducer';
import { apiDeleteBoardColumn, apiPostBoard } from '../../../lib/api/board';

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
      }
      .board-container__count {
        display: flex;
        align-items: center;
        font-size: var(--font-size-default);
        font-weight: var(--font-weight-bold);
        color: var(--color-text-light);
        margin: 0 0 0 12px;
      }
      .board-container__input-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 12px;
      }
      .board-container__input-text {
        width: 100%;
        height: 64px;
        border-radius: var(--border-radius);
        border: 1px solid var(--color-border);
        padding: 12px;
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
        margin-top: 6px;
      }
      .board-container__button {
        width: calc(100% - 24px);
        height: 32px;
        border: unset;
        border-radius: 4px;
        padding: 0;
        cursor: pointer;
        background-color: #fff;
      }
      .board-container__button + .board-container__button {
        margin-left: 12px;
      }
      .board-container__button-cancel {
        background-color: #d4d4d482;
      }
      .board-container__button-add {
        background-color: var(--color-primary);
        color: #fff;
      }
    `;
  }

  static properties = {
    board: { type: String },
  };

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

  async handleRemoveBoardColumn(id) {
    const isRemoveBoardColumn = confirm('정말 삭제하시겠습니까?');
    if (isRemoveBoardColumn) {
      try {
        await apiDeleteBoardColumn(id);
        store.dispatch(removeBoardColumnAction(id));
        this.requestUpdate();
      } catch (e) {
        console.error('handleRemoveBoardColumn error: ', e);
      }
    }
  }

  async handleBoardItemAdd(id) {
    const $textarea = this.shadowRoot.querySelector('.board-container__input-text');
    const title = $textarea.value;

    try {
      const item = await apiPostBoard({ id, title });
      store.dispatch(addBoardItemAction({ id, item }));

      $textarea.value = '';
      $textarea.focus();
    } catch (e) {
      console.error('handleBoardItemAdd error: ', e);
    }
  }

  render() {
    const board = JSON.parse(this.props.board);
    return html`
      <section class="board-container">
        <header class="board-container__header">
          <h2 class="board-container__title">
            <span class="board-container__title-text">${board.title}</span>
            <span class="board-container__count">${board.items.length}</span>
          </h2>
          <nav class="board-container__action">
            <icon-button icon="addIcon" alt="add" @icon-button-click="${() => this.handleTextareaOpen(board.id)}"></icon-button>
            <icon-button icon="closeIcon" alt="close" @icon-button-click="${() => this.handleRemoveBoardColumn(board.id)}"></icon-button>
          </nav>
        </header>
        ${board.isTextareaOpen
          ? html`
              <div class="board-container__input-container">
                <textarea class="board-container__input-text" maxlength="500" placeholder="Enter a note"></textarea>
                <div class="board-container__button-group">
                  <button class="board-container__button board-container__button-add" @click="${() => this.handleBoardItemAdd(board.id)}">추가</button>
                  <button class="board-container__button board-container__button-cancel" @click="${() => this.handleTextareaClose(board.id)}">취소</button>
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
