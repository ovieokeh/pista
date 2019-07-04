import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Head from 'next/head';
import AOS from 'aos';
import { Icon } from 'antd';
import { Navbar, Progress } from '../components';
import withReduxStore from '../redux/with-redux-store';
import 'antd/dist/antd.less';

class MyApp extends App<any, any> {
  persistor: any;

  constructor(props: any) {
    super(props);
    this.persistor = persistStore(props.reduxStore);
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      AOS.init();
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Head>
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="https://unpkg.com/aos@next/dist/aos.css"
          />
        </Head>
        <Provider store={reduxStore}>
          <PersistGate
            loading={
              <div className="loader">
                <Icon type="loading" />
              </div>
            }
            persistor={this.persistor}
          >
            <Navbar />
            <Progress />
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
