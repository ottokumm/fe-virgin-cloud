import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ImageOverlayContainer } from '../image-overlay';
import { FullsizeImageContainer } from '../fullsize-image';

import { List } from '../../components/list';
import { ListItem } from '../../components/list-item';
import { Icon } from '../../components/icon';
import { Spinner } from '../../components/spinner';

import * as filesStore from '../../store/files';
import * as imageOverlayStore from '../../store/image-overlay';

const FOLDER_TYPE = 'folder';
const FILE_TYPE = 'file';

const iconTypes = {
  [FOLDER_TYPE]: 'folder',
  [FILE_TYPE]: 'image',
};

const styles = {
  layout: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
};

@connect(
  state => ({
    files: filesStore.selector(state, 'root'),
  }),
  dispatch => ({
    imageOverlayActions: bindActionCreators(imageOverlayStore, dispatch),
    filesActions: bindActionCreators(filesStore, dispatch),
  }),
)
class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPending: false,
    };
  }

  componentDidMount() {
    const { filesActions } = this.props;
    const { getRootFiles } = filesActions;

    getRootFiles();
  }

  renderList() {
    const { files, imageOverlayActions } = this.props;

    const { itemsOrdered } = files;
    console.log(files);

    imageOverlayActions.showFullsizeImage();
    return (
      <List
        items={itemsOrdered}
        renderItem={
          item => (
            <ListItem
              media={<Icon icon={getIconByFileType(item.fType)} />}
              content={item.name}
              after={item.mediaType}
            />
          )
        }
      />
    );
  }

  render() {
    const { isPending } = this.state;

    return (
      <div style={styles.layout}>
        {renderImageOverlay()}
        {isPending ? renderLoader() : this.renderList()}
      </div>
    );
  }
}

function renderLoader() {
  return <Spinner />;
}

function renderImageOverlay() {
  return (
    <ImageOverlayContainer>
      <FullsizeImageContainer />
    </ImageOverlayContainer>
  );
}


function getIconByFileType(type) {
  return iconTypes[type];
}

export default Root;
