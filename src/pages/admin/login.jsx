import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authAction';
import '../../css/admin/style.css';
import logo from '../../img/logo.svg';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <section className="login p-fixed d-flex bg-primary common-img-bg">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="login-card card-block">
              <form className="md-float-material" onSubmit={handleLogin}>
                <div className="text-center mb-3">
                  <img src={logo} alt="Logo" style={{ width: '45%' }} />
                </div>
                <h3 className="text-center text-dark mb-3 mt-4">
                  Let's Get Started
                </h3>
                <div className="col-lg-12 mb-3">
                  <label htmlFor="email" className="form-label">Username</label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Username"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
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
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="col-sm-6 col-xs-12 forgot-phone text-right mt-3">
                  <a href="/forgot-password" className="text-right f-w-600">
                    <i className="icon-lock"></i> Forget Password?
                  </a>
                </div>
                {error && (
                  <div className="col-12 text-danger text-center mt-2">{error}</div>
                )}
                <div className="col-xs-12 text-center mt-4">
                  <button type="submit" className="btn btn-primary text-center m-b-20" disabled={loading}>
                    {loading ? 'Logging in...' : 'LOGIN'}
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
