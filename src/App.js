import logo from './logo.svg';
import './App.css';
import { useMainScripts } from './hooks/main.js';
// import ProjectCarousel from './components/users/projectCarousel.jsx';
import CounterUp from './pages/users/counterUp.jsx';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import HomeBannerSection from './pages/users/index.jsx';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import ProductTopBar from './pages/users/shop.jsx';
import ProductDetailPage from './pages/users/product-details.jsx';
import AddressBook from './pages/users/addressbook.jsx';
import ProfilePage from './pages/users/profile.jsx';
import WishlistPage from './pages/users/wishlist.jsx';
import CartItem from './pages/users/cart.jsx';
import CheckoutPage from './pages/users/checkout.jsx';
import OrderSuccess from './pages/users/OrderSuccess.jsx';
import OrderFailure from './pages/users/OrderFailure.jsx';

import MyOrdersPage from './pages/users/orders.jsx';
import LoginPage from './pages/admin/login.jsx';
import Dashboard from './pages/admin/dashboard.jsx';
import ManageCategories from './pages/admin/manageCategories.jsx';
import ManageSubCategories from './pages/admin/manageSubcategories.jsx';
import ListSubCategory from './pages/admin/listSubCategory.jsx';
import ManageSizes from './pages/admin/createSize.jsx';
import ManageColors from './pages/admin/colors.jsx';
import ManageBrands from './pages/admin/createBrand.jsx';
import ManageFeatureType from './pages/admin/featureType.jsx';
import ManageFeatureSet from './pages/admin/featureSet.jsx';
import ManageFeatureList from './pages/admin/featureList.jsx';
import BulkUpload from './pages/admin/bulkUpload.jsx';
import BulkManage from './pages/admin/bulkManage.jsx';
import ManageFilterType from './pages/admin/filterType.jsx';
import ManageFilterSet from './pages/admin/filterSet.jsx';
import ManageFilterList from './pages/admin/filterList.jsx';
import AddProduct from './components/addProduct.jsx';
import AddProductImages from './pages/admin/productImage.jsx';
import ProductFilters from './pages/admin/productFilter.jsx';
import ProductFeatures from './pages/admin/productFeatures.jsx';
import ManageUsers from './pages/admin/manageUsers.jsx';
import ManageOrders from './pages/admin/manageOrders.jsx';
// import CreateCoupon from './pages/admin/addCupan.jsx';
import ManageCoupons from './pages/admin/manageCoupons.jsx';
import AddSlider from './pages/admin/sliders.jsx';
import ManageSliders from './pages/admin/manageSliders.jsx';
import ChangePassword from './pages/admin/changePassword.jsx';
import { ToastContainer, toast } from 'react-toastify';
import OffersList from './pages/admin/OffersList.jsx';
import CreateCoupon from './pages/admin/CreateCoupon.jsx';
import HomePromotionCategory from './pages/admin/HomePromotionCategory.jsx';
import HomeScreenCreatePromotion from './pages/admin/HomeScreenCreatePromotion.jsx';
import HomeScreenPromotions from './pages/admin/HomeScreenPromotions.jsx';
import CreatePromotion from './pages/admin/CreatePromotion'
import Slider from 'react-slick';
import ManageProducts from './pages/admin/manageProduct.jsx';
import EditProduct from './components/editProduct.jsx';
import PromotionCategoryList from './pages/admin/PromotionCategoryList.jsx';
import CreateAppPromotionHeader from './pages/admin/CreateAppPromotionHeader.jsx'
import AppCategoryPromotionsList from './pages/admin/AppCategoryPromotionsList'
import AppCategoryPromotionsCreate from './pages/admin/AppCategoryPromotionsCreate'
import AppHomePromotionCategories from './pages/admin/AppHomePromotionCategories'
import CreatePromotionCategory from './pages/admin/CreatePromotionCategory'
import ManagePromotions from './pages/admin/ManagePromotions.jsx'
import AppCategoryPromotionForm from './pages/admin/AppCategoryPromotionForm'
import UserOrdersTable from './pages/admin/UserOrdersTable'
import ManageContact from './pages/admin/ManageContact.jsx'
import SearchKeywordsList from './pages/admin/SearchKeywordsList'
import ProductCard from './components/productCard.jsx';
import ProductPage from './pages/admin/productPage.jsx';
import EditProductPage from './pages/admin/editproductPage.jsx';
import EditProductFeatures from './pages/admin/editProductFeatures.jsx';
import EditProductFilters from './pages/admin/editProductFilters.jsx';
import EditProductImages from './pages/admin/editProductImage.jsx';
import ProductsPage from './pages/users/allProducts.jsx';
import { useDispatch, useSelector } from 'react-redux';
import OtpLoginModal from './components/otpLoginModal.jsx';
import { fetchWishlist } from './redux/actions/whishlistAction.js';
import { useEffect } from 'react';
import { isLoggedIn } from './utils/auth.js';
import { fetchCart } from './redux/actions/cartAction.js';
import { fetchProfile } from './redux/actions/profileAction.js';
import AdminRoute from './components/adminRoute.jsx';
import OrderDetailsPage from './components/orderDetails.jsx';
const AdminLayout = ({ children }) => (
  <div className="admin-layout d-flex">
    <div className="content">{children}</div>
  </div>
);

