import { FC } from 'react';

interface ITableProps {
  responsive?: boolean;
  children?: any[];
}

const Table: FC<ITableProps> = ({ children, responsive }) => {
  const classNames: string[] = ['table'];

  if (responsive) classNames.push('table-responsive');

  return <table className={classNames.join(' ')}>{children}</table>;
};

// Table.propTypes = {
//   children: PropTypes.oneOf([
//     PropTypes.shape({
//       type: PropTypes.oneOf([TableHead]),
//     }),
//   ]),
// };

export default Table;
