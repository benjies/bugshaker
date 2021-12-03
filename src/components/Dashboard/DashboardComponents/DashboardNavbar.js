import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';
import { ref, onValue } from '@firebase/database';
// import { useNavigate } from 'react-router';

export default function DashboardNavbar() {
  const [dashNav, setDashNav] = useState(true);
  // Current User
  const { currentUser, logout } = useAuth();
  //   const history = useNavigate();
  const [users, setUsers] = useState([]);
  const [flattenUsers, setFlatUsers] = useState([]);
  // Read Bugs
  const currentUsers = ref(db, 'orgs/' + currentUser.photoURL + '/users');
  //   const currentBugs = ref(db, 'users/' + currentUser.uid + '/bug');

  const logUsers = () => {
    let holderArray = [];
    users.forEach((user) => {
      let selectedUser = user[1];
      let newFlatUser = {
        name: selectedUser.displayName,
      };
      holderArray.push(newFlatUser);
    });
    setFlatUsers(holderArray);
  };

  useEffect(() => {
    if (currentUsers) {
      onValue(currentUsers, (user) => {
        setUsers(Object.entries(user.val()));
      });
      logUsers();
    } else {
      return;
    }
  }, []);

  return (
    <div className='dashboardNavbar'>
      <div className='dashNavLogo'>
        <FontAwesomeIcon icon={faBug} size='lg' />
        <h1>bugshaker</h1>
      </div>
      <div className='dashNavDisplayBTN'>
        <p className='dashNavlogout' onClick={() => logout()}>
          Logout
        </p>
      </div>
      <div className='dashNavOptions'>
        {/* Wrap 1 */}
        <div className='myspaceWrap'>
          <p className='my-space' onClick={() => setDashNav(true)}>
            My Space
          </p>
          {dashNav && <div className='active-block'></div>}
        </div>
        {/* Wrap 2 */}
        <div className='allusersWrap'>
          <p
            className='all-users'
            onClick={() => {
              setDashNav(false);
              logUsers();
            }}
          >
            All Users
          </p>
          {!dashNav && <div className='active-block'></div>}
        </div>
      </div>
      <div className='active-line'></div>
      {dashNav && (
        <div className='dashNavLinks'>
          {/* <div className='flexDashLink'>
            <FontAwesomeIcon icon={faProjectDiagram} size='lg' />
            <p>Projects</p>
          </div> */}
          <div className='flexDashLink'>
            <FontAwesomeIcon icon={faBug} size='lg' />
            <p>Bugs</p>
          </div>
          {/* <div className='flexDashLink'>
            <FontAwesomeIcon icon={faClock} size='lg' />
            <p>Timeline</p>
          </div> */}
          <div className='flexDashLink'>
            <FontAwesomeIcon icon={faSignOutAlt} size='lg' />
            <p onClick={() => logout()}>Logout</p>
          </div>
        </div>
      )}
      {!dashNav && (
        <div className='dashNavLinks'>
          <div className='flexDashUser'>
            {flattenUsers.map((user, i) => (
              <p className='orgUser' key={user.name + i}>
                {user.name}
              </p>
            ))}
          </div>
        </div>
      )}
      <p className='username'>{currentUser.displayName}</p>
    </div>
  );
}
