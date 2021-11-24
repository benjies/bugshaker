import React, { Fragment, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';

export const ForgotPassword = () => {
  // Refs
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle Signup Submit
  async function handleSubmit(e) {
    e.preventDefault();
    // Attempt to login
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox to reset your password');
    } catch {
      setError('Failed to reset password');
    }
    setLoading(false);
  }

  return (
    <Fragment>
      {/* <!-- Signup Wrapper --> */}
      {/* <!-- NAVIGATION --> */}
      <div className='userAuthoNavbar'>
        <FontAwesomeIcon icon={faBug} size='lg' />
        <Link to='/' className='logoHome'>
          <h1>bugshaker</h1>
        </Link>
      </div>
      <div className='signup-wrapper'>
        {/* <!-- Primary Signup Form --> */}
        <form className='signup-form' onSubmit={handleSubmit}>
          <h3 id='form-question'>Password Reset</h3>
          <div className='signup-inside-wrapper'>
            {/* Error Message */}
            {error && <p className='signup-error'>{error}</p>}
            {message && <p className='reset-password-message'>{message}</p>}
            <label>Email</label>
            <input type='email' ref={emailRef} required />
            <Link to='/login' className='forgot-password'>
              Login
            </Link>
          </div>
          {/* <!-- Continue / Submit current --> */}
          <input
            disabled={loading}
            type='submit'
            value='Reset Password'
            className='signup-submit-btn'
          />
        </form>
      </div>
      <p className='signup-login'>
        Need an account? <Link to='/signup'>Signup</Link>
      </p>
    </Fragment>
  );
};
