import React, { useState, useEffect } from 'react';
import DashboardNewBug from './DashboardNewBug';
import DashboardEditBug from './DashboardEditBug';

export default function DashboardMain({ bugs }) {
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

  // Generate bug IDS with Name
  //   const [bugs, setBugs] = useState([]);
  const [bugLists, setBugLists] = useState([]);

  // Log the Current Bugs Out
  const createBugList = () => {
    let holderArray = [];
    bugs.forEach((bug) => {
      let selectedBug = bug[1];
      let newFlatBug = {
        id: selectedBug.id,
        name: selectedBug.name,
        created: selectedBug.created,
      };
      holderArray.push(newFlatBug);
    });
    holderArray.sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    );
    setBugLists(holderArray);
  };

  // Update
  useEffect(() => {
    createBugList();
  }, [bugs]);

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
      {editBug && (
        <DashboardEditBug setEditBug={setEditBug} bugList={bugLists} />
      )}
    </div>
  );
}
