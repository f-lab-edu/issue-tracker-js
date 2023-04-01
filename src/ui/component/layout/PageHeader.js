import { css, html } from 'lit';
import CoreComponent from '../CoreComponent';

class PageHeader extends CoreComponent {
  static get styles() {
    return css`
      .page-layout__header {
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 48px;
        background-color: #ee8548;
      }
      .page-layout__logo {
        height: 100%;
        width: auto;
      }
      .page-layout__button {
        background: transparent;
        border: unset;
        width: 32px;
        height: 32px;
        cursor: pointer;
      }
      .page-layout__button img {
        height: 100%;
      }
    `;
  }

  render() {
    return html`
      <header class="page-layout__header">
        <img class="page-layout__logo" src="https://i.imgur.com/WgiQ6XY.png" alt="logo" />
        <button class="page-layout__button">
          <img src="https://i.imgur.com/Fy40N8c.png" alt="button" />
        </button>
      </header>
    `;
  }
}

customElements.define('page-header', PageHeader);
export default PageHeader;
