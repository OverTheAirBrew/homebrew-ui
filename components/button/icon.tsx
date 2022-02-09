import { IconName } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

interface IIconButtonProps {
  icon: IconName;
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
