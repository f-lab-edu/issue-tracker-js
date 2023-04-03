import { css, html } from 'lit';
import CoreComponent from '../CoreComponent';

class PageLayout extends CoreComponent {
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

  render() {
    return html`
      <div class="page-layout">
        <page-header></page-header>
        <main class="page-layout__main">
          ${Array(3)
            .fill(0)
            .map((_, index) => html`<board-container id="${index}"></board-container>`)}
        </main>
        <footer class="page-layout__footer"></footer>
      </div>
    `;
  }
}

customElements.define('page-layout', PageLayout);

export default PageLayout;
