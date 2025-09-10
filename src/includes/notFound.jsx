// NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
       {/* <Header/> */}
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh' }}>
      <h1 className="display-1 text-danger">404</h1>
      <h3 className="mb-3">Page Not Found</h3>
      <p>The page you are looking for does not exist.</p>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
        Go to Home
      </button>
    </div>
    {/* <Footer/> */}
    </>
 

  );
};

export default NotFound;
