import $ from 'jquery';
import { FC, useEffect } from 'react';

interface IModalProps {
  id: string;
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'danger'
    | 'warning';
  size?: 'xl' | 'lg' | 'sm';
  onClose?: () => void;
}

const Modal: FC<IModalProps> = ({ color, id, size, children, onClose }) => {
  useEffect(() => {
    $(`#${id}`).on('hide.bs.modal', () => {
      if (typeof onClose !== 'undefined') onClose();
    });
  }, []);

  return (
    <div className="modal fade" id={id}>
      <div className={`modal-dialog ${size ? `modal-${size}` : ''}`}>
        <div className={`modal-content bg-${color}`}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
