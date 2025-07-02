// src/redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  categories:categoryReducer
});

export default rootReducer;
