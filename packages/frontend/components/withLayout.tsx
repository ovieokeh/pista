import React from 'react';
import Head from 'next/head';
import AOS from 'aos';
import { Navbar } from './navbar/Navbar';
import { Progress } from './progress/Progress';

export function WithLayout(props: any) {
  const { Page, user } = props;

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
      </Head>
      <Navbar user={user} />
      <Progress />
      <Page />
    </>
  );
}

WithLayout.getInitialProps = (props: any) => {
  const { req, reduxStore, Page } = props;
  const isServer = !!req;

  !isServer && AOS.init();
  const user = reduxStore.getState().auth;
  return { user, Page };
};
