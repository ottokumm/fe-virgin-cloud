import React from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames/bind';

import * as styles from './page.scss';

const cn = classNames.bind(styles);

@withRouter
class Page extends React.Component {
  render() {
    const {
      className, children, ...props
    } = this.props;
    return (
      <div
        {...props}
        className={cn('page', className)}
        ref={(node) => { this.page = node; }}
      >
        {children}
      </div>
    );
  }
}

export default Page;
