import { FC } from 'react';

const pkgInfo = require('../../package.json');

const Footer: FC = ({ children }) => {
  return (
    <footer className="main-footer">
      <strong>
        Copyright &copy; 2021-2022{' '}
        <a href="https://overtheairbrew.com">OverTheAirBrew.com</a>.&nbsp;
      </strong>
      All rights reserved.
      <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> {pkgInfo.version}
      </div>
    </footer>
  );
};

export default Footer;
