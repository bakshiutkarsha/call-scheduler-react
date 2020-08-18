//@ts-ignore

import * as React from "react";
import { default as App } from "next/app";
import { Provider } from "react-redux";
import { Store } from "redux";
import store from "@redux/Store";

import withRedux from 'next-redux-wrapper';
import { PersistGate } from 'redux-persist/integration/react';

interface IProps extends React.Props<{}> {
  isMobileFromSSR: boolean;
  store: Store;
}

class GlobalApp extends App<IProps, {}, {}> {
  constructor(props) {
    super(props);
  }

  public static async getInitialProps() {
    return {
      pageProps: {}
    };
  }

  public render(): JSX.Element {
    const { Component, pageProps, store } = this.props;

    return (
      <>
        <Provider store={store}>
        <PersistGate persistor={(store as any).__PERSISTOR} loading={null}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
      </>
    );
  }
}

export default withRedux(store)(GlobalApp);