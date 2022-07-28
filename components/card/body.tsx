import { FC } from 'react';

const CardBody: FC<{ tableResponsive?: boolean }> = ({
  children,
  ...options
}) => {
  const classNames = ['card-body'];

  if (options.tableResponsive) classNames.push('table-responsive');

  return <div className={classNames.join(' ')}>{children}</div>;
};

export default CardBody;
