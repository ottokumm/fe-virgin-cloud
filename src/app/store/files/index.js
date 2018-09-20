import { handle } from 'redux-pack';
import { combineReducers } from 'redux';
import { files } from '../../services/api';

const prefix = 'APP/FILES';

// Action types
const GET_ROOT_FILES = `${prefix}/GET_ROOT_FILES`;

// Action creators
export function getRootFiles() {
  return {
    type: GET_ROOT_FILES,
    promise: files.getFiles().then(response => response),
  };
}

// Reducers
export const reducers = combineReducers({
  fileItems,
});

function fileItems(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ROOT_FILES: {
      return handle(state, action, {
        success: () => payload,
      });
    }
    default: {
      return state;
    }
  }
}
