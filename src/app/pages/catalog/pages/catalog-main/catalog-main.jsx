import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { List } from '../../../../components/list';
import { ListItem } from '../../../../components/list-item';
import { Icon } from '../../../../components/icon';
import { Spinner } from '../../../../components/spinner';

import { getPathFromPathname } from '../../../../utils/url';

import * as filesStore from '../../../../store/files';
import * as overlayStore from '../../../../store/image-overlay';

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
  list: {
    width: '100%',
    alignSelf: 'baseline',
  },
};

@connect(
  (state, { location }) => {
    const { pathname } = location;
    const path = getPathFromPathname(pathname);
    return {
      files: filesStore.selector(state, path),
    };
  },
  dispatch => ({
    overlayActions: bindActionCreators(overlayStore, dispatch),
    filesActions: bindActionCreators(filesStore, dispatch),
  }),
)
class CatalogMain extends React.Component {
  componentDidMount() {
    const { location } = this.props;
    const { pathname } = location;

    const { filesActions } = this.props;
    const { getFilesByPath } = filesActions;

    const path = getPathFromPathname(pathname);

    getFilesByPath(path);
  }

  renderList() {
    const { files, overlayActions } = this.props;

    const { itemsOrdered, imagesIds } = files;

    return (
      <List
        style={styles.list}
        items={itemsOrdered}
        renderItem={
          item => (
            <ListItem
              media={<Icon icon={getIconByFileType(item.fType)} />}
              content={item.name}
              after={item.mediaType}
              onClick={() => {
                if (item.mediaType === 'image/jpeg') {
                  overlayActions.showFullsizeImage({
                    images: files.images,
                    imagePos: imagesIds.findIndex(image => image === item.path),
                  });
                }
              }}
            />
          )
        }
      />
    );
  }

  render() {
    const { files } = this.props;
    const { isPending } = files;

    return (
      <div style={styles.layout}>
        {isPending ? renderLoader() : this.renderList()}
      </div>
    );
  }
}

function renderLoader() {
  return <Spinner />;
}

function getIconByFileType(type) {
  return iconTypes[type];
}

export default CatalogMain;