function App() {
  useMainScripts();
  const dispatch = useDispatch();
  const showLoginModal = useSelector((state) => state.login.showLoginModal);

  const handleLoginSuccess = () => {
    dispatch({ type: "HIDE_LOGIN_MODAL" });
  };

  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(fetchWishlist());
      dispatch(fetchCart());
      dispatch(fetchProfile());
    }
  }, [dispatch])

  return (

    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path='/' element={<HomeBannerSection />} />
          <Route path='/shop' element={<ProductTopBar />} />
          <Route path='/product-details/:productId' element={<ProductDetailPage />}></Route>
          <Route path='/users/address-book' element={<AddressBook />}></Route>
          <Route path='/profile' element={<ProfilePage />}></Route>
          <Route path='/wishlist' element={<WishlistPage />}></Route>
          <Route path='/addressbook' element={< AddressBook />}></Route>
          <Route path='/checkout' element={< CheckoutPage />}></Route>
          <Route path='/cart' element={<CartItem />}></Route>
          <Route path='/orders' element={<MyOrdersPage />}></Route>
          <Route path='/orders-success/:id' element={<OrderSuccess />}></Route>
          <Route path='/orders-failure' element={<OrderFailure />}></Route>

          <Route path='/admin/login' element={<LoginPage />}></Route>
          <Route path='/admin/dashboard' element={<AdminRoute> <Dashboard /> </AdminRoute>}></Route>
          <Route path='/admin/manage-category' element={<AdminRoute><ManageCategories /> </AdminRoute>}></Route>
          <Route path='/admin/manage-subcategory' element={<AdminRoute><ManageSubCategories /></AdminRoute>}></Route>
          <Route path='/admin/list-subcategory' element={<AdminRoute><ListSubCategory /></AdminRoute>}></Route>
          <Route path='/admin/create-size' element={<AdminRoute><ManageSizes /></AdminRoute>}></Route>
          <Route path='/admin/create-brand' element={<AdminRoute><ManageBrands /></AdminRoute>}></Route>
          {/* <Route path='/admin/size-mapping' element={<ManageSizeMapping />}></Route> */}
          <Route path='/admin/colors' element={<AdminRoute><ManageColors /></AdminRoute>}></Route>
          <Route path='/admin/feature-set' element={<AdminRoute><ManageFeatureSet /></AdminRoute>}></Route>
          <Route path='/admin/feature-type' element={<AdminRoute><ManageFeatureType /></AdminRoute>}></Route>
          <Route path='/admin/feature-list' element={<AdminRoute><ManageFeatureList /></AdminRoute>}></Route>
          <Route path='/admin/bulk-upload' element={<AdminRoute><BulkUpload /></AdminRoute>}></Route>
          <Route path='/admin/bulk-manage' element={<AdminRoute><BulkManage /></AdminRoute>}></Route>
          <Route path='/admin/filter-type' element={<AdminRoute><ManageFilterType /></AdminRoute>}></Route>
          <Route path='/admin/filter-set' element={<AdminRoute><ManageFilterSet /></AdminRoute>}></Route>
          <Route path='/admin/filter-list' element={<AdminRoute><ManageFilterList /></AdminRoute>}></Route>
          <Route path='/admin/add-product' element={<AdminRoute><AddProduct /></AdminRoute>}></Route>
          {/* <Route path='/admin/edit-product/:id' element={<EditProduct />}></Route> */}
          <Route path='/admin/product-image' element={<AdminRoute><AddProductImages /></AdminRoute>}></Route>
          <Route path='/admin/product-filter' element={<AdminRoute><ProductFilters /></AdminRoute>}></Route>
          <Route path='/admin/manage-product' element={<AdminRoute><ManageProducts /></AdminRoute>}></Route>
          <Route path='/admin/product-features' element={<AdminRoute><ProductFeatures /></AdminRoute>}></Route>
          <Route path='/admin/manage-users' element={<AdminRoute><ManageUsers /></AdminRoute>}></Route>
          <Route path='/admin/orders' element={<AdminRoute><ManageOrders /></AdminRoute>}></Route>
          <Route path='/admin/add-coupon' element={<AdminRoute><CreateCoupon /></AdminRoute>}></Route>
          <Route path='/admin/manage-coupons' element={<AdminRoute><ManageCoupons /></AdminRoute>}></Route>
          {/* <Route path='/admin/sliders' element={<AdminRoute><AddSlider /></AdminRoute>}></Route> */}
          <Route path='/admin/manage-sliders' element={<AdminRoute><ManageSliders /></AdminRoute>}></Route>
          <Route path='/admin/change-password' element={<AdminRoute><ChangePassword /></AdminRoute>}></Route>
          <Route path='/admin/offers' element={<AdminRoute><OffersList /></AdminRoute>}></Route>
          <Route path='/admin/create-coupon' element={<AdminRoute><CreateCoupon /></AdminRoute>}></Route>
          <Route path='/admin/home-screen-promotion-category' element={<AdminRoute><HomePromotionCategory /></AdminRoute>}></Route>
          <Route path='/admin/add-home-promotions-category' element={<AdminRoute><HomeScreenCreatePromotion /></AdminRoute>}></Route>
          <Route path='/admin/home-screen-create-promotion' element={<AdminRoute><HomeScreenPromotions /></AdminRoute>}></Route>
          <Route path='/admin/add-home-screen-create-promotion' element={<AdminRoute><CreatePromotion /></AdminRoute>}></Route>
          <Route path='/admin/menu-promotion-category' element={<AdminRoute><PromotionCategoryList /></AdminRoute>}></Route>
          <Route path='/admin/add-menu-create-promotions' element={<AdminRoute><CreateAppPromotionHeader /></AdminRoute>}></Route>
          <Route path='/admin/menu-create-promotion' element={<AdminRoute><AppCategoryPromotionsList /></AdminRoute>}></Route>
          <Route path='/admin/app-category-promotions-list' element={<AdminRoute><AppCategoryPromotionsCreate /></AdminRoute>}></Route>
          <Route path='/admin/sub-menu-promotion-category' element={<AdminRoute><AppHomePromotionCategories /></AdminRoute>}></Route>
          <Route path='/admin/app-home-promotion-categories-app' element={<AdminRoute><CreatePromotionCategory /></AdminRoute>}></Route>
          <Route path='/admin/sub-menu-create-promotion' element={<AdminRoute><ManagePromotions /></AdminRoute>}></Route>
          <Route path='/admin/app-category-promotions-list-create' element={<AdminRoute><AppCategoryPromotionForm /></AdminRoute>}></Route>
          <Route path='/admin/subscriberslist' element={<AdminRoute><UserOrdersTable /></AdminRoute>}></Route>
          <Route path='/admin/contact' element={<AdminRoute><ManageContact /></AdminRoute>}></Route>
          <Route path='/admin/keywords' element={<AdminRoute><SearchKeywordsList /></AdminRoute>}></Route>
          <Route path='/admin/product' element={<AdminRoute><ProductPage /></AdminRoute>}></Route>
          <Route path='/admin/edit-product/:id' element={<AdminRoute><EditProductPage /></AdminRoute>}></Route>
          <Route path='/admin/edit-product-features' element={<AdminRoute><EditProductFeatures /></AdminRoute>}></Route>
          <Route path='/admin/edit-product-filters' element={<AdminRoute><EditProductFilters /></AdminRoute>}></Route>
          <Route path='/admin/edit-product-images' element={<AdminRoute><EditProductImages /></AdminRoute>}></Route>
          <Route path='/products' element={<ProductsPage />}></Route>
          <Route path="/admin/orders/:orderId" element={<OrderDetailsPage />} />
        </Routes>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>

      </div>
      <OtpLoginModal
        show={showLoginModal}
        onClose={() => dispatch({ type: "HIDE_LOGIN_MODAL" })}
        onLoginSuccess={handleLoginSuccess}
      />
    </BrowserRouter>

  );
}

export default App;
