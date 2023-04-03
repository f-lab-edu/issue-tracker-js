import { css, html, LitElement } from 'lit';
import CoreComponent from '../CoreComponent';

const iconSources = {
  addIcon: 'https://cdn-icons-png.flaticon.com/512/1828/1828579.png',
  closeIcon: 'https://cdn-icons-png.flaticon.com/512/2997/2997911.png',
};

class IconButton extends CoreComponent {
  constructor() {
    super(['icon', 'alt']);
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

      .addIcon img {
        width: 12px;
      }
    `;
  }

  render() {
    const { icon, alt } = this.props;
    return html`
      <button class="icon-button ${icon}" @click="${this._onClick}">
        <img src="${iconSources[icon]}" alt="${alt}" />
      </button>
    `;
  }

  _onClick(e) {
    this.dispatchEvent(new CustomEvent('icon-button-click'));
  }
}

customElements.define('icon-button', IconButton);
export default IconButton;
