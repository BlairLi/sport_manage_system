'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from '../Components/ModalRegistration';
import ModalCancelBooking from '../Components/ModalCancelBooking';
import { useSession } from "next-auth/react";
import AuthProvider from "../Context/AuthProvider";
import ModalChildDetails from '../Components/ModalChildDetails';

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
    const [childModalOpen, setChildModalOpen] = useState(false);
    const [selectedChild, setSelectedChild] = useState(null);
    
    const filteredProducts = registration.filter((r) =>
        // TODO: add amount filter && child1Name child2Name filter
        r.child1Amount.toString().includes(filterAmount.toString()) &&
        // (r.child1Amount2?.toString() || '').includes(filterAmount.toString()) &&
        r.email.toLowerCase().includes(filterEmail.toLowerCase()) &&
        r.phone.toString().includes(filterPhone.toString()) &&
        r.parentName.toLowerCase().includes(filterParentName.toLowerCase()) &&
        // r.child1Name.toLowerCase().includes(filterChildName.toLowerCase()) &&
        (r.child1Name?.toLowerCase() || '').includes(filterChildName.toLowerCase()) &&
        (r.child2Name?.toLowerCase() || '').includes(filterChildName.toLowerCase())
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

    const openChildModal = (child) => {
        setSelectedChild(child);
        setChildModalOpen(true);
      }
    
      const closeChildModal = () => {
        setChildModalOpen(false);
        setSelectedChild(null);
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

                <ModalChildDetails isOpen={childModalOpen} closeModal={closeChildModal} child={selectedChild} />

                <section className="section">
                    {registration ? 
                    <table className="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Parent Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>First Child</th>
                                <th>Second Child</th>
                                {/* <th>Child Name</th>
                                <th>Child Birth</th>
                                <th>Program</th>
                                <th>Amount</th>
                                <th>Start</th>
                                <th>End</th> */}
                                {/* <th>Child Name</th>
                                <th>Child Birth</th>
                                <th>Program</th>
                                <th>Amount</th>
                                <th>Start</th>
                                <th>End</th> */}
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
                                        <td>{r.email}</td>
                                        <td>{r.phone}</td>
                                        <td>
                                            <a onClick={() => openChildModal({ 
                                                name: r.child1Name,
                                                birth: r.child1Birth,
                                                program: r.child1Program,
                                                amount: r.child1Amount,
                                                start: r.child1Start,
                                                end: r.child1End,
                                                program2: r.child1Program2,
                                                amount2: r.child1Amount2,
                                                start2: r.child1Start2,
                                                end2: r.child1End2
                                            })}>
                                                {r.child1Name}
                                            </a>
                                        </td>
                                        <td>
                                            <a onClick={() => openChildModal({ 
                                                name: r.child2Name,
                                                birth: r.child2Birth,
                                                program: r.child2Program,
                                                amount: r.child2Amount,
                                                start: r.child2Start,
                                                end: r.child2End,
                                                // TODO: delete the following and make program2... optional
                                                program2: r.child2Program2,
                                                amount2: r.child2Amount2,
                                                start2: r.child2Start2,
                                                end2: r.child2End2
                                            })}>
                                                {r.child2Name}
                                            </a>
                                        </td>
                                        {/* <td>{r.child1Name}</td>
                                        <td>{r.child1Birth}</td>
                                        <td>{r.child1Program}</td>
                                        <td>{r.child1Amount}</td>
                                        <td>{r.child1Start}</td>
                                        <td>{r.child1End}</td> 
                                        <td>{r.child1Program2}</td> 
                                        <td>{r.child1Amount2}</td> 
                                        <td>{r.child1Start2}</td> 
                                        <td>{r.child1End2}</td>
                                        */}
                                        {/* <td>{r.child2Name}</td>
                                        <td>{r.child2Birth}</td>
                                        <td>{r.child2Program}</td>
                                        <td>{r.child2Amount}</td>
                                        <td>{r.child2Start}</td>
                                        <td>{r.child2End}</td> */}
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