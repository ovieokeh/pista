import React from 'react';
import { Link } from 'react-router-dom';
import { Empty } from 'antd';
import './Notfound.scss';

export const Notfound = () => {
  window.document.title = '404 | Shop Stack';

  return (
    <div data-aos="zoom-in" data-aos-duration="500" className="notfound">
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description=" " />
      <div className="main">
        <h3>Page Not Found</h3>
        <p>
          The page you&#39;re looking for doesn&#39;t exist or some other error
          occurred.
        </p>
        <Link to="/">Go back to safety!</Link>
      </div>
    </div>
  );
};

export default Notfound;
