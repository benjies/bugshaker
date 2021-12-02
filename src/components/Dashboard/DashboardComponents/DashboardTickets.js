import React, { useState, useEffect, Fragment } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import EditingBug from './EditingBug';
import BugTicket from './BugTicket';
import { db } from '../../../firebase';
import { ref, onValue } from '@firebase/database';

export default function DashboardTickets({ bugs }) {
  //   const [bugs, setBugs] = useState([]);
  const [flattenBugs, setFlatBugs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditBug, setCurrentEditbug] = useState();
  const [currentComments, setCurrentComments] = useState();
  const { currentUser } = useAuth();

  // Log the Current Bugs Out
  const logBugs = () => {
    let holderArray = [];
    bugs.forEach((bug) => {
      let selectedBug = bug[1];
      let newFlatBug = {
        id: selectedBug.id,
        name: selectedBug.name,
        status: selectedBug.status,
        created: selectedBug.created,
        user: selectedBug.user,
        comments: selectedBug.comments,
      };
      holderArray.push(newFlatBug);
    });
    holderArray.sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    );
    setFlatBugs(holderArray);
  };

  // Comments
  // Create Comments to return
  const createComments = () => {
    if (currentEditBug != undefined) {
      // Bug Comment Location Ref
      const commentLocation = ref(
        db,
        'orgs/' +
          currentUser.photoURL +
          '/bugs/' +
          currentEditBug.id +
          '/comments'
      );
      onValue(commentLocation, (snapshot) => {
        if (snapshot.exists()) {
          onValue(commentLocation, (bug) => {
            let bugComments = Object.entries(bug.val());
            let commentArray = [];

            bugComments.forEach((comment) => {
              commentArray.push(comment[1]);
            });
            commentArray.sort(
              (a, b) =>
                new Date(b.created).getTime() - new Date(a.created).getTime()
            );
            setCurrentComments(commentArray);
            return;
          });
        } else {
          return;
        }
      });
    }
  };

  useEffect(() => {
    logBugs();
    createComments();
  }, [bugs]);

  return (
    <Fragment>
      <div className='dashboardTickets'>
        <div className='ticketDisplayTitles'>
          <p className='bugTitle'>BUG</p>
          <p className='bugStatusTitle'>STATUS</p>
          <p className='bugCreatedTitle'>CREATED</p>
          <p className='bugCreatedByTitle'>USER</p>
        </div>

        {isEditing ? (
          <Fragment>
            <div className='project-tickets'>
              <BugTicket
                bug={currentEditBug}
                key={currentEditBug.id}
                setCurrentComments={setCurrentComments}
                setIsEditing={setIsEditing}
                setCurrentEditbug={setCurrentEditbug}
              />
              <EditingBug
                setIsEditing={setIsEditing}
                setCurrentEditbug={setCurrentEditbug}
                currentComments={currentComments}
                currentEditBug={currentEditBug}
                setCurrentComments={setCurrentComments}
              />
            </div>
          </Fragment>
        ) : (
          <div className='project-tickets'>
            {flattenBugs &&
              flattenBugs.map((bug) => (
                <BugTicket
                  bug={bug}
                  key={bug.id}
                  setIsEditing={setIsEditing}
                  setCurrentEditbug={setCurrentEditbug}
                  setCurrentComments={setCurrentComments}
                />
              ))}
          </div>
        )}
      </div>
    </Fragment>
  );
}
