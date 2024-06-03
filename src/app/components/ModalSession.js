export default function ModalSession({ closeModal, handleCreateSession }) {
    // TODO: use Session Schema to update the following
    const session = ["sessionID","startTime", "endTime", "location", "lead", "assistant1", "assistant2"];

    const onSessionSubmitted = async (e) => {
        e.preventDefault();
        const newSession = {
            sessionID: e.target.sessionID.value,
            startTime: e.target.startTime.value,
            endTime: e.target.endTime.value,
            location: e.target.location.value,
            lead: e.target.lead.value,
            assistant1: e.target.assistant1.value,
            assistant2: e.target.assistant2.value
        };

        console.log("newSession created: ", newSession);
        await handleCreateSession(newSession);
        closeModal();
    }

    return (
        <>
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                    <p className="modal-card-title">Create Session</p>
                    <button className="delete" aria-label="close" onClick={closeModal}></button>
                    </header>
                    <form onSubmit={(e) => onSessionSubmitted(e)}>
                        <section className="modal-card-body">
                                {session.map((item, index) => {
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