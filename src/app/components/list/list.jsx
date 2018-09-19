import React from 'react';

import classNames from 'classnames/bind';
import styles from './list.scss';

const cn = classNames.bind(styles);

const itemsClassName = 'list__items';
const itemClassName = 'list__item';
const linkClassName = 'linkClassName';

export function List({
    items = [], renderItem = defaultRenderItem, className, children, ...props
}) {
  const classes = cn('list', className);
  return (
    <div {...props} className={classes}>
      {!children && renderItems(items, renderItem)}
      {children}
    </div>
  );
}

function renderItems(data, renderItem) {
  const showItems = data && !!data.length;

  return (
    showItems && (
      <ul className={itemsClassName}>
        {data.map((item, i) => (
          <li key={`${item.id || i}`} className={itemClassName}>
            {renderItem(item, linkClassName)}
          </li>
        ))}
      </ul>
    )
  );
}

function defaultRenderItem(itemData) {
  return itemData.text;
}
