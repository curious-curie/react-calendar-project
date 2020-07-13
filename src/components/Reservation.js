import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format, differenceInHours, addMinutes } from 'date-fns';

import { useSelector, useDispatch } from 'react-redux';
import { createDateArray } from '../utils/dateHelpers';

const timeSlotArray = [
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
];

const Wrapper = styled.div`
  ${({ isModal }) =>
    isModal &&
    `position: fixed;
  background: #fff;
  padding: 16px;
  top: 50px;
  border: 1px solid #ececec;
  box-shadow: 5px 5px 5px #ececec;
  `}
`;
const SlotWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const TimeColumn = styled.div`
  flex: 0 0 15%;
`;

const TimeSlot = styled.div`
  text-align: center;
  position: relative;
  height: 24px;
  border: 1px solid gray;
  background-color: #ccc;
  ${({ available }) => available && `background: #fff;`}
  ${({ time }) => time && `border: 1px solid #fff`}
`;

const RightButton = styled.button`
  padding: 8px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #ccc;
  right: 8px;
`;

const SlotTitle = styled.div`
  text-align: center;
  font-weight: bold;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  background: red;
`;

const SubmitButton = styled.button`
  width: calc(50% - 8px);
  margin: 16px 8px;
  padding: 8px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #ccc;
`;

const SmallText = styled.div`
  font-size: 8px;
  color: #ccc;
`;
export default function Reservation({
  isAllDay,
  start = new Date(),
  end = new Date(),
  scheduleId,
  onCreate,
  onClose,
  isModal,
}) {
  const reservations = useSelector((state) => state.schedules.reservations);
  const dispatch = useDispatch();
  const uniqueId = require('lodash.uniqueid');
  const defaultSlot = timeSlotArray.reduce((a, time) => ((a[time] = false), a), {});

  const [booking, setBooking] = useState({});
  const [current, setCurrent] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(-1);
  const [availableTime, setAvailableTime] = useState({});
  const [defaultReservation, setDefaultReservation] = useState(Array(5).fill(defaultSlot));

  // const timeAvailablity = timeSlotArray.map((time) => {});

  useEffect(() => {
    const dateArray = createDateArray({ start, end });
    if (dateArray.length > 1) {
      alert('당일 일정만 예약 가능합니다');
    }
    const date = format(start, 'yyyy-MM-dd');
    let available = {};
    timeSlotArray.forEach((time) => {
      const startDiff = differenceInHours(start, new Date(`${date}T${time}`));
      const endTime = addMinutes(new Date(`${date}T${time}`), 30);
      const endDiff = differenceInHours(end, endTime);
      available[time] = isAllDay
        ? true
        : (Object.is(startDiff, -0) || startDiff < 0) && (Object.is(endDiff, 0) || endDiff > 0);
    });
    setAvailableTime(available);
    let preset = [...defaultReservation];
    let presetReservation;
    if (reservations[date]) {
      reservations[date].forEach((item) => {
        let roomReservation = { ...preset[item.room] };
        item.time.forEach((time) => {
          roomReservation = { ...roomReservation, [time]: item.scheduleId === scheduleId ? 'prev' : item.scheduleId };
        });
        presetReservation = preset.map((res, index) => {
          if (index === item.room) return roomReservation;
          else return res;
        });
        preset = [...presetReservation];
      });
    } else {
      presetReservation = [...defaultReservation];
    }
    const newBooking = { ...booking, [date]: presetReservation };
    setBooking(newBooking);
    setCurrent(preset);
    setDefaultReservation(preset);
  }, [start, end]);

  const isContinuous = (index, key) => {
    const k = timeSlotArray.indexOf(key);
    const prevItem = current[index][timeSlotArray[k - 1]];
    const nextItem = current[index][timeSlotArray[k + 1]];
    return prevItem || nextItem;
  };

  const handleSelect = (index, key) => {
    if (!checkIsAvailable(index, key)) {
      return;
    }
    if (selectedTime.length && (selectedRoom !== index || !isContinuous(index, key))) {
      setCurrent(defaultReservation);
      setSelectedTime([]);
    }
    setCurrent((prev) =>
      prev.map((room, idx) => {
        if (index === idx) {
          return {
            ...room,
            [key]: prev[index][key] === scheduleId ? false : scheduleId,
          };
        } else return room;
      })
    );
    setSelectedRoom(index);
    setSelectedTime((prev) => [...prev, key]);
  };

  const checkIsAvailable = (index, key) => {
    return !(
      !availableTime[key] ||
      (current[index][key] && current[index][key] !== scheduleId && current[index][key] !== 'prev')
    );
  };

  const getTimeSlot = (slots, room) => {
    return Object.keys(slots).map((key) => (
      <TimeSlot key={key} onClick={() => handleSelect(room, key)} available={checkIsAvailable(room, key)}>
        {slots[key] === scheduleId && <Overlay />}
        {slots[key] === 'prev' && <SmallText>기존 예약</SmallText>}
      </TimeSlot>
    ));
  };

  const currentTimeSlots = (
    <SlotWrapper>
      <TimeColumn>
        <SlotTitle>time</SlotTitle>
        {timeSlotArray.map((time) => (
          <TimeSlot key={time} available={true} time={true}>
            {time}
          </TimeSlot>
        ))}
      </TimeColumn>
      {current.map((booking, index) => (
        <TimeColumn key={index}>
          <SlotTitle>room{index + 1}</SlotTitle>
          {getTimeSlot(booking, index)}
        </TimeColumn>
      ))}
    </SlotWrapper>
  );

  const handleSubmit = () => {
    const res = {
      id: uniqueId(),
      scheduleId,
      time: selectedTime,
      room: selectedRoom,
      date: format(start, 'yyyy-MM-dd'),
    };
    onCreate(res);
  };

  return (
    <Wrapper isModal={isModal}>
      {currentTimeSlots}
      <SlotWrapper>
        <SubmitButton onClick={onClose}>취소</SubmitButton>
        <SubmitButton onClick={handleSubmit}>예약</SubmitButton>
      </SlotWrapper>
    </Wrapper>
  );
}
