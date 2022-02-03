import { FC } from 'react';

interface IPageHeaderProps {
  title: string;
  currentPath: string;
}

const PageHeader: FC<IPageHeaderProps> = ({ title, currentPath }) => {
  const splitPath = currentPath.split('/').filter((cp) => !!cp);

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

              {/* <li className="breadcrumb-item">
                <Link href="/">
                  <a>Test</a>
                </Link>
              </li>
              <li className="breadcrumb-item active">
                <a>Test 1</a>
              </li> */}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
