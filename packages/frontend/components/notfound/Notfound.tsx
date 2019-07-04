import React from 'react';
import Head from 'next/head';
import { Empty } from 'antd';
import './Notfound.less';

export const Notfound = () => {
  return (
    <div data-aos="zoom-in" data-aos-duration="500" className="notfound">
      <Head>
        <title>Something's Wrong - Pista</title>
      </Head>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description=" " />
      <div className="main">
        <h3>An Error Occurred</h3>
        <p>
          The page you&#39;re looking for doesn&#39;t exist or some other error
          occurred.
        </p>
        <button
          onClick={() => {
            window.history.back();
          }}
        >
          Go back
        </button>
      </div>
    </div>
  );
};
