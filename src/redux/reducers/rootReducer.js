// src/redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import sizeReducer from './sizeReducer';
import colorReducer from './colorReducer';
import brandReducer from './brandReducer';
import featureTypeReducer from './featureTypeReducer';
import filterTypeReducer from './filterTypeReducer';
import productReducer from './productReducer';
import featureSetReducer from './featureSetReducer';
import variantsReducer from './variantReducer';
import featureListsReducer from './featureListReducer';
import filterSetReducer from './filterSetReducer';
import filterListsReducer from './filterListReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  categories:categoryReducer,
  sizes:sizeReducer,
  colors:colorReducer,
  brands:brandReducer,
  featureTypes:featureTypeReducer,
  filterTypes: filterTypeReducer,
  products:productReducer,
  featureSets:featureSetReducer,
  variants:variantsReducer,
  featureLists:featureListsReducer,
  filterSets:filterSetReducer,
  filterLists:filterListsReducer,
  productFeatures:productReducer,
  productFilters:productReducer,
});

export default rootReducer;
