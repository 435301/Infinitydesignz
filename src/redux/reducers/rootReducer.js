// src/redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import sizeReducer from './sizeReducer';
import colorReducer from './colorReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  categories:categoryReducer,
  sizes:sizeReducer,
  colors:colorReducer
});

export default rootReducer;
