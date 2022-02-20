import { FC } from 'react';

interface IButtonProps {
  size: 'lg' | 'sm' | 'xs' | 'flat';
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'danger'
    | 'warning';
  outline?: boolean;
  disabled?: boolean;
  block?: boolean;
  isIcon?: boolean;

  type: 'button' | 'submit' | 'reset';

  className?: string;

  onClick?: () => void;
  'data-toggle'?: string;
  'data-target'?: string;
  'data-dismiss'?: string;
}

const Button: FC<IButtonProps> = ({
  size,
  color,
  outline,
  disabled,
  block,
  isIcon,
  'data-target': dataTarget,
  'data-toggle': dataToggle,
  'data-dismiss': dataDismiss,
  type,
  className,
  children,
  onClick,
}) => {
  function generateClassName() {
    const classNames: string[] = ['btn', `btn-${color}`, `btn-${size}`];

    if (outline) classNames.push('btn-outline');
    if (disabled) classNames.push('disabled');
    if (block) classNames.push('btn-block');
    if (isIcon) classNames.push('btn-icon');

    classNames.push(className || '');

    return classNames.join(' ');
  }

  return (
    <button
      className={generateClassName()}
      onClick={onClick}
      data-toggle={dataToggle}
      data-target={dataTarget}
      data-dismiss={dataDismiss}
      type={type ? type : 'button'}
    >
      {children}
    </button>
  );
};

export default Button;
