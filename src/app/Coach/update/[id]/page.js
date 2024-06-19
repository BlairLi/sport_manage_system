'use client'

/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";


function UpdateUser() {
    const { id } = useParams();
    const [name, setName] = useState("User");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    
    const router = useRouter();
    const url = process.env.MONGODB_URL;
    
    useEffect(() => {
        console.log("id", id);
    }, [id]);

    useEffect(() => {
        axios.get(`${url}/getUser/${id}`)
            .then((result) => {
                console.log(result);
                setName(result.data.name || "");
                setLocation(result.data.location || "");
                setEmail(result.data.email || "");
                setPhone(result.data.phone || "");
                setGender(result.data.gender || "");
            })
            .catch((err) => console.log(err));
    }, [id]);
    
    const Update = (e) => {
        e.preventDefault();
        axios
            .put(`${url}/updateUser/` + id, {
                name,
                location,
                email,
                phone,
                gender, // Include gender in the update request
            })
            .then((result) => {
                console.log(result);
                window.alert("User updated successfully!");
                router.push("/Coach");
            })
            .catch((err) => {
                console.error(err);
                window.alert("Failed to update user!");
            });
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Update}>
                    <h2>Update Coach</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Location</label>
                        <input type="text" placeholder="Enter Location" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Enter Email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Phone</label>
                        <input type="number" placeholder="Enter Phone" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Gender</label>
                        <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">Update</button>
                    <button herf="/Coach" className="btn btn-secondary mx-2">Back</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;