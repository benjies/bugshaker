import React, { useRef } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';
import { ref, onValue, update } from '@firebase/database';

export default function DashboardEditBug({ setEditBug }) {
  const { currentUser } = useAuth();
  const bugIDRef = useRef();
  const bugStatusRef = useRef();
  const bugUserRef = useRef();

  //   Close Box
  const closeBox = () => {
    setEditBug(false);
  };
  //   Create new Bug in System
  const createEditBug = (e) => {
    e.preventDefault();
    // Edit Bug
    let instanceBug = ref(
      db,
      `orgs/${currentUser.photoURL}/bugs/${bugIDRef.current.value}`
    );
    if (bugIDRef.current.value > 999) {
      onValue(instanceBug, (snapshot) => {
        if (snapshot.exists()) {
          update(
            ref(
              db,
              `orgs/${currentUser.photoURL}/bugs/${bugIDRef.current.value}`
            ),
            {
              status: bugStatusRef.current.value,
              updatedBy: bugUserRef.current.value,
            }
          );
          setEditBug(false);
        } else {
          // display error
          return setEditBug(false);
        }
      });
    } else {
      setEditBug(false);
    }
  };

  return (
    <div className='submitNewBug'>
      <form className='newBugForm'>
        <p className='closeBox' onClick={closeBox}>
          X
        </p>
        <label htmlFor='bugName'>Bug ID</label>
        <input type='number' max='9999' ref={bugIDRef} required />
        <label htmlFor='bugStatus'>Status</label>
        <select ref={bugStatusRef} required>
          <option defaultValue='OPEN'>OPEN</option>
          <option value='CRITICAL'>CRITICAL</option>
          <option value='CLOSED'>CLOSED</option>
        </select>
        <label htmlFor='bugUser'>Updated By</label>
        <input
          type='text'
          className='lockedInput'
          ref={bugUserRef}
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
