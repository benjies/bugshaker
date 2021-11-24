import React from 'react';

export default function BugTicket({ bug }) {
  return (
    <div className='bug-ticket' key={bug.id}>
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
