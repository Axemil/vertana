// import "react-app-polyfill/ie9";
// import "react-app-polyfill/stable";
//https://github.com/geelen/react-snapshot/issues/98#issuecomment-446182084
import './setupTests.js';

import React, { useReducer, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';

import GlobalStyle from 'common/GlobalStyle';
import Layout from 'app/Layout';
import AppContext from 'util/AppContext';
import { reducer, initialState } from 'util/reducer';
import { isReactSnap, removePrerenderedStyles } from 'util/helpers';
import { ApolloProvider } from '@apollo/react-hooks';
import client from 'util/gql-client';
import ScrollToTop from 'components/ScrollToTop';
import TagManager from 'react-gtm-module';

declare const VI_TAG_MANAGER_ID: string;

TagManager.initialize({
  gtmId: VI_TAG_MANAGER_ID,
});

type AppProps = {};

function App({}: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useLayoutEffect(() => {
    removePrerenderedStyles();
  }, []);

  useEffect(() => {
    // ReactGA.initialize('UA-170270943-2');
    // ReactGA.pageview('/');
  }, []);

  return (
    <>
      <GlobalStyle />
      <ApolloProvider client={client}>
        <AppContext.Provider value={{ state, dispatch }}>
          <Router>
            <ScrollToTop />
            <Layout />
          </Router>
        </AppContext.Provider>
      </ApolloProvider>
    </>
  );
}

const rootElement = document.getElementById('blog-root');

render(<App />, rootElement);
