import Dialog from './Dialog';
import { attachTextInputFocusEvent } from '../../../lib/utils/dom';

class Modal extends Dialog {
  constructor({ type, title, closeOnOutsideClick, onSubmit, hideDialogDuringSubmit, value }) {
    super({ closeOnOutsideClick, onSubmit, hideDialogDuringSubmit });
    this.$dialog = super.$dialog;
    this.title = title || '';
    this.type = type || 'input';
    this.value = value || '';
  }

  get styles() {
    return `
      <style>
        .modal {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .modal__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 50px;
          padding: 0 10px 0 16px;
          border-bottom: 1px solid var(--border-color);
        }
        .modal__header-title {
        font-size: 16px;
          font-weight: var(--font-weight-medium);
          color: #000000ab;
          text-align: center;
          line-height: 1.2;
        }
        .modal__body {
          width: 360px;
          height: auto;
          background-color: white;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 24px 26px 20px 26px;
        }
        .modal__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
        .modal__content input {
          width: 100%;
          height: 38px;
          padding: 0 10px;
          border: 1px solid var(--border-color);
        }
        .modal__content textarea {
          width: 100%;
          height: 38px;
          max-height: 260px;
          padding: 10px;
          min-height: 100px;
          border: 1px solid var(--border-color);    
          resize: vertical;    
        }
        .modal__action {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          margin-top: 28px;
        }
        .modal__button {
          width: 80px;
          height: 40px;
          border-radius: var(--border-radius);
          border: unset;
          font-size: var(--font-size-default);
          font-weight: var(--font-weight-bold);
          cursor: pointer;
        }
        .modal__button + .modal__button {
          margin-left: var(--spacing-small);
        }
        .modal__button-cancel {
          background-color: #d4d4d482;
          color: var(--color-text-light);
        }
        .modal__button-success {
          background-color: var(--color-primary);
          color: var(--color-white);
        }
      </style>
    `;
  }

  injectCallback() {
    this.$dialog.querySelector('.modal__button-cancel').addEventListener('click', () => {
      super.hide();
    });
    this.$dialog.querySelector('icon-button').addEventListener('click', () => {
      super.hide();
    });

    const $textInput = this.$dialog.querySelector('[name="text"]');
    attachTextInputFocusEvent($textInput);
  }

  inject() {
    super.inject(this.injectCallback.bind(this));
  }

  get templateHTML() {
    return `
      ${this.styles}
      <div class='modal'>
        <div class='modal__header'>
          <div class='modal__header-title'>${this.title || ''}</div>
          <icon-button icon='closeIcon' />
        </div>
        <div class='modal__body'>
          <div class='modal__content'>
            ${this.type === 'input' ? `<input type='text' name='text' value='${this.value}' maxlength='50' />` : ''}
            ${this.type === 'textarea' ? `<textarea name='text' maxlength='500'>${this.value}</textarea>` : ''}
          </div>
          <div class='modal__action'>
            <button type='button' class='modal__button modal__button-cancel'>취소</button>
            <button type='submit' class='modal__button modal__button-success'>확인</button>
          </div>
        </div>
      </div>
    `;
  }
}

export default Modal;
