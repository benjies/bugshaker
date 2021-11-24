import React, { Fragment, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';
// import { db } from '../../firebase';
// import { set, ref, onValue } from '@firebase/database';

export const Signup = () => {
  // Refs
  const displayNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const orgIDRef = useRef();
  //   const orgIDRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  // Create User's Collection in Firestore

  // Handle Signup Submit
  async function handleSubmit(e) {
    e.preventDefault();
    // Check if both passwords match
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history('/dashboard');
    } catch {
      setError('Failed to signup');
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
      {/* FORM */}
      <div className='signup-wrapper'>
        {/* <!-- Primary Signup Form --> */}
        <form className='signup-form' onSubmit={handleSubmit}>
          <h3 id='form-question'>A few questions before you dive in!</h3>
          <div className='signup-inside-wrapper'>
            {/* <!-- username remove {} from ref --> */}
            {error && <p className='signup-error'>{error}</p>}
            {/* <label>Organization ID</label>
            <input id='orgID' type='orgID' ref={orgIDRef} required /> */}
            <label>Organization ID</label>
            <input id='orgID' type='orgID' ref={orgIDRef} required />
            <label>Username</label>
            <input
              id='displayName'
              type='displayName'
              ref={displayNameRef}
              required
            />
            <label>Email</label>
            <input type='email' ref={emailRef} required />
            <label>Password</label>
            <input type='password' ref={passwordRef} required />
            <label>Re-type Password</label>
            <input type='password' ref={passwordConfirmRef} required />
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
      <p className='signup-login'>
        Already have an account? <Link to='/login'>Login</Link>
      </p>
    </Fragment>

    // <Fragment>
    //   {/* <!-- Signup Wrapper --> */}
    //   {/* <!-- NAVIGATION --> */}
    //   <div className='navbar-signup'>
    //     <h1 id='title'>Tofu Force</h1>
    //     <div className='navbar-items'>
    //       <Link to='/learn-japanese-today' className='signup-go-back-btn'>
    //         GO BACK
    //       </Link>
    //     </div>
    //   </div>
    //   <div className='signup-wrapper'>
    //     {/* <!-- Primary Signup Form --> */}
    //     <form className='signup-form' onSubmit={handleSubmit}>
    //       <h3 id='form-question'>
    //         Let's answer a few questions to get you started!
    //       </h3>
    //       <div className='signup-inside-wrapper'>
    //         {/* <!-- username remove {} from ref --> */}
    //         {error && <p className='signup-error'>{error}</p>}
    //         <label>Username</label>
    //         <input
    //           id='displayName'
    //           type='displayName'
    //           ref={displayNameRef}
    //           required
    //         />
    //         <label>Email</label>
    //         <input type='email' ref={emailRef} required />
    //         <label>Password</label>
    //         <input type='password' ref={passwordRef} required />
    //         <label>Re-type Password</label>
    //         <input type='password' ref={passwordConfirmRef} required />
    //       </div>
    //       {/* <!-- Continue / Submit current --> */}
    //       <input
    //         disabled={loading}
    //         type='submit'
    //         value='SUBMIT'
    //         className='signup-submit-btn'
    //       />
    //     </form>
    //   </div>
    //   <p id='signup-login'>
    //     Already have an account? <Link to='/login'>Login</Link>
    //   </p>
    // </Fragment>
  );
};
