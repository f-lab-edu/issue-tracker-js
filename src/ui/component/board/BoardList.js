import { css, html } from 'lit';

import CoreComponent from '../CoreComponent';
import initializeDragAndDrop from '../../../lib/utils/initializeDragAndDrop';

class BoardList extends CoreComponent {
  constructor() {
    super(['id']);
  }

  static get styles() {
    return css`
      .board-list__body {
        padding: 0;
        margin: 0;
      }
      .board-list__item {
        width: 100%;
        height: auto;
        min-height: 64px;
        background-color: #fff;
        border-radius: 8px;
        margin-bottom: 12px;
        padding: 12px;
        display: flex;
        box-sizing: border-box;
        border: 1px solid var(--color-border);
        cursor: grab;
      }
      .board-list__item.last {
        min-height: 3px;
        background-color: transparent;
        border: unset;
      }
      .board-list__content {
        padding: 0 4px 4px 10px;
        width: 84%;
        line-break: anywhere;
        box-sizing: border-box;
      }
      .board-list__content ul {
        margin: 20px 0 0 0;
        padding: 0 0 0 20px;
      }
      .board-list__content li {
        font-size: 16px;
        color: var(--color-text);
      }
      .board-list__content-title {
        margin: 4px 0 0 0;
        padding: 0;
        font-weight: 400;
        font-size: 18px;
        color: var(--color-text);
      }
      .board-list__author {
        margin: 20px 0 0 0;
      }
      .board-list__author span {
        color: var(--color-text-light);
      }
      .board-list__icon {
        width: 8%;
        height: 100%;
        margin: 0;
      }
      .board-list__icon img {
        width: 100%;
        height: auto;
      }
      .board-list__item-footer {
        width: 8%;
        position: relative;
      }
      .board-list__item-footer button {
        width: 100%;
        cursor: pointer;
        border: unset;
        background-color: unset;
      }
      .board-list__item-footer button img {
        width: 10px;
        height: auto;
      }
      .page-layout__footer {
        grid-area: footer;
      }
      .todo-item.dragging {
        opacity: 0.5;
      }
      .todo-placeholder {
        height: 40px;
        background-color: rgba(128, 128, 128, 0.5);
        border: 2px dashed #000;
      }
    `;
  }

  updated(changedProperties) {
    const $list = this.shadowRoot.querySelector('.board-list__body');
    initializeDragAndDrop($list);
  }

  render() {
    const { id } = this.props;
    return html`
      <ul class="board-list__body" data-id="${id}" data-type="parent">
        ${Array(5)
          .fill(0)
          .map(
            (_, index) => html`
              <li class="board-list__item" draggable="true">
                <figure class="board-list__icon">
                  <img src="https://i.imgur.com/ZiLeFCC.png" alt="todo" />
                </figure>
                <article class="board-list__content">
                  <h3 class="board-list__content-title">제목입니다.</h3>
                  <ul class="board-list__content-items">
                    <li>${index}</li>
                  </ul>
                  <footer class="board-list__author">
                    <span>Added by</span>
                    <strong>bytrustu</strong>
                  </footer>
                </article>
                <aside class="board-list__item-footer">
                  <icon-button type="add" alt="close" @icon-button-click="${this.handleButtonClick}"></icon-button>
                </aside>
              </li>
            `,
          )}
        <li class="board-list__item last"></li>
      </ul>
    `;
  }
}

customElements.define('board-list', BoardList);
export default BoardList;
