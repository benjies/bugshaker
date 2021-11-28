import React, { useRef } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';
import { ref, set } from '@firebase/database';

export default function DashboardNewBug({ setNewBug }) {
  const { currentUser } = useAuth();
  const bugNameRef = useRef();
  const bugStatusRef = useRef();
  const bugCreatedRef = useRef();
  const bugUserRef = useRef();

  //   Close Box
  const closeBox = () => {
    setNewBug(false);
  };
  //   Create new Bug in System
  const createNewBug = (e) => {
    e.preventDefault();
    // Create Bug
    let bug = {
      id: Math.floor(1000 + Math.random() * 9000),
      name: bugNameRef.current.value,
      status: bugStatusRef.current.value,
      created: bugCreatedRef.current.value,
      user: bugUserRef.current.value,
    };
    // users/${currentUser.uid}/bug/${bug.id}
    if (bugNameRef.current.value.length > 0) {
      set(ref(db, `orgs/${currentUser.photoURL}/bugs/${bug.id}`), {
        name: bug.name,
        status: bug.status,
        created: bug.created,
        user: bug.user,
        id: bug.id,
      });
      setNewBug(false);
    } else {
      setNewBug(false);
    }
  };

  let curr = new Date();
  curr.setDate(curr.getDate());
  let date = curr.toISOString().substr(0, 10);

  return (
    <div className='submitNewBug submitNewBugADD'>
      <form className='newBugForm'>
        <p className='closeBox' onClick={closeBox}>
          X
        </p>
        <label htmlFor='bugName'>Bug Name</label>
        <input type='text' ref={bugNameRef} required />
        <label htmlFor='bugStatus'>Status</label>
        <select ref={bugStatusRef} required>
          <option defaultValue='OPEN'>OPEN</option>
          <option value='CRITICAL'>CRITICAL</option>
        </select>
        <label htmlFor='bugCreated'>Date Created</label>
        <input
          type='date'
          ref={bugCreatedRef}
          defaultValue={date}
          className='lockedDate'
          required
          disabled
        />
        <label htmlFor='bugUser'>Created By</label>
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
          value='Create Bug'
          onClick={createNewBug}
        ></input>
      </form>
    </div>
  );
}
