import { FC } from 'react';

interface IRowProps {
  verticalAlign?: 'align-items-center';
}

const Row: FC<IRowProps> = ({ children, verticalAlign }) => {
  const classNames = ['row'];

  if (verticalAlign) {
    classNames.push(verticalAlign);
  }

  return <div className={classNames.join(' ')}>{children}</div>;
};

export default Row;
