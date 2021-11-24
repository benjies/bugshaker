import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';
import { ref, onValue, set } from '@firebase/database';

export default function DashboardOverview({ bugs }) {
  const [openCount, setOpenCount] = useState(0);
  const [closedCount, setClosedCount] = useState(0);
  const [criticalCount, setCriticalCount] = useState(0);
  // Read Bugs
  //   const currentBugs = ref(db, 'orgs/' + currentUser.photoURL + '/bugs');

  const logBugsStatus = () => {
    let holderArray = [];
    bugs.forEach((bug) => {
      let selectedBug = bug[1];
      let newFlatBug = {
        status: selectedBug.status,
      };
      holderArray.push(newFlatBug);
    });
    // Calculate Bugs
    let openCounts = 0,
      criticalCounts = 0,
      closedCounts = 0;
    holderArray.forEach((bug) => {
      if (bug.status === 'OPEN') {
        openCounts++;
      } else if (bug.status === 'CRITICAL') {
        criticalCounts++;
      } else if (bug.status === 'CLOSED') {
        closedCounts++;
      } else return;
    });
    setOpenCount(openCounts);
    setCriticalCount(criticalCounts);
    setClosedCount(closedCounts);
  };

  useEffect(() => {
    logBugsStatus();
  }, [bugs]);
  return (
    <div className='dashboardOverview'>
      <h2>Total Overview</h2>
      <div className='bugCounterItems'>
        <div className='counter open'>
          <p>{openCount}</p>
          <p>Open</p>
        </div>
        <div className='counter closed'>
          <p>{closedCount}</p>
          <p>Closed</p>
        </div>
        <div className='counter critical'>
          <p>{criticalCount}</p>
          <p>Critical</p>
        </div>
      </div>
    </div>
  );
}

// Change each counter to {state} and add state for each open, close, critical bug
