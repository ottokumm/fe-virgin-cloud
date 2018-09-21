import { combineReducers } from 'redux';
import { createStructuredSelector } from 'reselect';

const IMAGE_OVERLAY_SHOW = 'APP/IMAGE_OVERLAY_SHOW';
const IMAGE_OVERLAY_HIDE = 'APP/IMAGE_OVERLAY_HIDE';
const FULLSIZE_IMAGE_SHOW = 'APP/FULLSIZE_IMAGE_SHOW';
const FULLSIZE_IMAGE_HIDE = 'APP/FULLSIZE_IMAGE_HIDE';


// Actions

export function showImageOverlay() {
  return { type: IMAGE_OVERLAY_SHOW };
}

export function hideImageOverlay() {
  return { type: IMAGE_OVERLAY_HIDE };
}

export function showFullsizeImage(options) {
  return (dispatch) => {
    dispatch(showImageOverlay());
    dispatch({ type: FULLSIZE_IMAGE_SHOW, payload: options });
  };
}

export function hideFullsizeImage(name) {
  return (dispatch) => {
    dispatch(hideImageOverlay());
    dispatch({ type: FULLSIZE_IMAGE_HIDE, name });
  };
}


// Reducers

export const reducers = combineReducers({
  imageOverlay,
  fullsizeImage,
});

function imageOverlay(state = {}, { type }) {
  switch (type) {
    case IMAGE_OVERLAY_SHOW: return { visible: true };
    case IMAGE_OVERLAY_HIDE: return { visible: false };
    default: return state;
  }
}

function fullsizeImage(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case FULLSIZE_IMAGE_SHOW:
      return { show: true, imageProps: { ...payload } };

    case FULLSIZE_IMAGE_HIDE:
      return { show: false };

    default:
      return state;
  }
}


// Selectors

const visibilitySelector = state => (state.imageOverlay || {}).visible;
const showSelector = state => (state.fullsizeImage || {}).show;

export const selector = createStructuredSelector({
  visible: visibilitySelector,
  show: showSelector,
});
