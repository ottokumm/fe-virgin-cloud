import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List } from '../../components/list';
import { ListItem } from '../../components/list-item';
import { Icon } from '../../components/icon';
import { Spinner } from '../../components/spinner';

import * as files from '../../store/files';

const FOLDER_TYPE = 'folder';
const FILE_TYPE = 'file';

const iconTypes = {
  [FOLDER_TYPE]: 'folder',
  [FILE_TYPE]: 'image',
};

const styles = {
  layout: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
};

@connect(
  state => ({
    files: files.selector(state, 'root'),
  }),
  dispatch => ({
    filesActions: bindActionCreators(files, dispatch),
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
    const { files: fs } = this.props;
    const { itemsOrdered } = fs;
    console.log(fs);
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

    return <div style={styles.layout}>{isPending ? renderLoader() : this.renderList()}</div>;
  }
}

function renderLoader() {
  return <Spinner />;
}

function getIconByFileType(type) {
  return iconTypes[type];
}

export default Root;
