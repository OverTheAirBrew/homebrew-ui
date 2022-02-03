import { FC } from 'react';

interface IModalHeaderProps {
  title: string;
}

const ModalHeader: FC<IModalHeaderProps> = ({ title }) => {
  return (
    <div className="modal-header">
      <h4 className="modal-title">{title}</h4>
      <button
        type="button"
        className="close"
        data-dismiss="modal"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default ModalHeader;
