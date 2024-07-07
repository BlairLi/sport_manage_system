const RosterList = ({ programName, registration = [], onClose }) => {
  console.log("RosterList", programName, registration);
  const filteredRoster = registration.filter(r =>
    r.child1Program.toLowerCase().includes(programName.toLowerCase()) ||
    r.child1Program2.toLowerCase().includes(programName.toLowerCase())
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
          <td>{r.child1Name}</td>
          <td>{r.child1Birth}</td>
          <td>{r.email}</td>
          <td>{r.phone}</td>
          <td>{r.child1Program || r.child1Program2}</td>
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
