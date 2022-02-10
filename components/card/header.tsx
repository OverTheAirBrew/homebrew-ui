import { FC } from 'react';

interface ICardHeaderProps {
  title?: string;
}

const CardHeader: FC<ICardHeaderProps> = ({ title, children }) => {
  return (
    <div className="card-header">
      <h3 className="card-title">{title}</h3>
      {children}
    </div>
  );
};

export default CardHeader;
