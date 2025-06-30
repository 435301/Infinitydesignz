import logo from './logo.svg';
import './App.css';
import { useMainScripts } from './hooks/main.js';
import ProjectCarousel from './components/projectCarousel.jsx';
import CounterUp from './components/counterUp.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeBannerSection from './pages/users/index.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProductTopBar from './pages/users/shop.jsx';
import ProductDetailPage from './components/product-details.jsx';
import AddressBook from './components/addressbook.jsx';
import ProfilePage from './pages/users/profile.jsx';
import MyOrdersPage from './pages/users/orders.jsx';
import LoginPage from './pages/admin/login.jsx';
import Dashboard from './pages/admin/dashboard.jsx';
import ManageCategories from './pages/admin/manageCategories.jsx';

function App() {
  useMainScripts(); // Runs the converted jQuery logic

  return (
    <Router>
      <div className="App">
        {/* <div id="spinner" className="show">Loading...</div>
        <nav className="sticky-top">Navbar</nav> */}

        <Routes>
          <Route path='/' element={<HomeBannerSection/>}/>
          <Route path='/shop' element={<ProductTopBar/>}/>
          <Route path='/product-details' element={<ProductDetailPage/>}></Route>
          <Route path='/address-book' element={<AddressBook/>}></Route>
          <Route path='/profile' element={<ProfilePage/>}></Route>
          <Route path='/orders' element={<MyOrdersPage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/manage-category' element={<ManageCategories/>}></Route>



        </Routes>
      </div>
    </Router>
  );
}

export default App;
