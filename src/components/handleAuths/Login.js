import React, { Fragment, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';

export const Login = () => {
  // Refs
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  // Handle Login Submit
  async function handleSubmit(e) {
    e.preventDefault();
    // Attempt to login
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history('/dashboard');
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false);
  }

  async function demoLogin() {
    // Attempt to login
    try {
      setError('');
      setLoading(true);
      await login('test@test.com', 'testing');
      history('/dashboard');
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false);
  }

  return (
    <Fragment>
      <div className='userAuthoNavbar'>
        <FontAwesomeIcon icon={faBug} size='lg' />
        <Link to='/' className='logoHome'>
          <h1>bugshaker</h1>
        </Link>
      </div>
      {/* <!-- Login Wrapper --> */}
      {/* <!-- NAVIGATION --> */}
      <div className='signup-wrapper'>
        {/* <!-- Primary Signup Form --> */}
        <form className='signup-form' onSubmit={handleSubmit}>
          <h3 id='form-question'>Login</h3>
          <div className='signup-inside-wrapper'>
            {/* Error Message */}
            {error && <p className='signup-error'>{error}</p>}
            <label>Email</label>
            <input type='email' ref={emailRef} required />
            <label>Password</label>
            <input type='password' ref={passwordRef} required />
            <Link to='/forgot-password' className='forgot-password'>
              Forgot Password?
            </Link>
          </div>
          {/* <!-- Continue / Submit current --> */}
          <input
            disabled={loading}
            type='submit'
            value='SUBMIT'
            className='signup-submit-btn'
          />
        </form>
      </div>
      <p className='demoBTN'>
        <span onClick={() => demoLogin()}>Login</span> with Demo Account
      </p>
      <p className='signup-login'>
        Don't have an account? <Link to='/signup'>Sign Up</Link>
      </p>
    </Fragment>
  );
};
