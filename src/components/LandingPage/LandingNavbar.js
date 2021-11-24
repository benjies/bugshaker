import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';

export default function LandingNavbar() {
  return (
    <div className='landingNavbar'>
      <div className='logoTitle'>
        <FontAwesomeIcon icon={faBug} size='lg' />
        <h1>bugshaker</h1>
      </div>
      <div className='navItems'>
        <Link path to='/signup' className='navLink'>
          Signup
        </Link>
        <Link path to='/login' className='navLink'>
          Login
        </Link>
      </div>
    </div>
  );
}
