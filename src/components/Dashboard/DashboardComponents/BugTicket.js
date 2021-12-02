import React from 'react';

export default function BugTicket({
  bug,
  setIsEditing,
  setCurrentEditbug,
  setCurrentComments,
}) {
  // Create Comments to return
  const createComments = () => {
    let bugComments = bug.comments;
    let commentArray = [];

    for (let key in bugComments) {
      commentArray.push(bugComments[key]);
    }
    commentArray.sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    );
    setCurrentComments(commentArray);
  };

  return (
    <div
      className='bug-ticket'
      key={bug.id}
      onClick={() => {
        createComments();
        setCurrentEditbug(bug);
        setIsEditing(true);
      }}
    >
      <p className='bugNumber'>
        #{bug.id} {bug.name}
      </p>
      <p className={'bugStatus ' + bug.status} bugid={bug.id}>
        {bug.status}
      </p>
      <p className='bugDateCreate'>{bug.created}</p>
      <p className='bugCreatedBy'>{bug.user}</p>
    </div>
  );
}
