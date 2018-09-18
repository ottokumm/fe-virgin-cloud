import React from 'react';
import { List } from '../../components/list';
import { ListItem } from '../../components/list-item';
import { Icon } from '../../components/icon';
import { Spinner } from '../../components/spinner';

import { files } from '../../services/api';

import * as mockResponse from '../../__mocks__/response/GetFilesByPath.json'

const FOLDER_TYPE = 'folder';
const FILE_TYPE = 'file';

const iconTypes = {
    [FOLDER_TYPE]: 'folder',
    [FILE_TYPE]: 'image'
}

export class Root extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPending: true,
            data: []
        }
    }

    componentDidMount() {
        files.getFiles()
            .then((response) => {
                this.setState(() => ({
                    isPending: false,
                    data: response
                }))
            })
            .catch(() => {
                console.log('error');
                this.setState(() => ({
                    isPending: false,
                })
                )
            })
    }

    getIconByFileType(type) {
        return iconTypes[type];
    }

    renderList() {
        const {data} = this.state;
        return (
            <List
                items={data}
                renderItem={(item) =>
                    <ListItem
                        media={<Icon icon={this.getIconByFileType(item['fType'])} />}
                        content={item['name']}
                        after={item['mediaType']}
                        />
                }
                />
        )
    }

    renderLoader() {
        return (
            <Spinner />
        )
    }

    render() {
        const {data, isPending} = this.state;

        return (
            <div style={styles.layout}>
                {
                    isPending
                        ?
                        this.renderLoader()
                        :
                        this.renderList()
                }
            </div>
        );
    }
}

const styles = {
    layout: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    }
}