import { combineReducers, createStore } from 'redux';

import { reducers as files } from './files';

const reducers = combineReducers({
  files,
});

export const store = createStore({
  reducers,
});
