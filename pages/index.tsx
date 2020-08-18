import * as React from 'react';
import Head from 'next/head';
import { useApolloClient } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';

import MainLayout from '../components/MainLayout';
import { useMeQuery } from '../__generated__/graphql';

const IndexPage: React.FunctionComponent = () => {
  const {
    getAccessTokenSilently,
    isAuthenticated,
    loginWithPopup,
    logout,
    isLoading,
  } = useAuth0();

  const client = useApolloClient();

  const { data, loading } = useMeQuery({ skip: !isAuthenticated });

  React.useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently({
        audience: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/`,
        scope: 'openid profile email',
      }).then((token) => {
        localStorage.setItem('token', token);
        client.resetStore().catch(console.error);
      });
    } else {
      localStorage.removeItem('token');
      client.resetStore().catch(console.error);
    }
  }, [isAuthenticated]);

  return (
    <>
      <Head>
        <title>PPG Fam</title>
      </Head>
      <MainLayout>
        <h1>Home Page</h1>
        <div>
          {isAuthenticated && (
            <button
              onClick={(event) => {
                event.preventDefault();
                logout();
              }}
            >
              Log out
            </button>
          )}
          {!isAuthenticated && typeof window !== 'undefined' && (
            <button
              onClick={(event) => {
                event.preventDefault();
                loginWithPopup().catch(console.error);
              }}
            >
              Sign in
            </button>
          )}
        </div>
        {(isLoading || loading || typeof window === 'undefined') && (
          <p>Loading...</p>
        )}
        <p>{data?.me && JSON.stringify(data?.me)}</p>
      </MainLayout>
    </>
  );
};

export default IndexPage;
