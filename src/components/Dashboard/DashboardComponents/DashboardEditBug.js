import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';
import { ref, onValue, update } from '@firebase/database';

export default function DashboardEditBug({ setEditBug, bugList }) {
  const { currentUser } = useAuth();
  const bugIDRef = useRef();
  const [bugIDState, setBugIDState] = useState();
  const [bugSTATUSState, setBugSTATUSState] = useState();
  const bugStatusRef = useRef();

  //   Close Box
  const closeBox = () => {
    setEditBug(false);
  };
  //   Create new Bug in System
  const createEditBug = (e) => {
    e.preventDefault();
    setBugIDState(parseInt(bugIDRef.current.value));
    setBugSTATUSState(bugStatusRef.current.value);
    // Edit Bug
    let instanceBug = ref(
      db,
      `orgs/${currentUser.photoURL}/bugs/${bugIDState}`
    );
    try {
      update(instanceBug, {
        status: bugSTATUSState,
        updatedBy: currentUser.displayName,
      }).then(setEditBug(false));
    } catch (error) {
      setEditBug(false);
      console.log(error);
    }
    // This breaks by called itself twice
    // onValue(instanceBug, (snapshot) => {
    //   if (snapshot.exists()) {
    //     update(instanceBug, {
    //       status: bugSTATUSState,
    //       updatedBy: currentUser.displayName,
    //     }).then(setEditBug(false));
    //   } else {
    //     // display error
    //     return setEditBug(false);
    //   }
    // });
  };

  const updateIDRef = () => {
    setBugIDState(parseInt(bugIDRef.current.value));
  };
  const updateSTATUSRef = () => {
    setBugSTATUSState(bugStatusRef.current.value);
  };

  useEffect(() => {
    setBugIDState(parseInt(bugIDRef.current.value));
    setBugSTATUSState(bugStatusRef.current.value);
  }, []);

  return (
    <div className='submitNewBug'>
      <form className='newBugForm'>
        <p className='closeBox' onClick={closeBox}>
          X
        </p>
        <label htmlFor='bugName'>Bug ID</label>
        <select onChange={updateIDRef} ref={bugIDRef} required>
          {bugList &&
            bugList.map((bug) => {
              return (
                <option key={bug.id} value={bug.id}>
                  {bug.id} : {bug.name}
                </option>
              );
            })}
        </select>
        <label htmlFor='bugStatus'>Status</label>
        <select onChange={updateSTATUSRef} ref={bugStatusRef} required>
          <option defaultValue='OPEN' key='OPEN'>
            OPEN
          </option>
          <option value='CRITICAL' key='CRITICAL'>
            CRITICAL
          </option>
          <option value='CLOSED' key='CLOSED'>
            CLOSED
          </option>
        </select>
        <label htmlFor='bugUser'>Updated By</label>
        <input
          type='text'
          className='lockedInput'
          value={currentUser.displayName}
          disabled
          required
        />
        <input
          type='submit'
          className='submitNewBugBTN'
          value='Update Bug'
          onClick={createEditBug}
        ></input>
      </form>
    </div>
  );
}
