// src/redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import sizeReducer from './sizeReducer';
import colorReducer from './colorReducer';
import brandReducer from './brandReducer';
import featureTypeReducer from './featureTypeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  categories:categoryReducer,
  sizes:sizeReducer,
  colors:colorReducer,
  brands:brandReducer,
  featureTypes:featureTypeReducer,
});

export default rootReducer;
