import React, { useState, useEffect } from 'react';
import BugTicket from './BugTicket';

export default function DashboardTickets({ bugs }) {
  //   const [bugs, setBugs] = useState([]);
  const [flattenBugs, setFlatBugs] = useState([]);

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
      };
      holderArray.push(newFlatBug);
    });
    holderArray.sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    );
    setFlatBugs(holderArray);
  };
  // Change Bug status by clicking on Status
  // const changeBugStatus = (e) => {};

  useEffect(() => {
    logBugs();
  }, [bugs]);

  return (
    <div className='dashboardTickets'>
      <div className='ticketDisplayTitles'>
        <p className='bugTitle'>BUG</p>
        <p className='bugStatusTitle'>STATUS</p>
        <p className='bugCreatedTitle'>CREATED</p>
        <p className='bugCreatedByTitle'>USER</p>
      </div>

      {/* Project Tickets */}
      {/* MAKE A NEW COMPONENT AND PASS PROJECT NAME AND ARRAY OF BUGS */}
      <div className='project-tickets'>
        {/* <h3>PROJECT NAME</h3> */}
        {flattenBugs &&
          flattenBugs.map((bug) => <BugTicket bug={bug} key={bug.id} />)}
      </div>
    </div>
  );
}
