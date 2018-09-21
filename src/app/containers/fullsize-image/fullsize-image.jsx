import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import SwipeableViews from 'react-swipeable-views';

import { Icon } from '../../components/icon';
import { Spinner } from '../../components/spinner';


import * as imageOverlayStore from '../../store/image-overlay';

import styles from './fullsize-image.scss';

const cn = classnames.bind(styles);

const getImageUrl = () => ['url1', 'url2']

@connect(
  state => ({
    imageOverlay: imageOverlayStore.selector(state),
  }),
  dispatch => ({
    imageOverlayActions: bindActionCreators(imageOverlayStore, dispatch),
  }),
)
class FullsizeImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      progress: {},
      isFetching: true,
    };

    this.nativeGoBack = this.nativeGoBack.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { imageOverlay } = this.props;
    const { show } = imageOverlay;

    if (nextProps.show && !show) {
      const { imageProps = {} } = nextProps;
      const { images = [], imagePos } = imageProps;

      this.setState({ images: [], isFetching: true }, () => Promise.all(images.map(image => getImageUrl(image, 'product_fullsize')))
        .then(response => this.setState({
          images: response,
          isFetching: false,
          activeTab: imagePos,
        })));
    }
  }

  handleHide() {
    this.setState({ images: [], progress: {} });
  }

  handleProgress(image) {
    this.setState({ progress: { [image]: true } });
  }

  handleChangeIndex(index) {
    this.setState({ activeTab: index });
  }

  nativeGoBack(e) {
    e.stopPropagation();
    e.preventDefault();

    this.handleHide();
  }

  render() {
    const { show, className } = this.props;
    const {
      images, isFetching, progress, activeTab,
    } = this.state;

    return (
      show
        ? (
          <div className={cn('fullsize-image', { 'fullsize-image--show': show }, className)}>
            <div onClick={this.handleHide} className={cn('fullsize-image__touch-area')} onKeyDown={() => { }}>
              <Icon color="gray" icon="close" size="large" />
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
