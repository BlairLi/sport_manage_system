import React from 'react';
import RosterList from './RosterList';
import SessionList from './SessionList';

const ScheduleList = ({
  schedules,
  filteredSchedules,
  registration,
  onDelete,
  onEdit,
  onOpenRoster,
  onOpenSchedule,
  onCloseRoster,
  onCloseSchedule,
  openRosterId,
  openScheduleId,
  onDeleteSession,
}) => (
  <table className="table is-fullwidth">
    <thead>
      <tr>
        <th>Sr. No.</th>
        <th>Location</th>
        <th>Program Name</th>
        <th>Program ID</th>
        <th>Start Day</th>
        <th>Date</th>
        <th>Next Session</th>
        <th>Confirmed</th>
        <th>Capacity</th>
        <th>Note</th>
        <th>Selection</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredSchedules.map(s => (
        <React.Fragment key={s._id}>
          <tr>
            <td>{s.SrNo}</td>
            <td>{s.location}</td>
            <td>{s.programName}</td>
            <td>{s.programID}</td>
            <td>{s.startDay}</td>
            <td>{s.date}</td>
            <td>{s.nextSession}</td>
            <td>{s.confirmed}</td>
            <td>{s.capacity}</td>
            <td>{s.notes}</td>
            <td>
              <a onClick={() => onOpenRoster(s._id)}>Roster</a>
              <div> </div>
              <a onClick={() => onOpenSchedule(s._id)}>Schedule</a>
            </td>
            <td>
              <button className="button is-primary is-small" onClick={() => onEdit(s._id)}>
                Edit
              </button>
              <div></div>
              <button className="button is-danger is-small" onClick={() => onDelete(s._id)}>
                Delete
              </button>
            </td>
          </tr>

          {openRosterId === s._id && (
            <RosterList
              programName={s.programName}
              registration={registration}
              onClose={() => onCloseRoster()}
            />
          )}

          {openScheduleId === s._id && (
            <SessionList
              scheduleID={s._id}
              sessions={s.session}
              onDeleteSession={onDeleteSession}
              onClose={() => onCloseSchedule()}
              onAddSession={onAddSession}
            />
          )}
        </React.Fragment>
      ))}
    </tbody>
  </table>
);

export default ScheduleList;
