import $ from 'jquery';
import { FC } from 'react';
import Button from '../button';
import ModalBody from './body';
import ModalFooter from './footer';
import ModalHeader from './header';
import ModalWrapper from './wrapper';

interface IModalProps {
  id: string;
  headerTitle: string;

  footer: {
    button?: {
      type: 'button' | 'submit' | 'reset';
      text: string;
    };
  };

  onClose: () => void;
}

const Modal: FC<IModalProps> = ({
  id,
  headerTitle,
  onClose,
  children,
  footer,
}) => {
  return (
    <ModalWrapper id={id} color="default" size="lg" onClose={onClose}>
      <ModalHeader title={headerTitle} />
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        {footer.button ? (
          <Button
            color="primary"
            type={footer.button.type}
            size="sm"
            className="float-right"
          >
            {footer.button.text}
          </Button>
        ) : null}
      </ModalFooter>
    </ModalWrapper>
  );
};

export function hideModal(id: string) {
  $(`#${id}`).modal('hide');
}

export default Modal;
