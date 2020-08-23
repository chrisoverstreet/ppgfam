import * as React from 'react';

import Aside from './Aside';
import Header from './Header';
import theme from '../lib/theme';

const MainLayout: React.FunctionComponent = ({
  children,
}: React.PropsWithChildren<void>) => {
  return (
    <div className="root">
      <Aside />
      <Header />
      <main>{children}</main>
      <style jsx>
        {`
          .root {
            display: grid;
            grid-gap: ${theme.spacing['24']}px;
            grid-template-areas:
              'aside header'
              'aside main';
            grid-template-columns: 240px 1fr;
            grid-template-rows: 60px 1fr;
            height: 100vh;
            overflow: hidden;
            width: 100%;
          }

          .root :global(aside) {
            grid-area: aside;
          }

          .root :global(header) {
            grid-area: header;
          }

          main {
            grid-area: main;
            overflow-y: auto;
          }
        `}
      </style>
    </div>
  );
};

export default MainLayout;
