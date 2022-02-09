import { FC } from 'react';

interface IRowProps {}

const Row: FC<IRowProps> = ({ children }) => {
  return <div className="row">{children}</div>;
};

export default Row;
