import { css, html, LitElement } from 'lit';
import CoreComponent from '../CoreComponent';

const IconSrc = {
  add: 'https://cdn-icons-png.flaticon.com/512/1828/1828579.png',
  close: 'https://cdn-icons-png.flaticon.com/512/2997/2997911.png',
};

class IconButton extends CoreComponent {
  constructor() {
    super(['type', 'alt']);
  }

  static get styles() {
    return css`
      .icon-button {
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
      .icon-button img {
        width: 10px;
        height: auto;
      }

      .add img {
        width: 12px;
      }
    `;
  }

  render() {
    const { type, alt } = this.props;
    return html`
      <button class="icon-button ${type}" @click="${this._onClick}">
        <img src="${IconSrc[type]}" alt="${alt}" />
      </button>
    `;
  }

  _onClick(e) {
    const { src, alt } = this.props;
    this.dispatchEvent(
      new CustomEvent('icon-button-click', {
        detail: { src, alt },
      }),
    );
  }
}

customElements.define('icon-button', IconButton);
export default IconButton;
