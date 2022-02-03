import { FC } from 'react';

interface IPageProps {}

const Page: FC<IPageProps> = ({ children }) => {
  return <div className="content-wrapper">{children}</div>;
};

export default Page;
