import { FC } from 'react';
import styled from 'styled-components';

interface IPageProps {}

const ContentWrapper = styled.div`
  min-height: calc(100vh - 57px - 57px);
  max-height: calc(100vh - 57px - 57px);
  overflow-y: scroll;
`;

const Page: FC<IPageProps> = ({ children }) => {
  return (
    <ContentWrapper className="content-wrapper">{children}</ContentWrapper>
  );
};

export default Page;
