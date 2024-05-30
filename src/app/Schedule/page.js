'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from '../components/ModalSchedule';


export default function Schedule({ searchParams }) {
    const [schedule, setSchedule] = useState([]);
    const [modalOpen, setmodalOpen] = useState(false);
    const url = process.env.NEXT_PUBLIC_BACKEND_URL
    const [filter, setFilter] = useState('');

    const filteredProducts = schedule.filter((schedule) =>
        schedule.programName.toLowerCase().includes(filter.toLowerCase())
    );


    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = async () => {
        try {
            const response = await axios.get(`${url}/api/getSchedule`);
            // const response = await axios.get(`http://localhost:8000/api/getSchedule`);
            const res_data = response.data;
            setSchedule(res_data.schedule);
        } catch (error) {
            console.error(error);
        }
    };

    const createSchedule = async (newSchedule) => {
        try {
            const response = await axios.post(`${url}/api/createSchedule`, newSchedule);
            console.log('Response.data:', response.data);
            fetchSchedule();
        } catch (error) {
            console.error('Error creating schedule:', error);
            throw error;
        }
    }

    const deleteSchedule = (id) => async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/deleteSchedule/${id}`);
            console.log('Deleted Response.data:', response.data);
            fetchSchedule();
        } catch (error) {
            console.error('Error deleting schedule:', error);
            throw error;
        }
    }

    const openModal = () => {
        setmodalOpen(true);
    }

    const closeModal = () => {
        setmodalOpen(false);
    }

    // function search(items) {
    //     return items.filter((item) => {
    //  /*
    //  // in here we check if our region is equal to our c state
    //  // if it's equal to then only return the items that match
    //  // if not return All the countries
    //  */
    //     if (item.region == filterParam) {
    //         return searchParam.some((newItem) => {
    //           return (
    //             item[newItem]
    //                 .toString()
    //                 .toLowerCase()
    //                 .indexOf(q.toLowerCase()) > -1
    //                      );
    //                  });
    //              } else if (filterParam == "All") {
    //                  return searchParam.some((newItem) => {
    //                      return (
    //                          item[newItem]
    //                              .toString()
    //                              .toLowerCase()
    //                              .indexOf(q.toLowerCase()) > -1
    //                      );
    //                  });
    //              }
    //          });
    // }
 

    return (
        <>
            <div className="section">
                <div className="title">Schedule</div>
            </div>
            <div className="level ml-6 mr-6">
                {/* left side */}
                <div className="level-left">
                    {/* <div className="level-item">
                    <p className="subtitle is-5"><strong>123</strong> posts</p>
                    </div> */}
                    <div className="level-item">
                        <div className="field has-addons">
                            <p className="control">
                                {/* <input className="input" type="text" placeholder="Find a schedule" /> */}
                                <input
                                    className='input'
                                    type="text"
                                    placeholder="Filter by category"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                            </p>
                            <p className="control">
                                <button className="button">Search</button>
                            </p>
                        </div>
                    </div>
                </div>

                {/* right side */}
                <div className="level-right">
                    <p className="level-item"><a className="button is-success" onClick={openModal}>New Schedule</a></p>
                </div>
            </div>
            
            {modalOpen ? <Modal closeModal={closeModal} handleCreateSchedule={createSchedule}  /> : <></> }

            <section className="section">

                {schedule.length > 0 ?
                    <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Location</th>
                            <th>Program Name</th>
                            <th>Program ID</th>
                            <th>Rating</th>
                            <th>Start Day</th>
                            <th>Next Session</th>
                            <th>Confirmed</th>
                            <th>Last</th>
                            <th>Capacity</th>
                            <th>Session after today</th>
                            <th>Note</th>
                            <th>Delete?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((s) => (
                        // {schedule.map((s) => (
                            <tr key={s._id}>
                                <td>{s.SrNo}</td>
                                <td>{s.location}</td>
                                <td>{s.programName}</td>
                                <td>{s.programID}</td>
                                <td>{s.rating}</td>
                                <td>{s.startDay}</td>
                                <td>{s.nextSession}</td>
                                <td>{s.confirmed}</td>
                                <td>{s.lastNumber}</td>
                                <td>{s.capacity}</td>
                                <td>{s.sessionsAfterToday}</td>
                                <td>{s.notes}</td>
                                <td>
                                    <button className="button is-danger" onClick={deleteSchedule(s._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                : <>There is nothing here</>}
            </section>

        </>
    )
}