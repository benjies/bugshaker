import React, { useState } from 'react';
import DashboardNewBug from './DashboardNewBug';
import DashboardEditBug from './DashboardEditBug';

export default function DashboardMain() {
  const [newBug, setNewBug] = useState(false);
  const [editBug, setEditBug] = useState(false);

  const popUpBug = () => {
    setEditBug(false);
    setNewBug(true);
  };
  const popUpEditBug = () => {
    setNewBug(false);
    setEditBug(true);
  };

  return (
    <div className='dashboardMain'>
      <h2>My Bugs</h2>
      <div className='mainBTNS'>
        <p className='editBugBTN' onClick={popUpEditBug}>
          Edit Bug
        </p>
        <p className='submitBugBTN' onClick={popUpBug}>
          Submit Bug
        </p>
      </div>
      {newBug && <DashboardNewBug setNewBug={setNewBug} />}
      {editBug && <DashboardEditBug setEditBug={setEditBug} />}
    </div>
  );
}
