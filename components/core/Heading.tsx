import * as React from 'react';
import css from 'styled-jsx/css';

export enum HeadingVariant {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
}

const { className, styles } = css.resolve`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  h1 {
    font-size: 96px;
    letter-spacing: -1.5px;
  }

  h2 {
    font-size: 60px;
    letter-spacing: -0.5px;
  }

  h3 {
    font-size: 48px;
    letter-spacing: 0;
  }

  h4 {
    font-size: 34px;
    letter-spacing: 0.25px;
  }

  h5 {
    font-size: 24px;
    letter-spacing: 0;
  }

  h6 {
    font-size: 20px;
    letter-spacing: 0.15px;
  }
`;

type Props = {
  variant?: HeadingVariant;
};

const Heading: React.FunctionComponent<Props> = ({
  children,
  variant,
}: React.PropsWithChildren<Props>) => {
  return (
    <>
      {React.createElement(variant, { className }, children)}
      {styles}
    </>
  );
};

Heading.defaultProps = {
  variant: HeadingVariant.h1,
};

export default Heading;
