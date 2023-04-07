import { css, html } from 'lit';
import CoreComponent from '../CoreComponent';
import store from '../../../lib/store/index';

class PageLayout extends CoreComponent {
  constructor() {
    super(['boards']);
  }

  static properties = {
    boards: { type: Array },
  };

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

  connectedCallback() {
    super.connectedCallback();
    store.subscribe(() => {
      this.boards = store.getState().boards;
      this.requestUpdate();
    });
  }

  render() {
    const { boards } = store.getState();
    return html`
      <div class="page-layout">
        <page-header></page-header>
        <main class="page-layout__main">${boards.map((board) => html` <board-container board="${JSON.stringify(board)}"></board-container>`)}</main>
        <footer class="page-layout__footer"></footer>
      </div>
    `;
  }
}

customElements.define('page-layout', PageLayout);

export default PageLayout;
