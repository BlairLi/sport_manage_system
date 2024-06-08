'use client';

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import Header from "./Header";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-bottom: 5vh;
`;

const TableContainer = styled.div`
  width: 75%;
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-top: 3vw;
`;

const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
`;

const StyledTh = styled.th`
  width: ${({ width }) => width};
  overflow: hidden;
  cursor: pointer;
`;

const StyledTd = styled.td`
  width: ${({ width }) => width};
  overflow: hidden;
`;

// TODO
// const AddButton = styled(Link)`
const AddButton = styled('a')`
  margin-left: 1vw;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1vw;
`;

// TODO
// const EditButton = styled(Link)`
const EditButton = styled('a')`
  margin-right: 8px;
`;

const SearchBar = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
`;

const GenderFilter = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

function Coach() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(1);
  const [filterGender, setFilterGender] = useState('');

  useEffect(() => {
    // axios.get('http://localhost:3001')
    axios.get(`${url}/getUser`)
      .then(result => setUsers(result.data || []))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    
    if (isConfirmed) {
      axios.delete(`${url}/deleteUser/` + id)
        .then(result => {
          console.log(result);
          setUsers(users.filter(user => user._id !== id));
        })
        .catch(err => console.log(err));
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenderFilterChange = (e) => {
    setFilterGender(e.target.value);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(-sortOrder);
    } else {
      setSortKey(key);
      setSortOrder(1);
    }
  };

  let filteredUsers = users.slice(); // Start with all users

  // Filter by search term (name only)
  filteredUsers = filteredUsers.filter(user =>
    user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter by selected gender
  if (filterGender) {
    filteredUsers = filteredUsers.filter(user => user.gender === filterGender);
  }

  // Sort filtered users
  filteredUsers.sort((a, b) => {
    if (sortKey) {
      if (typeof a[sortKey] === 'string') {
        return a[sortKey].localeCompare(b[sortKey]) * sortOrder;
      } else {
        return (a[sortKey] - b[sortKey]) * sortOrder;
      }
    }
    return 0;
  });

  return (
    <Container>
      {/* <Header /> */}
      <TableContainer>
        <TopDiv>
          <h1>Coach List</h1>
          <div>
            {/* <AddButton to="/create" className="btn btn-success">Add Coach</AddButton>
            <AddButton to="/payroll" className="btn" style={{ background: "#00000063" }}>Payroll</AddButton> */}
            <a href="/Coach/create" className="button">Add Coach</a>
            <a href="/Payroll" className="button">Payroll</a>
          </div>
        </TopDiv>
        <SearchBar 
          type="text" 
          placeholder="Search by name" 
          value={searchTerm} 
          onChange={handleSearch} 
        />
        <GenderFilter value={filterGender} onChange={handleGenderFilterChange}>
          <option value="">Filter by Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </GenderFilter>
        <StyledTable className="table">
          <thead>
            <tr>
              <StyledTh width="20%" onClick={() => handleSort("name")}>Name {sortKey === "name" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
              <StyledTh width="20%" onClick={() => handleSort("location")}>Location {sortKey === "location" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
              <StyledTh width="15%" onClick={() => handleSort("email")}>Email {sortKey === "email" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
              <StyledTh width="10%" onClick={() => handleSort("phone")}>Phone {sortKey === "phone" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
              <StyledTh width="10%" onClick={() => handleSort("gender")}>Gender {sortKey === "gender" && (sortOrder === 1 ? "↑" : "↓")}</StyledTh>
              <StyledTh width="15%">Action</StyledTh>
            </tr>
          </thead>
          <tbody>
            {filteredUsers && filteredUsers.map((user, index) => (
              <tr key={index}>
                <StyledTd width="20%">{user.name}</StyledTd>
                <StyledTd width="20%">{user.location}</StyledTd>
                <StyledTd width="15%">{user.email}</StyledTd>
                <StyledTd width="10%">{user.phone}</StyledTd>
                <StyledTd width="10%">{user.gender}</StyledTd>
                <StyledTd width="15%">
                  {/* <EditButton to={`/update/${user._id}`} className="btn btn-success">Edit</EditButton> */}
                  <a href={`/Coach/update/${user._id}`} className="button is-small">Edit</a>
                  <button className="button is-small btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                </StyledTd>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </Container>
  );
}

export default Coach;