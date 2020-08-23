import * as React from 'react';
import { useRouter } from 'next/router';

import ListIcon from '../icons/list.svg';
import MapIcon from '../icons/map.svg';
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
      <button
        className="map-list-btn"
        disabled={router.pathname === '/map'}
        onClick={() =>
          router.push({
            pathname: '/map',
            query: router.query,
          })
        }
      >
        <MapIcon height={24} width={24} />
      </button>
      <button
        className="map-list-btn"
        disabled={router.pathname === '/list'}
        onClick={() =>
          router.push({
            pathname: '/list',
            query: router.query,
          })
        }
      >
        <ListIcon height={24} width={24} color={theme.colors.blue} />
      </button>

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

          .map-list-btn {
            align-items: center;
            background-color: transparent;
            border: none;
            display: flex;
            height: 36px;
            justify-content: center;
            padding: 0;
            width: 36px;

            :first-of-type {
              margin-left: 8px;
            }

            :last-of-type {
              margin-right: 8px;
            }

            :enabled {
              cursor: pointer;
              filter: grayscale(100%);
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;
