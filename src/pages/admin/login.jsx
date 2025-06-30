import React from 'react';
// import './assets/css/style.css'; 
import logo from '../../img/logo.svg'; 


const LoginPage = () => {
  return (
    <section className="login p-fixed d-flex bg-primary common-img-bg">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="login-card card-block">
              <form className="md-float-material">
                <div className="text-center mb-3">
                  <img src={logo} alt="Logo" style={{ width: '45%' }} />
                </div>
                <h3 className="text-center text-dark mb-3 mt-4">
                  Let's Get Started
                </h3>

                <div className="col-lg-12 mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Username"
                  />
                </div>

                <div className="col-lg-12">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter Your Password"
                  />
                </div>

                <div className="col-sm-6 col-xs-12 forgot-phone text-right">
                  <a href="/forgot-password" className="text-right f-w-600">
                    <i className="icon-lock"></i> Forget Password?
                  </a>
                </div>

                <div className="col-xs-12 text-center mt-4">
                  <button type="button" className="btn btn-primary text-center m-b-20">
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
