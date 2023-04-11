import Alert from '../../ui/component/dialog/Alert';
import Modal from '../../ui/component/dialog/Modal';

export const useAlert = ({ message, closeOnOutsideClick }) => new Alert({ type: 'alert', title: message, closeOnOutsideClick });

export const useConfirm = ({ message, closeOnOutsideClick }) => new Alert({ type: 'confirm', title: message, closeOnOutsideClick });

export const useTextInputModal = ({ title, value, onSubmit, hideDialogDuringSubmit }) => new Modal({ type: 'input', title, value, onSubmit, hideDialogDuringSubmit });

export const useTextAreaModal = ({ title, value, onSubmit, hideDialogDuringSubmit }) => new Modal({ type: 'textarea', title, value, onSubmit, hideDialogDuringSubmit });

export const validateTextInputWithAlert = async (message, editFormData) => {
  if (!editFormData?.text || editFormData?.text.trim().length === 0) {
    const alert = useAlert({ message, closeOnOutsideClick: false });
    await alert.open();
    return false;
  }
  return true;
};
