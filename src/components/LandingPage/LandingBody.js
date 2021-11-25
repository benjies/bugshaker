import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import demoImg from '../../imgs/demoimg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faFileAlt } from '@fortawesome/free-solid-svg-icons';

export default function LandingBody() {
  return (
    <Fragment>
      {/* Hero Body */}
      <div className='hero-body'>
        <img src={demoImg} alt='demo of bugshaker' className='heroIMG' />
        <h2>Shake Your Bugs Away</h2>
        <p>
          A clean and modern UI built to help small scale teams tackle their bug
          issues without interuptions
        </p>
        <Link path to='/signup' className='getStartedBTN'>
          Get Started
        </Link>
      </div>
      {/* Landing FAQ Section */}
      <div className='landing-FAQ'>
        <h2 className='FAQ-title'>FAQ</h2>
        {/* SS */}
        <div className='FAQ'>
          <FontAwesomeIcon icon={faQuestion} size='3x' />
          <h3 className='question'>Why bugshaker?</h3>
          <p className='answer'>
            Providing a clean and easy to use UI is the key to bugshaker.
            Developers already have their hands full, no need to clog the eyes.
          </p>
        </div>
        {/* SS */}
        <div className='FAQ'>
          <FontAwesomeIcon icon={faFileAlt} size='3x' />
          <h3 className='question'>Does it meet industry standards?</h3>
          <p className='answer'>
            Built with React and Firabase, bugshaker is meant to last.
            Implementing the lastest versions, you will never be behind the
            industry standard.
          </p>
        </div>
        {/* SS */}
        <div className='FAQ'>
          <FontAwesomeIcon icon={faQuestion} size='3x' />
          <h3 className='question'>Can I work in a team?</h3>
          <p className='answer'>
            Yes! We currently have a simple to use Organization ID system that
            allows you to connect with your organization on signup!
          </p>
          <p>
            (currently anyone can join with the ID, admin approval is to be
            added soon)
          </p>
        </div>
      </div>
    </Fragment>
  );
}
