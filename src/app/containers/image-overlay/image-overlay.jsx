import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './image-overlay.scss';

import * as imageOverlay from '../../store/image-overlay';

const cn = classnames.bind(styles);

@connect(state => imageOverlay.selector(state), null)
class ImageOverlay extends React.Component {
  render() {
    const {
      children, className, visible, dispatch, ...props
    } = this.props;

    return (
      <div
        {...props}
        className={cn('image-overlay', { 'image-overlay--visible': visible }, className)}
      >
        {children}
      </div>
    );
  }
}

export default ImageOverlay;
