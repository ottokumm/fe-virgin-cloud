import React from 'react';
import classNames from 'classnames/bind';

import styles from './spinner.scss';

const cn = classNames.bind(styles);

export function Spinner({
  component: Component = 'div',
  size = 'medium',
  name = 'default',
  color,
  className,
  children,
  ...props
}) {
  const classes = cn(
    'spinner',
    {[`spinner--${name}`]: name},
    {[`spinner--size-${size}`]: size},
    {[`spinner--color-${color}`]: color},
    className
  );

  return (
    <Component {...props} className={classes}>
      {children}
    </Component>
  );
}
