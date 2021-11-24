import React, { Fragment, useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardMain from './DashboardComponents/DashboardMain';
import DashboardNavbar from './DashboardComponents/DashboardNavbar';
import DashboardOverview from './DashboardComponents/DashboardOverview';
import DashboardTickets from './DashboardComponents/DashboardTickets';
import { db } from '../../firebase';
import { ref, onValue, set } from '@firebase/database';

export default function UserDashboard() {
  // Current User
  const { currentUser } = useAuth();
  const [error, setError] = useState('');
  const [bugs, setBugs] = useState([]);

  // Read Bugs
  const currentBugs = ref(db, 'orgs/' + currentUser.photoURL + '/bugs');

  //   Keep User in Right ORG
  const updateAccountOnLog = () => {
    set(ref(db, 'orgs/' + currentUser.photoURL + '/users/' + currentUser.uid), {
      displayName: currentUser.displayName,
      email: currentUser.email,
    });
  };

  useEffect(() => {
    updateAccountOnLog();
    onValue(currentBugs, (snapshot) => {
      if (snapshot.exists()) {
        onValue(currentBugs, (bug) => {
          setBugs(Object.entries(bug.val()));
        });
      } else {
        return;
      }
    });
  }, []);

  return (
    <Fragment>
      <div className='dashboardContainer'>
        <DashboardNavbar />
        <DashboardMain />
        <DashboardOverview bugs={bugs} />
        <DashboardTickets bugs={bugs} />
      </div>
    </Fragment>
  );
}
