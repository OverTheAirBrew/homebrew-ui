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

const Modal: FC<IModalProps> = ({ color, id, size, children }) => {
  return (
    <div className="modal fade" id={id}>
      <div className={`modal-dialog ${size ? `modal-${size}` : ''}`}>
        <div className={`modal-content bg-${color}`}>
          {children}
          {/* <div className="modal-header">
            <h4 className="modal-title">Primary Modal</h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div> */}
          {/* <div className="modal-body">
            <p>One fine body&hellip;</p>
          </div> */}
          {/* <div className="modal-footer justify-content-between">
            <button
              type="button"
              className="btn btn-outline-light"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-outline-light">
              Save changes
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
