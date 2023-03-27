import { html, LitElement } from 'lit';
import CoreComponent from './CoreComponent';

export class BoardBody extends CoreComponent {
  constructor() {
    super();
    this.boards = this.store.getState().boards;
    console.log('this.boards >>', this.boards);
  }

  render() {
    const boardsHTML = this.boards?.map((board) => {
      return html`
        <ul>
          <li>${board.id}</li>
          <li>${board.title}</li>
        </ul>
      `;
    });
    return html` <section style="display: flex">${boardsHTML}</section> `;
  }
}

customElements.define('board-body', BoardBody);
export default BoardBody;
