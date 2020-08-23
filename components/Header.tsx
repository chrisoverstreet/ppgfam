import * as React from 'react';
import { useRouter } from 'next/router';

import SearchIcon from '../icons/search.svg';
import theme from '../lib/theme';

const Header: React.FunctionComponent = () => {
  const router = useRouter();

  const query: string =
    (Array.isArray(router.query.q) ? router.query.q[0] : router.query.q) || '';

  async function onSearchInputChange(
    event: React.SyntheticEvent<HTMLInputElement>,
  ): Promise<boolean> {
    const { value } = event.currentTarget;

    if (router.pathname === '/map' || router.pathname === '/list') {
      return router.replace({
        pathname: router.pathname,
        query: value ? { q: value } : null,
      });
    }

    return router.push({
      pathname: '/map',
      query: value ? { q: value } : null,
    });
  }

  return (
    <header>
      <div className="search">
        <input
          onChange={onSearchInputChange}
          placeholder="Search"
          value={query}
        />
        <SearchIcon />
      </div>
      <style jsx>
        {`
          header {
            display: flex;
            padding: 24px 0 0 0;
          }

          .search {
            position: relative;

            input {
              background-color: ${theme.colors.backgroundAlt};
              border: none;
              border-radius: 8px;
              font-size: 16px;
              height: 36px;
              max-width: 320px;
              padding-left: 40px;
              position: relative;
              width: 100%;

              :focus {
                outline-color: ${theme.colors.blue};
              }
            }

            & > :global(svg) {
              color: ${theme.colors.gray700};
              height: 24px;
              width: 24px;
              position: absolute;
              top: 6px;
              left: 8px;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;
