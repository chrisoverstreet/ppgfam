import * as React from 'react';
import classnames from 'classnames';
import css from 'styled-jsx/css';
import { Button as MaterialButton } from '@material-ui/core';

import theme from '../../lib/theme';

const { className: customClassName, styles } = css.resolve`
  button {
    background-color: ${theme.colors.blue};

    :hover {
      background-color: ${theme.colors.blue};
    }
  }
`;

type Props = {
  className?: string;
  onClick?: (
    event: React.SyntheticEvent<HTMLButtonElement>,
  ) => void | Promise<void>;
};

const Button: React.FunctionComponent<React.PropsWithChildren<Props>> = ({
  children,
  className,
  onClick,
}: React.PropsWithChildren<Props>) => {
  return (
    <MaterialButton
      className={classnames(customClassName, className)}
      onClick={onClick}
      variant="contained"
      color="primary"
      size="medium"
    >
      {children}
      {styles}
    </MaterialButton>
  );
};

export default Button;
