import { FC } from 'react';

interface IPageContentProps {}

const PageContent: FC<IPageContentProps> = ({ children }) => {
  return (
    <section className="content">
      <div className="container-fluid">{children}</div>
    </section>
  );
};

export default PageContent;
