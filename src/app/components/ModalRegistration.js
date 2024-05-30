export default function Modal({ closeModal, handleCreateRegistration }) {
    // use Registration Schema to update the following
    const registration = ["bookingID", "parentName", "childName", "childBirth", "email", "phone", "program", "amount", "start", "end", "makeupClasses", "notes"];

    const onRegistrationSubmitted = async (e) => {
        e.preventDefault();
        const newRegistration = {
            bookingID: e.target.bookingID.value,
            parentName: e.target.parentName.value,
            childName: e.target.childName.value,
            childBirth: e.target.childBirth.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            program: e.target.program.value,
            amount: e.target.amount.value,
            start: e.target.start.value,
            end: e.target.end.value,
            makeupClasses: e.target.makeupClasses.value,
            notes: e.target.notes.value
        };

        console.log("newRegistration created: ", newRegistration);
        await handleCreateRegistration(newRegistration);
        closeModal();
    }

    return (
        <>
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                    <p className="modal-card-title">Create Registration</p>
                    <button className="delete" aria-label="close" onClick={closeModal}></button>
                    </header>
                    <form onSubmit={(e) => onRegistrationSubmitted(e)}>
                        <section className="modal-card-body">
                                {registration.map((item, index) => {
                                    return (
                                        <div className="field" key={index}>
                                            <label className="label">{item}</label>
                                            <div className="control">
                                                <input className="input" type="text" name={item}/>
                                            </div>
                                        </div>
                                    );
                                })}
                        </section>
                        <footer className="modal-card-foot">
                        <div className="buttons">
                            <button type="submit" className="button is-success">Create</button>
                            <button className="button" onClick={closeModal}>Cancel</button>
                        </div>
                        </footer>
                    </form>
                </div>
            </div>
        </>


    );
}