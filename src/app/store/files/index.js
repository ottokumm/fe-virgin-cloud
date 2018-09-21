import { handle } from 'redux-pack';
import { combineReducers } from 'redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { fs } from '../../services/api';

// import * as _files from '../../__mocks__/response/files.json';

const prefix = 'APP/FILES';

// Action types
const GET_ROOT_FILES = `${prefix}/GET_ROOT_FILES`;


// Mocks
const mocks = {
  getRootFiles: null, // Promise.resolve({ data: _files.default }),
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


// Action creators
export function getRootFiles() {
  const request = mocks.getRootFiles || fs.getFiles().then(response => response);
  console.log(request);
  return {
    type: GET_ROOT_FILES,
    promise: request.then(normalizeRootFiles),
  };
}

// Reducers
export const reducers = combineReducers({
  filesItems,
  filesItemsIds,
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
    default: {
      return state;
    }
  }
}

const filesItemsSelector = ({ files }, path) => (files.filesItems || {})[path];
const filesItemsIdsSelector = ({ files }, path) => (files.filesItemsIds || {})[path];
const filesItemsIdsOrderedSelector = createSelector(
  [filesItemsSelector, filesItemsIdsSelector],
  (items = {}, ids = []) => {
    console.log(items, ids);
    return ids.sort((curId) => {
      const curItem = items[curId];
      return curItem.fType === 'file' ? 1 : -1;
    });
  },
);

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
  },
);
