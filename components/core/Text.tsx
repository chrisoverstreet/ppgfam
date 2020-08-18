import * as React from 'react';
import css from 'styled-jsx/css';

export enum TextElement {
  p = 'p',
  span = 'span',
}

export enum TextVariant {
  body1 = 'body-1',
  body2 = 'body-2',
  subtitle1 = 'subtitle-1',
  subtitle2 = 'subtitle-2',
}

const { className, styles } = css.resolve`
  .body1 {
    font-size: 16px;
    letter-spacing: 0.5px;
  }

  .body-2 {
    font-size: 14px;
    letter-spacing: 0.25px;
  }

  .subtitle-1 {
    font-size: 16px;
    letter-spacing: 0.15px;
  }

  .subtitle-2 {
    font-size: 14px;
    letter-spacing: 0.1px;
  }
`;

type Props = {
  element?: TextElement;
  variant?: TextVariant;
};

const Text: React.FunctionComponent<Props> = ({
  children,
  element,
  variant,
}: React.PropsWithChildren<Props>) => {
  return (
    <>
      {React.createElement(
        element,
        { className: `${className} ${variant}` },
        children,
      )}
      {styles}
    </>
  );
};

Text.defaultProps = {
  element: TextElement.p,
  variant: TextVariant.body1,
};

export default Text;
