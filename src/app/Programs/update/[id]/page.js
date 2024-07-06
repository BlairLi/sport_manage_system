'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";



function UpdateProgram() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [fees, setFees] = useState("");
  const [age, setAge] = useState("");
  const [sport, setSport] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_MONGODB_URL


  useEffect(() => {
    axios.get(`${url}/programs/` + id)
      .then((result) => {
        setName(result.data.name);
        setTime(new Date(result.data.time).toISOString().slice(0, 16)); // Convert Date to string in the required format
        setPlace(result.data.place);
        setFees(result.data.fees);
        setAge(result.data.age);
        setSport(result.data.sport);
        setLocation(result.data.location);
        setGender(result.data.gender);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put(`${url}/programs/` + id, {
        name,
        time,
        place,
        fees,
        age,
        sport,
        location,
        gender,
      })
      .then(() => {
        window.alert("Program updated successfully!");
        router.push("/Programs");
      })
      .catch((err) => {
        console.error(err);
        window.alert("Failed to update program!");
      });
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center" >
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Update}>
          <h2>Update Program</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input type="text" placeholder="Enter Name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label htmlFor="">Time</label>
            <input type="datetime-local" placeholder="Enter Time" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label htmlFor="">Place</label>
            <input type="text" placeholder="Enter Place" className="form-control" value={place} onChange={(e) => setPlace(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label htmlFor="">Fees</label>
            <input type="number" placeholder="Enter Fees" className="form-control" value={fees} onChange={(e) => setFees(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <select className="form-control" required value={age} onChange={(e) => setAge(e.target.value)}>
              <option value="">Select Age Group</option>
              <option value="5-6">5-6</option>
              <option value="7-8">7-8</option>
              <option value="9-10">9-10</option>
              <option value="11-13">11-13</option>
              </select>
          </div>
          <div className="mb-2">
            <label htmlFor="">Sport</label>
            <select className="form-control" required value={sport} onChange={(e) => setSport(e.target.value)}>
              <option value="">Select Sport</option>
              <option value="Basketball">Basketball</option>
              <option value="Soccer">Soccer</option>
              <option value="Baseball">Baseball</option>
              <option value="Basketball Group Academy Training">Basketball Group Academy Training</option>
              <option value="All-Girls Training Academy">All-Girls Training Academy</option>
              <option value="Leadership Retreats">Leadership Retreats</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="">Location</label>
            <select className="form-control" required value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">Select Location</option>
              <option value="Meadowvale">Meadowvale</option>
              <option value="Port Credit">Port Credit</option>
              <option value="Dixie">Dixie</option>
              <option value="Etobicoke">Etobicoke</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="">Gender</label>
            <select className="form-control" required value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Girls">Girls</option>
              <option value="CO-ED/All Genders">CO-ED/All Genders</option>
            </select>
          </div>
          <button className="button is-link">Update</button>
          <Link href="/Programs" className="button">Back</Link>
        </form>
      </div>
    </div>
  );
}

export default UpdateProgram;
