import { FC } from 'react';

const Footer: FC = ({ children }) => {
  return (
    <footer className="main-footer">
      <strong>
        Copyright &copy; 2021-2022{' '}
        <a href="https://overtheairbrew.com">OverTheAirBrew.com</a>.&nbsp;
      </strong>
      All rights reserved.
      <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> 3.1.0
      </div>
    </footer>
  );
};

export default Footer;
