import {
  compose,
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';

import { middleware as packMiddleware } from 'redux-pack';
import thunkMiddleware from 'redux-thunk';

import { reducers as files } from './files';
import { reducers as overlay } from './image-overlay';

const reducers = combineReducers({
  files,
  overlay,
});

const enhancers = compose(
  applyMiddleware(
    thunkMiddleware,
    packMiddleware,
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);

export const store = createStore(reducers, enhancers);
