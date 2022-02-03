import { useRouter } from 'next/dist/client/router';
import { FC } from 'react';

interface IPageHeaderProps {
  title: string;
}

const PageHeader: FC<IPageHeaderProps> = ({ title }) => {
  const router = useRouter();
  const splitPath = router.pathname.split('/').filter((cp) => !!cp);

  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">{title}</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              {splitPath.map((sp) => {
                return <li className="breadcrumb-item">{capitalize(sp)}</li>;
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
