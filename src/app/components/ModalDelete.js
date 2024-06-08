export default function Modal({ closeModal, handleDelete }) {

    const onDelete = () => {
        handleDelete();
        closeModal();
    }

    return (
        <>
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                    <p className="modal-card-title">Delete</p>
                    <button className="delete" aria-label="close" onClick={closeModal}></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="content">
                            <p>Are you sure you want to delete this registration?</p>
                        </div>
                    </section>
                    <footer classNa me="modal-card-foot">
                        <div className="buttons">
                            <button type="submit" className="button is-success" onClick={onDelete}>Create</button>
                            <button className="button" onClick={closeModal}>Cancel</button>
                        </div>
                    </footer>
                </div>
            </div>
        </>


    );
}