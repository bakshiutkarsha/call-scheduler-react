import * as React from "react";
import nextReduxWrapper from "next-redux-wrapper";
import { default as App } from "next/app";
import { Provider } from "react-redux";
import { Store } from "redux";
import store from "@redux/Store";

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
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}
              <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}

export default nextReduxWrapper(store)(GlobalApp);