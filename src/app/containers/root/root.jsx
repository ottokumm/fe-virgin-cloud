import React from 'react';
import { ImageOverlayContainer } from '../image-overlay';
import { FullsizeImageContainer } from '../fullsize-image';

import { Page } from './components/page';

const styles = {
  layout: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
};

class Root extends React.Component {
  renderPage() {
    const { children } = this.props;
    // const child = React.Children.only(children);

    return <Page>{children}</Page>;
  }


  render() {
    const imageOverlay = renderImageOverlay();
    const page = this.renderPage();
    return (
      <div style={styles.layout}>
        {imageOverlay}
        {page}
      </div>
    );
  }
}

function renderImageOverlay() {
  return (
    <ImageOverlayContainer>
      <FullsizeImageContainer />
    </ImageOverlayContainer>
  );
}

export default Root;
