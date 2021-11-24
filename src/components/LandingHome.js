import React, { Fragment, useEffect } from 'react';
import LandingNavbar from './LandingPage/LandingNavbar';
import LandingBody from './LandingPage/LandingBody';
import LandingFooter from './LandingPage/LandingFooter';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

export default function LandingHome() {
  const { currentUser } = useAuth();
  const history = useNavigate();

  useEffect(() => {
    if (currentUser) {
      history('/dashboard');
    } else {
      return;
    }
  }, []);
  return (
    <Fragment>
      <LandingNavbar />
      <LandingBody />
      <LandingFooter />
    </Fragment>
  );
}
