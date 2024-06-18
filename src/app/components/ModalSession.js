import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from 'react';

export default function ModalSession({ closeModal, handleCreateSession }) {
    // TODO: use Session Schema to update the following
    // const session = ["sessionID","startTime", "endTime", "location", "lead", "assistant1", "assistant2"];
    const session = ["sessionID", "location", "lead", "assistant1", "assistant2"];
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const onSessionSubmitted = async (e) => {
        e.preventDefault();
        console.log('startTime: ', startTime)
        console.log('endTime: ', endTime)
        const newSession = {
            sessionID: e.target.sessionID.value,
            startTime: startTime,
            endTime: endTime,
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
                            <div className='columns'>
                                <div className="column">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateRangePicker', 'DataRangePicker']}>
                                        <DateTimePicker name='startTime' label="startTime"  onChange={(startTime) => setStartTime(startTime)}/>
                                    </DemoContainer>
                                </LocalizationProvider>
                                </div>
                                <div className="column">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateRangePicker', 'DataRangePicker']}>
                                        <DateTimePicker className='column' name='endTime' label="endTime" onChange={(endTime) => setEndTime(endTime)}/>
                                    </DemoContainer>
                                </LocalizationProvider>
                                </div>
                            </div>
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
                            <button type="submit" className="button is-link">Create</button>
                            <button className="button" onClick={closeModal}>Cancel</button>
                        </div>
                        </footer>
                    </form>
                </div>
            </div>
        </>


    );
}