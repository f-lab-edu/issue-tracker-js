import Dialog from './Dialog';

const confirmButtonText = {
  alert: '확인했어요',
  confirm: '확인',
};

class Alert extends Dialog {
  constructor({ title, type, closeOnOutsideClick }) {
    super({ closeOnOutsideClick });
    this.$dialog = super.$dialog;
    this.title = title || '';
    this.type = type || 'alert';
  }

  get styles() {
    return `
      <style>
        .alert {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .alert__body {
          width: 310px;
          height: auto;
          background-color: white;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 38px 40px 20px 40px;
        }
        .alert__content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .alert__content-text {
          font-size: 16px;
          font-weight: var(--font-weight-medium);
          color: #000000ab;
          text-align: center;
          line-height: 1.2;
        }
        .alert__action {
          display: flex;
          justify-content: center;
          width: 100%;
          margin-top: 28px;
        }
        .alert__button {
          width: auto;
          height: 40px;
          flex: 1;
          border-radius: var(--border-radius);
          border: unset;
          font-size: var(--font-size-default);
          font-weight: var(--font-weight-bold);
          cursor: pointer;
        }
        .alert__button + .alert__button {
          margin-left: var(--spacing-small);
        }
        .alert__button-cancel {
          background-color: #d4d4d482;
          color: var(--color-text-light);
        }
        .alert__button-success {
          background-color: var(--color-primary);
          color: var(--color-white);
        }
      </style>
    `;
  }

  get templateHTML() {
    return `
      ${this.styles}
      <div class='alert'>
        <div class='alert__body'>
          <div class='alert__content'>
            <div class='alert__content-text'>${this.title || ''}</div>
          </div>
          <div class='alert__action'>
            ${this.type === 'confirm' ? `<button type='button' class='alert__button alert__button-cancel'>취소</button>` : ''}
            <button type='submit' class='alert__button alert__button-success'>
              ${confirmButtonText[this.type]}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  injectCallback() {
    if (this.type === 'confirm') {
      this.$dialog.querySelector('.alert__button-cancel').addEventListener('click', () => {
        super.hide();
      });
    }
  }

  inject() {
    super.inject(this.injectCallback.bind(this));
  }
}

export default Alert;
