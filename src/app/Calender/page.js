'use client';
import React from 'react';
import styled from 'styled-components';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const times = Array.from({ length: 15 }, (_, i) => {
    const hour = 8 + i;
    const displayHour = hour % 24;
    const displayTime = displayHour < 10 ? `0${displayHour}:00` : `${displayHour}:00`;
    return displayTime;
});

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(12, 1fr);
  gap: 1px;
  background-color: #ccc;
`;

const GridItem = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: 1px solid #ccc;
`;

const HeaderItem = styled(GridItem)`
  background-color: #ddd;
  font-weight: bold;
`;

const ScheduleGrid = () => {
  return (
    <GridContainer>
      <HeaderItem></HeaderItem>
      {days.map(day => (
        <HeaderItem key={day}>{day}</HeaderItem>
      ))}
      {times.map((time, timeIndex) => (
        <React.Fragment key={time}>
          <HeaderItem>{time}</HeaderItem>
          {days.map((day, dayIndex) => (
            <GridItem key={`${day}-${timeIndex}`}></GridItem>
          ))}
        </React.Fragment>
      ))}
    </GridContainer>
  );
};

export default ScheduleGrid;
