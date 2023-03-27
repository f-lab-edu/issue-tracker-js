import { html, LitElement } from 'lit';
import { addBoardAction } from '../../lib/store/reducer/boardReducer';
import CoreComponent from './CoreComponent';

export class Header extends CoreComponent {
  handleAddBoardClick() {
    this.store.dispatch(addBoardAction('추가 보드'));
  }

  render() {
    return html`
      <header>
        <button @click="${this.handleAddBoardClick}">+</button>
      </header>
    `;
  }
}

customElements.define('board-header', Header);
export default Header;
