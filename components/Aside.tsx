import * as React from 'react';

import cloudinaryClient from '../lib/cloudinaryClient';
import Heading, { HeadingVariant } from './core/Heading';
import Link from 'next/link';
import Text, { TextElement } from './core/Text';
import theme from '../lib/theme';
import { useMeQuery } from '../__generated__/graphql';

const Aside: React.FunctionComponent = () => {
  const { data } = useMeQuery();

  const me = data?.me;

  const avatarSrc = cloudinaryClient.url(me?.avatar.path, {
    height: 96,
    width: 96,
    crop: 'fill',
  });

  return (
    <aside>
      <div className="logo">Logo</div>
      <Link href="/">
        <a className="avatar">
          <img alt={me?.displayName} src={avatarSrc} />
        </a>
      </Link>
      <Heading variant={HeadingVariant.h5}>{me?.displayName}</Heading>
      <Text>Bedford, VA</Text>
      <nav>
        <ul>
          <li>
            <Text element={TextElement.span}>Messages</Text>
          </li>
          <li>
            <Text element={TextElement.span}>Account</Text>
          </li>
          <li>
            <Text element={TextElement.span}>Log out</Text>
          </li>
        </ul>
      </nav>
      <style jsx>
        {`
          aside {
            background-color: ${theme.colors.backgroundAlt};
            display: flex;
            flex-direction: column;
            padding: ${theme.spacing['24']}px;
          }

          .avatar {
            background: rgb(33, 150, 243);
            background: linear-gradient(
              45deg,
              ${theme.colors.blue} 100%,
              ${theme.colors.teal} 0%
            );
            border-radius: 50%;
            height: 96px;
            padding: 2px;
            width: 96px;
            margin: 0 auto;

            img {
              background-color: ${theme.colors.backgroundAlt};
              border: 6px solid transparent;
              border-radius: inherit;
              display: block;
              height: 100%;
              margin: 0;
              overflow: hidden;
              padding: 0;
              position: relative;
              width: 100%;

              &:after {
                content: 'test';
                left: 0;
                position: absolute;
                top: 0;
              }
            }
          }
        `}
      </style>
    </aside>
  );
};

export default Aside;
