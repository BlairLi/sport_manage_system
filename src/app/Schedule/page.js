'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from '../components/ModalSchedule';
import ModalSession from '../components/ModalSession';
import { useSession } from "next-auth/react";


// TODO: Roster and Schedule, Roster should be exportable(later)

export default function Schedule({ searchParams }) {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL
    const [schedule, setSchedule] = useState([]);
    const [registration, setRegistration] = useState([]);
    const [isdropdownDataOpen, setIsdropdownDataOpen] = useState(false);
    const [modalOpen, setmodalOpen] = useState(false);
    const [modalSessionOpen, setmodalSessionOpen] = useState(false);
    const [dropdownRosterOpen, setdropdownRosterOpen] = useState(null);
    const [dropdownScheduleOpen, setdropdownScheduleOpen] = useState(null);
    const [filterProgramName, setFilterProgramName] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterlocation, setFilterLocation] = useState('');

    const {data: session} = useSession({
        required: true,
        redirectTo: "/api/auth/signin?callbackUrl=/Dashboard",
    });

    const filteredProducts = schedule.filter((schedule) =>
        schedule.programName.toLowerCase().includes(filterProgramName.toLowerCase()) &&
        schedule.location.toLowerCase().includes(filterlocation.toLowerCase()) &&
        schedule.date.toLowerCase().includes(filterDate.toLowerCase())
    );

    const filteredRoster = (e) => {
        return registration.filter((registration) =>
        registration.program.toLowerCase().includes(e.toLowerCase()))
    }
    

    useEffect(() => {
        fetchSchedule();
        fetchRegistration();
    }, []);

    const fetchSchedule = async () => {
        try {
            const response = await axios.get(`${url}/api/getSchedule`);
            const res_data = response.data;
            setSchedule(res_data.schedule);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchRegistration = async () => {
        try {
            const response = await axios.get(`${url}/api/getRegistration`);
            const res_data = response.data;
            setRegistration(res_data.registration);
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
            const response = await axios.delete(`${url}/api/deleteSchedule/${id}`);
            console.log('Deleted Response.data:', response.data);
            fetchSchedule();
        } catch (error) {
            console.error('Error deleting schedule:', error);
            throw error;
        }
    }

    const addSession = async (newSession) => {
        try {
            const response = await axios.post(`${url}/api/addSession/${dropdownScheduleOpen}`, newSession);
            console.log('addSession Response.data: ', response.data);
            fetchSchedule();
        } catch (error) {
            console.error('Error adding session:', error);
            throw error;
        }
    }
 
    const resetFilters = () => {
        setFilterProgramName('');
        setFilterLocation('');
        setFilterDate('');
      };

    return (
        <>
            <div className="section">
                <div className="title">Schedule</div>
            </div>
            <div className="level ml-6 mr-6">
                <div className="level-left">
                    <div className="level-item">
                        <div className="field has-addons">
                            <div className="control columns">
                                <input
                                    className='input column'
                                    type="text"
                                    placeholder="Filter by Program Name"
                                    value={filterProgramName}
                                    onChange={(e) => setFilterProgramName(e.target.value)}
                                />
                                <input
                                    className='input column'
                                    type="text"
                                    placeholder="Filter by Location"
                                    value={filterlocation}
                                    onChange={(e) => setFilterLocation(e.target.value)}
                                />
                                {/* <input
                                    className='input column'
                                    type="text"
                                    placeholder="Filter by Date"
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                /> */}
                                <div className={`dropdown ${isdropdownDataOpen && "is-active"}`} onClick={()=>{setIsdropdownDataOpen(!isdropdownDataOpen)}}>
                                    <div className="dropdown-trigger">
                                        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                                        <span>{filterDate != ''? filterDate : 'Filter by Date'}</span>
                                        <span className="icon is-small">
                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                        </button>
                                    </div>
                                    <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                                        <div className="dropdown-content">
                                        <a href="#" className="dropdown-item" onClick={() => setFilterDate('')}>Filter by Date</a>
                                        <a href="#" className="dropdown-item" onClick={() => setFilterDate('Monday')}> Monday </a>
                                        <a href="#" className="dropdown-item" onClick={() => setFilterDate('Tuesday')}> Tuesday </a>
                                        <a href="#" className="dropdown-item" onClick={() => setFilterDate('Wednesday')}> Wednesday </a>
                                        <a href="#" className="dropdown-item" onClick={() => setFilterDate('Thursday')}> Thursday </a>
                                        <a href="#" className="dropdown-item" onClick={() => setFilterDate('Friday')}> Friday </a>
                                        <a href="#" className="dropdown-item" onClick={() => setFilterDate('Staterday')}> Staterday </a>
                                        <a href="#" className="dropdown-item" onClick={() => setFilterDate('Sunday')}> Sunday </a>
                                        </div>
                                    </div>
                                </div>
                                <div className='column'/>
                                <button className='button column is-warning is-rounded is-small p-1' onClick={resetFilters}>Reset</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* right side */}
                <div className="level-right">
                    <p className="level-item"><a className="button is-success" onClick={()=>{setmodalOpen(true)}}>New Schedule</a></p>
                </div>
            </div>
            
            {modalOpen ? <Modal closeModal={()=>{setmodalOpen(false)}} handleCreateSchedule={createSchedule}  /> : <></> }

            <section className="section">

                {schedule.length > 0 ?
                    <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th className='is-info'>Sr. No.</th>
                            <th className='is-info'>Location</th>
                            <th className='is-info'>Program Name</th>
                            <th className='is-info'>Program ID</th>
                            <th className='is-info'>Start Day</th>
                            <th className='is-info'>Date</th>
                            <th className='is-info'>Next Session</th>
                            <th className='is-info'>Confirmed</th>
                            <th className='is-info'>Capacity</th>
                            <th className='is-info'>Note</th>
                            <th className='is-info'>Selection</th>
                            <th className='is-info'>Delete?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((s) => (
                            <>
                                <tr key={s._id}>
                                    <td>{s.SrNo}</td>
                                    <td>{s.location}</td>
                                    <td>{s.programName}</td>
                                    <td>{s.programID}</td>
                                    <td>{s.startDay}</td>
                                    <td>{s.date}</td>
                                    <td>{s.nextSession}</td>
                                    <td>{s.confirmed}</td>
                                    <td>{s.capacity}</td>
                                    <td>{s.notes}</td>
                                    <td>
                                        <a onClick={()=>{
                                            setdropdownRosterOpen(s._id)
                                            }}>
                                            Rooster
                                        </a>
                                        <div> </div>
                                        <a onClick={()=>{
                                            setdropdownScheduleOpen(s._id)
                                            }}>
                                            Schedule
                                        </a>
                                    </td>
                                    <td>
                                        <button className="button is-danger" onClick={deleteSchedule(s._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>

                                {dropdownRosterOpen === s._id && 
                                    <>
                                        <tr key={`${s._id}_dropdownTitle`}>
                                            <th>Booking ID</th>
                                            <th>Parent Name</th>
                                            <th>Child Name</th>
                                            <th>Child Birth</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Program</th>
                                            <th>Cancel?</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                        {filteredRoster(s.programName).map((r) => (
                                            // TODO
                                            <tr key={`${s._id}_dropdownCin`}>
                                                <td>{r.bookingID}</td>
                                                <td>{r.parentName}</td>
                                                <td>{r.childName}</td>
                                                <td>{r.childBirth}</td>
                                                <td>{r.email}</td>
                                                <td>{r.phone}</td>
                                                <td>{r.program}</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="12">
                                                <button className="button is-warning" onClick={() => {setdropdownRosterOpen(null)}}>
                                                    Close Roster
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                }


                                {dropdownScheduleOpen === s._id && 
                                    <>
                                        <></>
                                        {modalSessionOpen && <ModalSession closeModal={()=>{setmodalSessionOpen(false)}} handleCreateSession={addSession}/>
                                        }
                                        <tr>
                                            <td colSpan="12">
                                            <button className="button is-primary" onClick={()=>setmodalSessionOpen(true)}>Create Session</button>
                                            </td>
                                        </tr>
                                        <tr >
                                            <th>Session</th>
                                            <th>Start</th>
                                            <th>End</th>
                                            <th>location</th>
                                            <th>Lead</th>
                                            <th>Assistant1</th>
                                            <th>Assistant2</th>
                                            <th>Notes</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                        {s.session.map((s) => (
                                            <tr>
                                                <td>{s.sessionID}</td>
                                                <td>{s.startTime}</td>
                                                <td>{s.endTime}</td>
                                                <td>{s.location}</td>
                                                <td>{s.lead}</td>
                                                <td>{s.assistant1}</td>
                                                <td>{s.assistant1}</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="12">
                                                <button className="button is-warning" onClick={() => {setdropdownScheduleOpen(null)}}>
                                                    Close Schedule
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                } 
                            </>
                        ))}
                    </tbody>
                </table>
                : <>There is nothing here</>}
            </section>

        </>
    )
}