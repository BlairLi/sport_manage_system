'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from '../components/ModalRegistration';
import ModalCancelBooking from '../components/ModalCancelBooking';

export default function Registration() {
    const [registration, setRegistration] = useState([]);
    const [modalOpen, setmodalOpen] = useState(false);
    const [subModalOpen, setsubModalOpen] = useState(false);
    const [cancelBookingInfo, setcancelBookingInfo] = useState(null);
    const url = process.env.NEXT_PUBLIC_BACKEND_URL

    useEffect(() => {
        fetchRegistration();
    }, []);

    const fetchRegistration = async () => {
        try {
            const response = await axios.get(`${url}/api/getRegistration`);
            const res_data = response.data;
            console.log('res_data:', res_data);
            setRegistration(res_data.registration);
        } catch (error) {
            console.error(error);
        }
    };

    const createRegistration = async (newRegistration) => {
        try {
            const response = await axios.post(`${url}/api/createRegistration`, newRegistration);
            console.log('Response.data:', response.data);
            fetchRegistration();
        } catch (error) {
            console.error('Error creating Registration:', error);
            throw error;
        }
    }

    const deleteRegistration = (id) => async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/deleteRegistration/${id}`);
            console.log('Deleted Response.data:', response.data);
            fetchRegistration();
        } catch (error) {
            console.error('Error deleting Registration:', error);
            throw error;
        }
    }

    const openModal = () => {
        setmodalOpen(true);
    }

    const closeModal = () => {
        setmodalOpen(false);
    }

    const opensubModal = (info) => {
        setcancelBookingInfo(info);
        setsubModalOpen(true);
    }

    const closesubModal = () => {
        
        setsubModalOpen(false);
    }

    return (
        <>
            <div className="section">
                <div className="title">Registration</div>
            </div>
            <div className="level ml-6 mr-6">
                {/* left side */}
                <div className="level-left">
                    <div className="level-item">
                        <div className="field has-addons">
                            <p className="control">
                                <input className="input" type="text" placeholder="Find a registration" />
                            </p>
                            <p className="control">
                                <button className="button">Search</button>
                            </p>
                        </div>
                    </div>
                </div>

                {/* right side */}
                <div className="level-right">
                    <p className="level-item"><a className="button is-success" onClick={openModal}>New Registration</a></p>
                </div>
            </div>
            
            {modalOpen && <Modal closeModal={closeModal} handleCreateRegistration={createRegistration}  />}

            {subModalOpen && <ModalCancelBooking closeModal={closesubModal} cancelBookingInfo={cancelBookingInfo}/>}


            <section className="section">
                {registration ? 
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Parent Name</th>
                            <th>Child Name</th>
                            <th>Child Birth</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Program</th>
                            <th>Amount</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Makeup Classes</th>
                            <th>Note</th>
                            <th>Delete?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            registration.map((r) => (
                                <tr key={r._id} onClick={() => opensubModal(r)}>
                                    <td>{r.bookingID}</td>
                                    <td>{r.parentName}</td>
                                    <td>{r.childName}</td>
                                    <td>{r.childBirth}</td>
                                    <td>{r.email}</td>
                                    <td>{r.phone}</td>
                                    <td>{r.program}</td>
                                    <td>{r.amount}</td>
                                    <td>{r.start}</td>
                                    <td>{r.end}</td>
                                    <td>{r.makeupClasses}</td>
                                    <td>{r.note}</td>
                                    <td>
                                        <button className="button is-danger" onClick={deleteRegistration(r._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                : <>There is nothing here</>}
            </section>

        </>
    )
}