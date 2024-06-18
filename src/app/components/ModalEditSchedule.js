export default function ModalEditSchedule({ scheduleID ,closeModal, handleCreateSchedule }) {
    // use Schedule Schema to update the following
    const schedule = [ "location", "startDay", "date", "nextSession", "confirmed", "capacity", "notes"];

    const onScheduleSubmitted = async (e) => {
        e.preventDefault();
        const newSchedule = {
            location: e.target.location.value,
            startDay: e.target.startDay.value,
            date: e.target.date.value,
            nextSession: e.target.nextSession.value,
            confirmed: e.target.confirmed.value,
            capacity: e.target.capacity.value,
            notes: e.target.notes.value,
        };

        console.log("Schedule Edited: ", newSchedule);
        await handleCreateSchedule(scheduleID, newSchedule);
        closeModal();
    }

    return (
        <>
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                    <p className="modal-card-title">Create Schedule</p>
                    <button className="delete" aria-label="close" onClick={closeModal}></button>
                    </header>
                    <form onSubmit={(e) => onScheduleSubmitted(e)}>
                        <section className="modal-card-body">
                                {schedule.map((item, index) => {
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
                            <button type="submit" className="button is-link">Update</button>
                            <button className="button" onClick={closeModal}>Cancel</button>
                        </div>
                        </footer>
                    </form>
                </div>
            </div>
        </>


    );
}