import { FC } from 'react';

const TableRow: FC = ({ children, ...rest }) => {
  return <tr {...rest}>{children}</tr>;
};

export default TableRow;
