'use client';

/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";


function UpdateUserPayroll() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [hour, setHour] = useState("");
    const [hourlyWage, setHourlyWage] = useState("");
    const [totalSalary, setTotalSalary] = useState("");

    const router = useRouter();
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        axios.get(`${url}/getUser/` + id)
            .then((result) => {
                console.log(result);
                setName(result.data.name);
                setLocation(result.data.location);
                setEmail(result.data.email);
                setPhone(result.data.phone);
                setHour(result.data.hour);
                setHourlyWage(result.data.hourlyWage);
                setTotalSalary(result.data.totalSalary);
            })
            .catch((err) => console.log(err));
    }, [id]);

    useEffect(() => {
        const calculateTotalSalary = () => {
            const total = parseFloat(hour) * parseFloat(hourlyWage);
            setTotalSalary(total.toFixed(2));
        };

        calculateTotalSalary();
    }, [hour, hourlyWage]);

    const Update = (e) => {
        e.preventDefault();
        axios.get(`${url}/api/getPersonSessionsDuration`, {
            params: {
              personName: name
            }
          })
          .then(response => {
            if (response.data.success) {
              setHour(response.data.totalDuration);
              console.log(`Total duration for ${name}: ${response.data.totalDuration} hours`);
            } else {
              console.error(`Error: ${response.data.message}`);
            }
          })
          .catch(error => {
            console.error('Error:', error);
        });
        axios.put(`${url}/updateUser/` + id, {
            name,
            location,
            email,
            phone,
            hour,
            hourlyWage,
            totalSalary,
        })
            .then((result) => {
                console.log(result);
                router.push("/Payroll");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center" >
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Update}>
                    <h2>Update User</h2>
                    {/* <div className="mb-2">
                        <label htmlFor="">Hour</label>
                        <input type="number" placeholder="Enter Hour" className="form-control" required
                            value={hour} onChange={(e) => setHour(e.target.value)} />
                    </div> */}
                    <div className="mb-2">
                        <label htmlFor="">Hourly Wage</label>
                        <input type="number" placeholder="Enter Hourly Wage" className="form-control" required
                            value={hourlyWage} onChange={(e) => setHourlyWage(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Total Salary</label>
                        <input type="text" placeholder="Enter Total Salary" className="form-control" required readOnly
                            value={totalSalary} onChange={(e) => setTotalSalary(e.target.value)} />
                    </div>
                    <button className="button btn-success">Update</button>
                    <a to="/Payroll" className="button btn-secondary mx-2">Back</a>
                </form>
            </div>
        </div>
    );
}

export default UpdateUserPayroll;
