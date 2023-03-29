import { html } from 'lit';
import CoreComponent from './CoreComponent';

export class BoardItem extends CoreComponent {
  constructor() {
    super(['id', 'title']);
  }

  render() {
    const { id, title } = this.props;
    return html`
      <ul>
        <li>${id}</li>
        <li>${title}</li>
      </ul>
    `;
  }
}

customElements.define('board-item', BoardItem);
export default BoardItem;
