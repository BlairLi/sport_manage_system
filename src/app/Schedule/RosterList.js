

const RosterList = ({ programName, registration = [], onClose }) => {
  const filteredRoster = registration.filter(r =>
    r.program.toLowerCase().includes(programName.toLowerCase())
  );

  return (
    <>
      <tr>
        <th>Booking ID</th>
        <th>Parent Name</th>
        <th>Child Name</th>
        <th>Child Birth</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Program</th>
        <th>Cancel?</th>
      </tr>
      {filteredRoster.map((r, i) => (
        <tr key={`${programName}_dropdownRosterItem_${i}`}>
          <td>{r.bookingID}</td>
          <td>{r.parentName}</td>
          <td>{r.childName}</td>
          <td>{r.childBirth}</td>
          <td>{r.email}</td>
          <td>{r.phone}</td>
          <td>{r.program}</td>
          <td></td>
        </tr>
      ))}
      <tr>
        <td colSpan="8">
          <button className="button is-warning" onClick={onClose}>
            Close Roster
          </button>
        </td>
      </tr>
    </>
  );
};

export default RosterList;
