import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

interface IIconButtonProps {
  icon: IconDefinition;
  className?: string;
  'data-toggle'?: string;
  'data-target'?: string;
}

const IconButton: FC<IIconButtonProps> = ({
  icon,
  className,
  'data-target': dataTarget,
  'data-toggle': dataToggle,
}) => {
  return (
    <button
      type="button"
      className={`btn ${className}`}
      data-target={dataTarget}
      data-toggle={dataToggle}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default IconButton;
