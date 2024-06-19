'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from '../Components/ModalSchedule';
import ModalSession from '../Components/ModalSession';
import ModalEditSchedule from '../Components/ModalEditSchedule';
import ModalDelete from '../Components/ModalDelete';
import { useSession } from "next-auth/react";
import { useSchedule, useRegistration } from '../utils/useData';
import ScheduleList from './ScheduleList';

export default function Schedule({ searchParams }) {
    const url = process.env.NEXT_PUBLIC_MONGODB_URL;
    const [isDropdownDataOpen, setIsDropdownDataOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalSessionOpen, setModalSessionOpen] = useState(false);
    const [modalEdit, setModalEdit] = useState(null);
    const [dropdownRosterOpen, setDropdownRosterOpen] = useState(null);
    const [dropdownScheduleOpen, setDropdownScheduleOpen] = useState(null);
    const [filterProgramName, setFilterProgramName] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterLocation, setFilterLocation] = useState('');

    const [schedules, setSchedules] = useState([]);
    const [registrations, setRegistrations] = useState([]);

    const { data: session } = useSession({
        required: true,
        redirectTo: "/api/auth/signin?callbackUrl=/Dashboard",
    });

    const { data: scheduleData, loading: scheduleLoading } = useSchedule(url);
    const { data: registrationData, loading: registrationLoading } = useRegistration(url);


    useEffect(() => {
        if (scheduleLoading || registrationLoading) return;
        setSchedules(scheduleData?.schedule || []);
        setRegistrations(registrationData?.registration || []);
    }, [scheduleData, registrationData, scheduleLoading, registrationLoading]);

    const fetchSechdules = async () => {
        try {
            const response = await axios.get(`${url}/api/getSchedule`);
            setSchedules(response.data.schedule);
        } catch (error) {
            console.error('Error fetching schedules:', error);
        }
    };

    const filteredSchedules = schedules.filter((schedule) =>
        schedule.programName.toLowerCase().includes(filterProgramName.toLowerCase()) &&
        schedule.location.toLowerCase().includes(filterLocation.toLowerCase()) &&
        schedule.date.toLowerCase().includes(filterDate.toLowerCase())
    );

    const createSchedule = async (newSchedule) => {
        try {
            const response = await axios.post(`${url}/api/createSchedule`, newSchedule);
            fetchSechdules();
        } catch (error) {
            console.error('Error creating schedule:', error);
            throw error;
        }
    };

    const deleteSchedule = async (id) => {
        try {
            await axios.delete(`${url}/api/deleteSchedule/${id}`);
            fetchSechdules();
        } catch (error) {
            console.error('Error deleting schedule:', error);
            throw error;
        }
    };

    const editSchedule = async (id, updatedSchedule) => {
        try {
            await axios.put(`${url}/api/updateSchedule/${id}`, updatedSchedule);
            fetchSechdules();
        } catch (error) {
            console.error('Error updating schedule:', error);
            throw error;
        } 
    };

    const deleteSession = async (scheudleID, sessionID) => {
        try {
            console.log('deleteSession', scheudleID, sessionID);
            await axios.delete(`${url}/api/deleteSession/${scheudleID}/${sessionID}`);
            fetchSechdules();
        } catch (error) {
            console.error('Error deleting session:', error);
            throw error;
        }
    };

    const fetchTotalDuration = async (personName) => {
        try {
            const response = await axios.get(`${url}/api/getPersonSessionsDuration`, {
                params: { personName },
            });
            return response.data.success ? response.data.totalDuration : 0;
        } catch (error) {
            console.error('Error fetching total duration:', error);
            return 0;
        }
    };

    const addSession = async (newSession) => {
        try {
            await axios.post(`${url}/api/addSession/${dropdownScheduleOpen}`, newSession);
            fetchSechdules();
        } catch (error) {
            console.error('Error adding session:', error);
            throw error;
        }
    };

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
                                    className="input column"
                                    type="text"
                                    placeholder="Filter by Program Name"
                                    value={filterProgramName}
                                    onChange={(e) => setFilterProgramName(e.target.value)}
                                />
                                <input
                                    className="input column"
                                    type="text"
                                    placeholder="Filter by Location"
                                    value={filterLocation}
                                    onChange={(e) => setFilterLocation(e.target.value)}
                                />
                                <div
                                    className={`dropdown ${isDropdownDataOpen && "is-active"}`}
                                    onClick={() => setIsDropdownDataOpen(!isDropdownDataOpen)}
                                >
                                    <div className="dropdown-trigger">
                                        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                                            <span>{filterDate !== '' ? filterDate : 'Filter by Date'}</span>
                                            <span className="icon is-small">
                                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                                            </span>
                                        </button>
                                    </div>
                                    <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                                        <div className="dropdown-content">
                                            <a href="#" className="dropdown-item" onClick={() => setFilterDate('')}>Filter by Date</a>
                                            <a href="#" className="dropdown-item" onClick={() => setFilterDate('Monday')}>Monday</a>
                                            <a href="#" className="dropdown-item" onClick={() => setFilterDate('Tuesday')}>Tuesday</a>
                                            <a href="#" className="dropdown-item" onClick={() => setFilterDate('Wednesday')}>Wednesday</a>
                                            <a href="#" className="dropdown-item" onClick={() => setFilterDate('Thursday')}>Thursday</a>
                                            <a href="#" className="dropdown-item" onClick={() => setFilterDate('Friday')}>Friday</a>
                                            <a href="#" className="dropdown-item" onClick={() => setFilterDate('Saturday')}>Saturday</a>
                                            <a href="#" className="dropdown-item" onClick={() => setFilterDate('Sunday')}>Sunday</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="column" />
                                <button className="button column is-warning is-rounded is-small p-1" onClick={resetFilters}>Reset</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="level-right">
                    <p className="level-item">
                        <a className="button is-link" onClick={() => setModalOpen(true)}>New Schedule</a>
                    </p>
                </div>
            </div>

            {modalOpen && <Modal closeModal={() => setModalOpen(false)} handleCreateSchedule={createSchedule} />}

            <section className="section">
                {filteredSchedules.length > 0 ? (
                    <ScheduleList
                        schedules={schedules}
                        filteredSchedules={filteredSchedules}
                        registration={registrations}
                        onDelete={deleteSchedule}
                        onEdit={setModalEdit}
                        onOpenRoster={setDropdownRosterOpen}
                        onOpenSchedule={setDropdownScheduleOpen}
                        onCloseRoster={() => setDropdownRosterOpen(null)}
                        onCloseSchedule={() => setDropdownScheduleOpen(null)}
                        openRosterId={dropdownRosterOpen}
                        openScheduleId={dropdownScheduleOpen}
                        onAddSession={() => setModalSessionOpen(true)}
                        onDeleteSession={deleteSession}
                    />
                ) : (
                    <div>There is nothing here</div>
                )}
            </section>
            {modalSessionOpen && (
                <ModalSession
                    closeModal={() => setModalSessionOpen(false)}
                    handleCreateSession={addSession}
                />
            )}
            {modalEdit && (
                <ModalEditSchedule
                    scheduleID={modalEdit}
                    closeModal={() => setModalEdit(null)}
                    handleCreateSchedule={editSchedule}
                />  
            )}

        </>
    );
}
