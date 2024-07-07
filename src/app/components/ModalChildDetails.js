
const ChildDetailModal = ({ isOpen, closeModal, child }) => {
  if (!isOpen || !child) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Child Details</p>
          <button className="delete" aria-label="close" onClick={closeModal}></button>
        </header>
        <section className="modal-card-body">
          <p><strong>Name:</strong> {child.name}</p>
          <p><strong>Birth:</strong> {child.birth}</p>
          <p><strong>Program 1:</strong> {child.program}</p>
          <p><strong>Amount 1:</strong> {child.amount}</p>
          <p><strong>Start 1:</strong> {child.start}</p>
          <p><strong>End 1:</strong> {child.end}</p>
          <p><strong>Program 2:</strong> {child.program2 ? child.program2 : "not selected"}</p>
          <p><strong>Amount 2:</strong> {child.amount2 ? child.amount2 : 0}</p>
          <p><strong>Start 2:</strong> {child.start2 ? child.start2 : "not selected"}</p>
          <p><strong>End 2:</strong> {child.end2 ? child.end2 : "not selected"}</p>
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={closeModal}>Close</button>
        </footer>
      </div>
    </div>
  );
};

export default ChildDetailModal;
