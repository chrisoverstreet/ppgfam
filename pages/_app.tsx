import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { Auth0Provider } from '@auth0/auth0-react';

import '../styles/globals.css';
import apolloClient from '../lib/apolloClient';

const App: React.FunctionComponent<AppProps> = ({
  Component,
  pageProps,
}: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
        redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI}
      >
        <Component {...pageProps} />
      </Auth0Provider>
    </ApolloProvider>
  );
};

export default App;
