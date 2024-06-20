'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from '../Components/ModalRegistration';
import ModalCancelBooking from '../Components/ModalCancelBooking';
import { useSession } from "next-auth/react";
import AuthProvider from "../Context/AuthProvider";


// TODO amount, email, phone, parentName, childName

export default function Registration() {
    const [registration, setRegistration] = useState([]);
    const [modalOpen, setmodalOpen] = useState(false);
    const [subModalOpen, setsubModalOpen] = useState(false);
    const [cancelBookingInfo, setcancelBookingInfo] = useState(null);
    const [filterAmount, setFilterAmount] = useState('');
    const [filterEmail, setFilterEmail] = useState('');
    const [filterPhone, setFilterPhone] = useState('');
    const [filterParentName, setFilterParentName] = useState('');
    const [filterChildName, setFilterChildName] = useState('');
    const filteredProducts = registration.filter((registration) =>
        registration.amount.toString().includes(filterAmount.toString()) &&
        registration.email.toLowerCase().includes(filterEmail.toLowerCase()) &&
        registration.phone.toString().includes(filterPhone.toString()) &&
        registration.parentName.toLowerCase().includes(filterParentName.toLowerCase()) &&
        registration.childName.toLowerCase().includes(filterChildName.toLowerCase())
    );

    const url = process.env.NEXT_PUBLIC_MONGODB_URL

    const {data: session} = useSession({
        required: true,
        redirectTo: "/api/auth/signin?callbackUrl=/Dashboard",
    });

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
            const response = await axios.delete(`${url}/api/deleteRegistration/${id}`);
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

    const resetFilters = () => {
        setFilterAmount('');
        setFilterEmail('');
        setFilterPhone('');
        setFilterParentName('');
        setFilterChildName('');
      };

    return (
        <>  
            <AuthProvider>
                <div className="section">
                    <div className="title">Registration</div>
                </div>
                <div className="level ml-6 mr-6">
                    {/* left side */}
                    <div className="level-left">
                        <div className="level-item">
                            <div className="field has-addons">
                                <div className="control columns">
                                    <input
                                        className='input column'
                                        type="text"
                                        placeholder="Filter by Amount"
                                        value={filterAmount}
                                        onChange={(e) => setFilterAmount(e.target.value)}
                                    />
                                    <input
                                        className='input column'
                                        type="text"
                                        placeholder="Filter by Email"
                                        value={filterEmail}
                                        onChange={(e) => setFilterEmail(e.target.value)}
                                    />
                                    <input
                                        className='input column'
                                        type="text"
                                        placeholder="Filter by Phone"
                                        value={filterPhone}
                                        onChange={(e) => setFilterPhone(e.target.value)}
                                    />
                                    <input
                                        className='input column'
                                        type="text"
                                        placeholder="Filter by Parent Name"
                                        value={filterParentName}
                                        onChange={(e) => setFilterParentName(e.target.value)}
                                    />
                                    <input
                                        className='input column'
                                        type="text"
                                        placeholder="Filter by Child Name"
                                        value={filterChildName}
                                        onChange={(e) => setFilterChildName(e.target.value)}
                                    />
                                    <div className="column"/>
                                    <button className='button column is-warning is-small is-rounded p-1' onClick={resetFilters}>Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* right side */}
                    <div className="level-right">
                        <p className="level-item"><a className="button is-link" onClick={openModal}>New Registration</a></p>
                    </div>
                </div>
                
                {modalOpen && <Modal closeModal={closeModal} handleCreateRegistration={createRegistration}  />}

                {/* TODO add export to csv (later is fine)*/}
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
                                <th>Cancel?</th>
                                <th>Delete?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredProducts.map((r) => (
                                    // <tr key={r._id} onClick={() => opensubModal(r)}>
                                    <tr key={r._id}>
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
                                            <button className="button is-link" onClick={() => opensubModal(r)}>
                                                Cancel
                                            </button>
                                        </td>
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
            </AuthProvider>
        </>
    )
}