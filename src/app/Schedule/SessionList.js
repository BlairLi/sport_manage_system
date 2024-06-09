
import dayjs from 'dayjs';

const SessionList = ({ scheduleID, sessions, onClose, onAddSession, onDeleteSession }) => (
  <>
    <tr>
      <td colSpan="12">
        <button className="button is-primary" onClick={onAddSession}>Create Session</button>
      </td>
    </tr>
    <tr>
      <th>Session</th>
      <th>Start</th>
      <th>End</th>
      <th>Duration</th>
      <th>Location</th>
      <th>Lead</th>
      <th>Assistant1</th>
      <th>Assistant2</th>
      <th>Notes</th>
      <th>Delete?</th>
    </tr>
    {sessions.map((s, i) => (
      <tr key={`${s._id}_dropdownScheduleItem_${i}`}>
        <td>{s.sessionID}</td>
        <td>{dayjs(s.startTime).format('MMMM D, YYYY h:mm A')}</td>
        <td>{dayjs(s.endTime).format('MMMM D, YYYY h:mm A')}</td>
        <td>{s.duration} hour(s)</td>
        <td>{s.location}</td>
        <td>{s.lead}</td>
        <td>{s.assistant1}</td>
        <td>{s.assistant2}</td>
        <td></td>
        <td>
              <button className="button is-danger" onClick={() => {onDeleteSession(scheduleID, s._id)}}>
                Delete
              </button>
            </td>
      </tr>
    ))}
    <tr>
      <td colSpan="12">
        <button className="button is-warning" onClick={onClose}>
          Close Schedule
        </button>
      </td>
    </tr>
  </>
);

export default SessionList;
