import { FC } from 'react';

interface ITableProps {
  striped?: boolean;
  children?: any[];
}

const Table: FC<ITableProps> = ({ children, striped }) => {
  const classNames: string[] = ['table'];

  if (striped) classNames.push('table-striped');

  return <table className={classNames.join(' ')}>{children}</table>;
};

export default Table;
