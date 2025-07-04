import logo from './logo.svg';
import './App.css';
import { useMainScripts } from './hooks/main.js';
// import ProjectCarousel from './components/users/projectCarousel.jsx';
import CounterUp from './pages/users/counterUp.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeBannerSection from './pages/users/index.jsx';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import ProductTopBar from './pages/users/shop.jsx';
import ProductDetailPage from './pages/users/product-details.jsx';
import AddressBook from './pages/users/addressbook.jsx';
import ProfilePage from './pages/users/profile.jsx';
import WishlistPage from './pages/users/wishlist.jsx';
import CartItem from './pages/users/cart.jsx';
import CheckoutPage from './pages/users/checkout.jsx';

import MyOrdersPage from './pages/users/orders.jsx';
import LoginPage from './pages/admin/login.jsx';
import Dashboard from './pages/admin/dashboard.jsx';
import ManageCategories from './pages/admin/manageCategories.jsx';
import ManageSubCategories from './pages/admin/manageSubcategories.jsx';
import ListSubCategory from './pages/admin/listSubCategory.jsx';
import ManageSizes from './pages/admin/createSize.jsx';
import ManageSizeMapping from './pages/admin/sizeMapping.jsx';
import ManageColors from './pages/admin/colors.jsx';
import ManageFeatureType from './pages/admin/featureType.jsx';
import ManageFeatureSet from './pages/admin/featureSet.jsx';
import ManageFeatureList from './pages/admin/featureList.jsx';
import BulkUpload from './pages/admin/bulkUpload.jsx';
import BulkManage from './pages/admin/bulkManage.jsx';
import ManageFilterType from './pages/admin/filterType.jsx';
import ManageFilterSet from './pages/admin/filterSet.jsx';
import ManageFilterList from './pages/admin/filterList.jsx';
import AddProduct from './pages/admin/addProduct.jsx';
import AddProductImages from './pages/admin/productImage.jsx';
import ProductFilters from './pages/admin/productFilter.jsx';
import ProductFeatures from './pages/admin/productFeatures.jsx';
import ManageUsers from './pages/admin/manageUsers.jsx';
import ManageOrders from './pages/admin/manageOrders.jsx';
import CreateCoupon from './pages/admin/addCupan.jsx';
import ManageCoupons from './pages/admin/manageCoupons.jsx';
import AddSlider from './pages/admin/sliders.jsx';
import ManageSliders from './pages/admin/manageSliders.jsx';
import ChangePassword from './pages/admin/changePassword.jsx';


import Slider from 'react-slick';

const AdminLayout = ({ children }) => (
  <div className="admin-layout d-flex">
    <div className="content">{children}</div>
  </div>
);

function App() {
  useMainScripts(); // Runs the converted jQuery logic

  return (
    <Router>
      <div className="App">
        {/* <div id="spinner" className="show">Loading...</div>
        <nav className="sticky-top">Navbar</nav> */}


        <Routes>
          <Route path='/' element={<HomeBannerSection />} />
          <Route path='/shop' element={<ProductTopBar />} />
          <Route path='/product-details' element={<ProductDetailPage />}></Route>
          <Route path='/users/address-book' element={<AddressBook />}></Route>
          <Route path='/profile' element={<ProfilePage />}></Route>
          <Route path='/wishlist' element={<WishlistPage />}></Route>
          <Route path='/addressbook' element={< AddressBook />}></Route>
          <Route path='/checkout' element={< CheckoutPage />}></Route>



          <Route path='/cart' element={<CartItem />}></Route>
          <Route path='/orders' element={<MyOrdersPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/admin/dashboard' element={<Dashboard />}></Route>
          <Route path='/admin/manage-category' element={<ManageCategories />}></Route>
          <Route path='/admin/manage-subcategory' element={<ManageSubCategories />}></Route>
          <Route path='/admin/list-subcategory' element={<ListSubCategory />}></Route>
          <Route path='/admin/create-size' element={<ManageSizes />}></Route>
          <Route path='/admin/size-mapping' element={<ManageSizeMapping />}></Route>
          <Route path='/admin/colors' element={<ManageColors />}></Route>
          <Route path='/admin/feature-set' element={<ManageFeatureSet />}></Route>
          <Route path='/admin/feature-type' element={<ManageFeatureType />}></Route>
          <Route path='/admin/feature-list' element={<ManageFeatureList />}></Route>
          <Route path='/admin/bulk-upload' element={<BulkUpload />}></Route>
          <Route path='/admin/bulk-manage' element={<BulkManage />}></Route>
          <Route path='/admin/filter-type' element={<ManageFilterType />}></Route>
          <Route path='/admin/filter-set' element={<ManageFilterSet />}></Route>
          <Route path='/admin/filter-list' element={<ManageFilterList />}></Route>
          <Route path='/admin/add-product' element={<AddProduct />}></Route>
          <Route path='/admin/product-image' element={<AddProductImages />}></Route>
          <Route path='/admin/product-filter' element={<ProductFilters />}></Route>

          <Route path='/admin/product-features' element={<ProductFeatures />}></Route>
          <Route path='/admin/manage-users' element={<ManageUsers />}></Route>
          <Route path='/admin/orders' element={<ManageOrders />}></Route>
          <Route path='/admin/add-coupon' element={<CreateCoupon />}></Route>
          <Route path='/admin/manage-coupons' element={<ManageCoupons />}></Route>
          <Route path='/admin/sliders' element={<AddSlider />}></Route>
          <Route path='/admin/manage-sliders' element={<ManageSliders />}></Route>
          <Route path='/admin/change-password' element={<ChangePassword />}></Route>




        </Routes>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>

      </div>
    </Router>
  );
}

export default App;
