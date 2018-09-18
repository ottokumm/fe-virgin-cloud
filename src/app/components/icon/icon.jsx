import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './icon.scss';

const cn = classNames.bind(styles);

export function Icon({
  size = 'medium',
  bold = false,
  color,
  icon,
  name,
  className,
  ...props
}) {
  const classes = cn(
    'icon',
    { [`icon--${icon}`]: icon },
    { [`icon--${name}`]: name },
    { [`icon--bold`]: bold },
    { [`icon--size-${size}`]: size },
    { [`icon--color-${color}`]: color },
    className,
  );
  return <i {...props} className={classes} />;
}
