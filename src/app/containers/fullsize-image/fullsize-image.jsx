import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import SwipeableViews from 'react-swipeable-views';

import { Icon } from '../../components/icon';
import { Spinner } from '../../components/spinner';


import * as overlayStore from '../../store/image-overlay';

import styles from './fullsize-image.scss';

const cn = classnames.bind(styles);

@connect(
  state => ({
    overlay: overlayStore.selector(state),
  }),
  dispatch => ({
    overlayActions: bindActionCreators(overlayStore, dispatch),
  }),
)
class FullsizeImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      progress: {},
      isFetching: false,
      activeTab: 0,
    };

    this.handleProgress = this.handleProgress.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { overlay } = this.props;

    const { overlay: overlayNext } = nextProps;

    const { show } = overlay;
    const { show: showNext } = overlayNext;

    if (showNext && !show) {
      const { imageProps = {} } = overlayNext;
      const { images = [], imagePos = 2 } = imageProps;

      this.setState({ images, activeTab: imagePos });
    }
  }

  handleHide() {
    const { overlayActions } = this.props;
    const { hideFullsizeImage } = overlayActions;
    this.setState({ images: [], progress: {} }, () => hideFullsizeImage());
  }

  handleProgress(image) {
    this.setState({ progress: { [image]: true } });
  }

  handleChangeIndex(index) {
    this.setState({ activeTab: index });
  }

  render() {
    const { overlay, className } = this.props;
    const { show } = overlay;
    const {
      images, isFetching, progress, activeTab,
    } = this.state;

    return (
      show
        ? (
          <div className={cn('fullsize-image', { 'fullsize-image--show': show }, className)}>
            <div onClick={this.handleHide} className={cn('fullsize-image__touch-area')} onKeyDown={() => { }}>
              <Icon color="gray" icon="close" />
            </div>

            {show && isFetching && <Spinner />}
            {
              show && !isFetching && (
                <SwipeableViews
                  className={cn('fullsize-image__content')}
                  containerStyle={{ height: '100%' }}
                  slideStyle={{
                    height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  onChangeIndex={this.handleChangeIndex}
                  index={activeTab}
                >
                  {images.map(
                    (image, index) => (
                      <div
                        className={cn('fullsize-image__item')}
                        style={{ backgroundImage: progress[image] && `url(${image})` }}
                      >
                        {activeTab === index && !progress[image] && <Spinner />}
                        {
                            activeTab === index && !progress[image] && (
                              <img
                                alt=""
                                style={{ display: 'none' }}
                                src={image}
                                onLoad={this.handleProgress.bind(this, image)}
                              />
                            )
                          }
                      </div>
                    ),
                  )
                  }
                </SwipeableViews>
              )
            }
          </div>
        )
        : null
    );
  }
}

export default FullsizeImage;
