import { html, LitElement } from 'lit';
import CoreComponent from './CoreComponent';

export class BoardBody extends CoreComponent {
  constructor() {
    super();
    this.boards = this.store.getState().boards;
  }

  updateState() {
    this.boards = this.store.getState().boards;
  }

  render() {
    const boardsHTML = this.boards?.map((board) => {
      return html` <board-item id="${board.id}" title="${board.title}"></board-item> `;
    });
    return html` <section style="display: flex">${boardsHTML}</section> `;
  }
}

customElements.define('board-body', BoardBody);
export default BoardBody;
