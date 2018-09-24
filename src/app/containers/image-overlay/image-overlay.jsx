import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import styles from './image-overlay.scss';

import * as overlayStore from '../../store/image-overlay';

const cn = classnames.bind(styles);

@connect(
  state => ({
    overlay: overlayStore.selector(state),
  }),
)
class ImageOverlay extends React.Component {
  render() {
    const {
      children, className, overlay, ...props
    } = this.props;

    const { visible } = overlay;

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
