import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import Reservation from '@/components/Reservation/Reservation';

export default function ReservationContainer() {
  const reservations = useSelector((state) => state.schedules.reservations);
  const reservationKeys = useMemo(() => Object.keys(reservations).filter((item) => reservations[item].length), [
    reservations,
  ]);
  const [currentKey, setCurrentKey] = useState(reservationKeys[0] ? reservationKeys[0] : null);

  return reservationKeys.length ? (
    <div>
      <h3>회의실 예약 현황</h3>
      <Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        value={currentKey}
        onChange={(e) => setCurrentKey(e.target.value)}
      >
        {reservationKeys?.sort().map((date) => (
          <MenuItem key={date} value={date}>
            {date}
          </MenuItem>
        ))}
      </Select>
      <Reservation start={new Date(currentKey)} end={new Date(currentKey)} isAllDay readOnly />;
    </div>
  ) : (
    <div>회의실 예약 내역이 없습니다.</div>
  );
}
