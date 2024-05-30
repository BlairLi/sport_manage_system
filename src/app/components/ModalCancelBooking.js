import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';

export default function ModalCancelBooking({ closeModal, cancelBookingInfo }) {
    const [value, setValue] = useState(dayjs('2021-01-01'));

    return (
        <>
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                    <p className="modal-card-title">Cancel Booking</p>
                    <button className="delete" aria-label="close" onClick={closeModal}></button>
                    </header>
                    <form onSubmit={(e) => onRegistrationSubmitted(e)}>
                        <section className="modal-card-body">
                            <div>
                                Are you sure you want to cancel the following?
                            </div>
                            <div>
                                Parent Name: 
                                <strong>
                                    {cancelBookingInfo.parentName}
                                </strong>
                            </div>
                            <div>
                                Child Name:
                                <strong>
                                    {cancelBookingInfo.childName}
                                </strong>
                            </div>
                            <div>
                                Current Program: 
                                <strong>
                                    {cancelBookingInfo.program}
                                </strong>
                            </div>
                            <div>
                                Do you want to cancel this booking and enter a reason?
                            </div>
                            <div className='columns'>
                                <div className='column'>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker label="Basic date picker" value={value} onChange={(newval) => setValue(newval)} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                                <div className='column'>
                                    <textarea className="text" placeholder="Enter reason for cancellation"></textarea>
                                </div>
                            </div>
                            {/* <pre> {JSON.stringify(value, null, 2)} </pre> */}
                        </section>
                        <footer className="modal-card-foot">
                        <div className="buttons">
                            <button type="submit" className="button is-success">Confirm</button>
                            <button className="button" onClick={closeModal}>Cancel</button>
                        </div>
                        </footer>
                    </form>
                </div>
            </div>
        </>


    );
}