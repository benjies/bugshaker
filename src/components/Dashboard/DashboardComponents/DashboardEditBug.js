import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';
import { ref, remove, update } from '@firebase/database';

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
    // Attempt to update if fails, catches error
    try {
      update(instanceBug, {
        status: bugSTATUSState,
        updatedBy: currentUser.displayName,
      }).then(setEditBug(false));
    } catch (error) {
      setEditBug(false);
      console.log(error);
    }
  };

  // Delete the selected bug in system
  const deleteEditBug = (e) => {
    e.preventDefault();
    setBugIDState(parseInt(bugIDRef.current.value));
    // Edit Bug
    let instanceBug = ref(
      db,
      `orgs/${currentUser.photoURL}/bugs/${bugIDState}`
    );
    try {
      remove(instanceBug);
      setEditBug(false);
    } catch (error) {
      setEditBug(false);
      console.log(error);
    }
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
        <div className='editBugBTNWrapper'>
          <input
            type='submit'
            className='submitNewBugBTN deleteBTN'
            value='Delete Bug'
            onClick={deleteEditBug}
          ></input>
          <input
            type='submit'
            className='submitNewBugBTN'
            value='Update Bug'
            onClick={createEditBug}
          ></input>
        </div>
      </form>
    </div>
  );
}
