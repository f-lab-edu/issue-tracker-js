import { css, html } from 'lit';
import CoreComponent from '../CoreComponent';
import CloseIcon from '../../../../public/assets/close.svg';

class ColumnAddButton extends CoreComponent {
  constructor() {
    super(['icon', 'alt']);
  }

  static get styles() {
    return css`
      .column-add-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 320px;
        height: auto;
        min-height: 86px;
        background-color: var(--color-white);
        border: 1px dashed #000;
        border-radius: 8px;
        margin: 36px 0 12px 0;
        padding: var(--spacing-medium);
        cursor: pointer;
      }
      .column-add-button img {
        width: 10px;
        height: auto;
        transform: rotate(45deg);
      }
      .column-add-button span {
        display: inline-block;
        margin: 3px 0 0 8px;
        font-size: 16px;
      }
    `;
  }

  render() {
    const { icon, alt } = this.props;
    return html`
      <button class="column-add-button ${icon}" @click="${this._onClick}">
        <img src="${CloseIcon}" alt="컬럼 추가 아이콘" />
        <span>컬럼 추가하기</span>
      </button>
    `;
  }

  _onClick(e) {
    this.dispatchEvent(new CustomEvent('column-add-button-click'));
  }
}

customElements.define('column-add-button', ColumnAddButton);
export default ColumnAddButton;
