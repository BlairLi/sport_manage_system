'use client';

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from "styled-components";
import * as XLSX from 'xlsx';
import Link from "next/link";
// import Header from "./Header";

// Styled Components (unchanged)
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

const AddButton = styled('a')`
  margin-left: 1vw;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1vw; /* Add margin-left here */
`;

const Payroll = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const url = process.env.NEXT_PUBLIC_MONGODB_URL

  // Dynamically fetch users and update their hours
  useEffect(() => {
    axios.get(`${url}/getUser`)
      .then(result => {
        const users = result.data;
        setUsers(users);

        // Trigger updateUserHour for each user
        const updatePromises = users.map(user => {
          return axios.get(`${url}/api/getPersonSessionsDuration`, {
            params: { personName: user.name }
          })
          .then(response => {
            if (response.data.success) {
              const updatedHour = response.data.totalDuration;

              return axios.put(`${url}/updateUserHour/${user.name}`, { hour: updatedHour })
                .then(updateResponse => {
                  if (updateResponse.data.success) {
                    console.log(`Updated hour for ${user.name}: ${updatedHour}`);
                    return { ...user, hour: updatedHour };
                  } else {
                    console.error(`Failed to update hour for ${user.name}: ${updateResponse.data.message}`);
                    return user;
                  }
                });
            } else {
              console.error(`Failed to get session duration for ${user.name}: ${response.data.message}`);
              return user;
            }
          })
          .catch(err => {
            console.error(`Error fetching session duration for ${user.name}:`, err);
            return user;
          });
        });

        // Wait for all updates to complete
        Promise.all(updatePromises)
          .then(updatedUsers => {
            setUsers(updatedUsers);
          })
          .catch(err => console.error('Error updating user hours:', err));
      })
      .catch(err => console.log(err));
  }, [url]);

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleExport = () => {
    const fileName = 'payroll.xlsx';
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const exportData = users.map(user => {
      return {
        Name: user.name,
        Hour: user.hour,
        HourlyRate: user.hourlyWage,
        Total: user.totalSalary
      };
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Payroll');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    const url = URL.createObjectURL(data);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortOrder('asc');
    }
  };

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortColumn === "Name") {
      return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else {
      // For numeric columns
      return sortOrder === "asc" ? a[sortColumn] - b[sortColumn] : b[sortColumn] - a[sortColumn];
    }
  });

  return (
    <Container>
      {/* <Header/> */}
      <TableContainer>
        <TopDiv>
          <h1>Payroll</h1>
          <div>
            <button onClick={handleExport} className="button btn-primary">Export to Excel</button>
            <Link href="/Coach" className="button">Coach</Link>
          </div>
        </TopDiv>
        {/* Add search input */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <StyledTable className="table">
          <thead>
            <tr>
              <StyledTh width="30%" onClick={() => handleSort("Name")}>Name</StyledTh>
              <StyledTh width="20%" onClick={() => handleSort("hour")}>Hour</StyledTh>
              <StyledTh width="20%" onClick={() => handleSort("hourlyWage")}>$/H</StyledTh>
              <StyledTh width="20%" onClick={() => handleSort("totalSalary")}>Total</StyledTh>
              <StyledTh width="10%">Action</StyledTh>
            </tr>
          </thead>
          <tbody>
            {/* Render sorted users */}
            {sortedUsers.map((user, index) => (
              <tr key={index}>
                <StyledTd width="30%">{user.name}</StyledTd>
                <StyledTd width="20%">{user.hour}</StyledTd>
                <StyledTd width="20%">{user.hourlyWage}</StyledTd>
                <StyledTd width="20%">{user.totalSalary}</StyledTd>
                <StyledTd width="10%">
                  <a href={`/Payroll/update/${user._id}`} className="button is-small">Edit</a>
                </StyledTd>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </Container>
  );
}

export default Payroll;
