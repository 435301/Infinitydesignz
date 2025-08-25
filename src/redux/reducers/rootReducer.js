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
import priceReducer from './priceReducer';
import couponReducer from './couponReducer';
import userProductDetailsReducer from './userProductDetailsReducer';
import userAuthReducer from './userAuthReducer';
import wishlistReducer from './whishlistReducer';
import LoginReducer from './loginReducer';
import { cartReducer } from './cartReducer';
import { guestCartReducer } from './guestCartReducer';
import addressReducer from './addressReducer';
import orderReducer from './orderReducer';
import { profileReducer } from './profileReducer';
import { buyNowReducer } from './buyNowReducer';
import slidersReducer from './sliderReducer';
import contactReducer from './contactReducer';
import { homeCategoryPromotionsReducer } from './catgeoryPromotionReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoryReducer,
  sizes: sizeReducer,
  colors: colorReducer,
  brands: brandReducer,
  featureTypes: featureTypeReducer,
  filterTypes: filterTypeReducer,
  products: productReducer,
  featureSets: featureSetReducer,
  variants: variantsReducer,
  featureLists: featureListsReducer,
  filterSets: filterSetReducer,
  filterLists: filterListsReducer,
  productFeatures: productReducer,
  productFilters: productReducer,
  prices: priceReducer,
  coupons: couponReducer,
  userProductDetails: userProductDetailsReducer,
  userAuth: userAuthReducer,
  whishlist: wishlistReducer,
  login: LoginReducer,
  cart: cartReducer,
  guestCart: guestCartReducer,
  addressBook: addressReducer,
  order: orderReducer,
  profile: profileReducer,
  buyNow: buyNowReducer,
  sliders: slidersReducer,
  rightSliders: slidersReducer,
  ordersState: orderReducer,
  orderByIdState: orderReducer,
  cancelOrderItem: orderReducer,
  productState: productReducer,
  contact:contactReducer,
  categoryPromotion: homeCategoryPromotionsReducer
});

export default rootReducer;
