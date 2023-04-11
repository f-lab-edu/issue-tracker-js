import { uuidv4 } from '../../../lib/utils/string';

class Dialog {
  constructor({ closeOnOutsideClick, onSubmit, hideDialogDuringSubmit }) {
    this.id = uuidv4();
    this.$dialog = null;
    this.closeOnOutsideClick = closeOnOutsideClick || false;
    this.onSubmit = onSubmit || (async () => {});
    this.hideDialogDuringSubmit = hideDialogDuringSubmit || false;
  }

  get style() {
    return `
        <style>
          .backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10;
          }
          .dialog-container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            min-height: 10px;
            min-width: 10px;
            width: auto;
            height: auto;
            background-color: var(--color-white);
            border: 1px solid var(--color-border);
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
            z-index: 100;
          }
          .dialog-container header {
            padding: var(--spacing-medium);
            border-bottom: 1px solid var(--color-border);
          }
        </style>
    `;
  }

  get templateDialog() {
    return `
      ${this.style}
      <div class='dialog-container'>
        <form>
          ${this.templateHTML}        
        </form>
      </div>
      <div class='backdrop'/>    
    `;
  }

  show() {
    document.body.appendChild(this.$dialog);
  }

  hide() {
    document.body.removeChild(this.$dialog);
  }

  get templateHTML() {
    return '';
  }

  handleCloseOnOutsideClick() {
    if (this.closeOnOutsideClick) {
      this.$dialog.querySelector('.backdrop').addEventListener('click', (e) => {
        this.hide();
      });
    }
  }

  inject(callback) {
    callback();
    this.handleCloseOnOutsideClick();
  }

  async noneDisplayDialogWithSubmit(onSubmit, $dialog, props) {
    $dialog.style.display = 'none';
    const process = await onSubmit(props);
    $dialog.style.display = 'block';
    return process;
  }

  open() {
    this.$dialog = document.createElement('div');
    this.$dialog.setAttribute('id', this.id);
    this.$dialog.innerHTML = this.templateDialog;
    this.show();
    this.inject();
    return new Promise((resolve) => {
      const $form = this.$dialog.querySelector('form');
      $form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const props = {};
        for (const [key, value] of formData.entries()) {
          props[key] = value;
        }

        const onSubmit = this.hideDialogDuringSubmit ? this.noneDisplayDialogWithSubmit.bind(null, this.onSubmit, this.$dialog) : this.onSubmit;
        const process = await onSubmit(props);
        if (process === false) {
          return;
        }
        resolve(props);
        this.hide();
      });
    });
  }
}

export default Dialog;
