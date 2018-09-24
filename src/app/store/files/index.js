import { handle } from 'redux-pack';
import { combineReducers } from 'redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { fs } from '../../services/api';

import * as _files from '../../__mocks__/response/files.json';

const prefix = 'APP/FILES';

// Action types
const GET_ROOT_FILES = `${prefix}/GET_ROOT_FILES`;
const GET_FILES_BY_PATH = `${prefix}/GET_FILES_BY_PATH`;


// Mocks
const mocks = {
  getRootFiles: Promise.resolve({ data: _files.default }),
};


// Helpers
const normalizeRootFiles = (response) => {
  const { data = [] } = response || {};

  const items = data.reduce((accumulator, currentValue) => {
    const id = currentValue.path;
    accumulator[id] = currentValue;
    return accumulator;
  }, {});

  const ids = Object.keys(items);

  return {
    root: { items, ids },
  };
};

const normalizeFiles = (response, path) => {
  const { data = [] } = response || {};

  const items = data.reduce((accumulator, currentValue) => {
    const id = currentValue.path;
    accumulator[id] = currentValue;
    return accumulator;
  }, {});

  const ids = Object.keys(items);

  return { items, ids, path: path || 'root' };
};


// Action creators
export function getRootFiles() {
  const request = mocks.getRootFiles || fs.getFiles().then(response => response);
  return {
    type: GET_ROOT_FILES,
    promise: request.then(normalizeRootFiles),
  };
}

export function getFilesByPath(path) {
  const request = mocks.getFilesByPath || fs.getFilesByPath(path).then(response => response);
  return {
    type: GET_FILES_BY_PATH,
    promise: request.then(response => normalizeFiles(response, path)),
  };
}


// Reducers
export const reducers = combineReducers({
  filesItems,
  filesItemsIds,
  progress,
});

function filesItems(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ROOT_FILES: {
      return handle(state, action, {
        success: (stateNew) => {
          const { root } = payload;
          const { items } = root;
          return { ...stateNew, root: { ...stateNew.root, ...items } };
        },
      });
    }
    case GET_FILES_BY_PATH: {
      return handle(state, action, {
        success: (stateNew) => {
          const { path, items } = payload;

          return { ...stateNew, ...({ [path]: items }) };
        },
      });
    }
    default: {
      return state;
    }
  }
}

function filesItemsIds(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ROOT_FILES: {
      return handle(state, action, {
        success: (stateNew) => {
          const { root } = payload;
          const { ids } = root;
          return { ...stateNew, root: ids };
        },
      });
    }
    case GET_FILES_BY_PATH: {
      return handle(state, action, {
        success: (stateNew) => {
          const { ids, path } = payload;

          return { ...stateNew, [path]: ids };
        },
      });
    }
    default: {
      return state;
    }
  }
}


function progress(state = 0, action) {
  const { type } = action;

  switch (type) {
    case GET_ROOT_FILES:
    case GET_FILES_BY_PATH:
      return handle(state, action, {
        start: stateOld => stateOld + 1,
        finish: stateOld => stateOld - 1,
      });

    default:
      return state;
  }
}

const filesItemsSelector = ({ files }, path) => (files.filesItems || {})[path || 'root'];
const filesItemsIdsSelector = ({ files }, path) => (files.filesItemsIds || {})[path || 'root'];
const filesItemsIdsOrderedSelector = createSelector(
  [filesItemsSelector, filesItemsIdsSelector],
  (items = {}, ids = []) => ids.sort((curId) => {
    const curItem = items[curId];
    return curItem.fType === 'file' ? 1 : -1;
  }),
);
const progressSelector = ({ files }) => !!files.progress;

const filesItemsOrderedSelector = createSelector(
  [filesItemsSelector, filesItemsIdsOrderedSelector],
  (items = {}, ids = []) => ids.map(id => items[id]),
);

const filesImageIdsSelector = createSelector(
  [filesItemsSelector, filesItemsIdsOrderedSelector],
  (items = {}, ids = []) => ids.filter(id => items[id].mediaType === 'image/jpeg'),
);

const filesImageItemsOrderedSelector = createSelector(
  [filesItemsSelector, filesImageIdsSelector],
  (items = {}, ids = []) => ids.map(id => items[id].url),
);

export const selector = createStructuredSelector(
  {
    items: filesItemsSelector,
    ids: filesItemsIdsSelector,
    idsOrdered: filesItemsIdsOrderedSelector,
    itemsOrdered: filesItemsOrderedSelector,
    imagesIds: filesImageIdsSelector,
    images: filesImageItemsOrderedSelector,
    isPending: progressSelector,
  },
);
