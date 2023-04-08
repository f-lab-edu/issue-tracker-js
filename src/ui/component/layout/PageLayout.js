import { css, html } from 'lit';
import CoreComponent from '../CoreComponent';
import store from '../../../lib/store/index';
import { useTextInputModal, validateTextInputWithAlert } from '../../../lib/utils/dialog';
import { ALERT } from '../../../lib/constant/message';
import { apiPostBoardColumn } from '../../../lib/api/board';
import { addBoardColumnAction } from '../../../lib/store/reducer/boardReducer';

class PageLayout extends CoreComponent {
  constructor() {
    super(['boards']);
  }

  static get styles() {
    return css`
      .page-layout {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100vh;
        background-color: #f2f3f6;
      }
      .page-layout__main {
        display: flex;
        height: calc(100vh - 80px);
        padding: 64px;
      }
    `;
  }

  static properties = {
    boards: { type: Array },
  };

  connectedCallback() {
    super.connectedCallback();
    store.subscribe(() => {
      this.boards = store.getState().boards;
      this.requestUpdate();
    });
  }

  async addColumnEvent() {
    const modal = useTextInputModal({
      title: '컬럼 추가',
      value: '',
      onSubmit: validateTextInputWithAlert.bind(null, ALERT.BOARD_COLUMN_EDIT_EMPTY),
      hideDialogDuringSubmit: true,
    });
    const addColumnFormData = await modal.open();
    try {
      const boardColumn = await apiPostBoardColumn({ title: addColumnFormData.text });
      store.dispatch(addBoardColumnAction(boardColumn));
    } catch (error) {
      console.error('addColumnEvent error:', error);
    }
  }

  render() {
    const { boards } = store.getState();
    const boardsHTML = boards.map((board) => html` <board-container board="${JSON.stringify(board)}"></board-container>`);
    const boardColumnAddHTML = boards.length < 5 ? html` <column-add-button @column-add-button-click="${this.addColumnEvent}"></column-add-button>` : '';
    return html`
      <div class="page-layout">
        <page-header></page-header>
        <main class="page-layout__main">${boardsHTML} ${boardColumnAddHTML}</main>
        <footer class="page-layout__footer"></footer>
      </div>
    `;
  }
}

customElements.define('page-layout', PageLayout);

export default PageLayout;
