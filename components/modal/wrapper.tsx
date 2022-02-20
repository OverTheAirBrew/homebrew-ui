import { FC } from 'react';

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
}

const ModalWrapper: FC<IModalProps> = ({ color, id, size, children }) => {
  return (
    <div className="modal fade" id={id}>
      <div className={`modal-dialog ${size ? `modal-${size}` : ''}`}>
        <div className={`modal-content bg-${color}`}>{children}</div>
      </div>
    </div>
  );
};

export default ModalWrapper;
