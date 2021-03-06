import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format, differenceInHours, addMinutes } from 'date-fns';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createDateArray } from '@/utils/dateHelpers';

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

const hours = [10, 11, 12, 13, 14, 15, 16, 17, 18];
const minutes = ['00', '10', '20', '30', '40', '50'];

const newTimeSlotArray = () => {
  let arr = [];
  hours.forEach((hour) => {
    minutes.forEach((min) => {
      arr.push(`${hour}:${min}`);
    });
  });
  return arr;
};

const Wrapper = styled.div`
  margin: 16px 0;
  ${({ isModal }) =>
    isModal &&
    `position: fixed;
  background: #fff;
  padding: 8px;
  top: 30px;
  left: calc(50% - 150px);
  border: 1px solid #ececec;
  box-shadow: 5px 5px 5px #ececec;
  width: 300px;
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
  height: 24px;
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
  height: 24px;
  padding-top: 4px;
  font-size: 8px;
  color: #ccc;
`;

const TitleWrapper = styled.div`
  font-size: 12px;
  font-weight: bold;
  padding-top: 4px;
  text-align: center;
`;

export default function Reservation({
  isAllDay,
  start = new Date(),
  end = new Date(),
  scheduleId,
  onCreate,
  onClose,
  isModal,
  readOnly,
}) {
  const reservations = useSelector((state) => state.schedules.reservations);
  const uniqueId = require('lodash.uniqueid');
  const defaultSlot = timeSlotArray.reduce((a, time) => ((a[time] = false), a), {});

  const [booking, setBooking] = useState({});
  const [current, setCurrent] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(-1);
  const [availableTime, setAvailableTime] = useState({});
  const emptyReservation = Array(5).fill(defaultSlot);
  const [defaultReservation, setDefaultReservation] = useState(Array(5).fill(defaultSlot));

  // const timeAvailablity = timeSlotArray.map((time) => {});
  const { schedules } = useSelector((state) => state.schedules);

  const getScheduleBlock = (id) => {
    const schedule = schedules.find((item) => item.id === id);
    return schedule ? (
      <Link to={`/${schedule.id}`}>
        <TitleWrapper>{schedule.title}</TitleWrapper>
      </Link>
    ) : (
      <></>
    );
  };

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
        : (format(start, 'HH:mm') === time || Object.is(startDiff, -0) || startDiff < 0) &&
          (Object.is(endDiff, 0) || endDiff > 0);
    });

    setAvailableTime(available);
    let preset = [...emptyReservation];
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

  const handleSelect = (index, key, all = false) => {
    if (readOnly || !checkIsAvailable(index, key)) {
      return;
    }
    if (!all && selectedTime.length && (selectedRoom !== index || !isContinuous(index, key))) {
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

  const handleSelectAll = (index) => {
    setCurrent(defaultReservation);
    setSelectedTime([]);
    Object.keys(emptyReservation[index]).forEach((key) => {
      handleSelect(index, key, true);
    });
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
        {!readOnly && slots[key] === scheduleId && <Overlay />}
        {slots[key] === 'prev' ? (
          <SmallText>기존 예약</SmallText>
        ) : (
          readOnly && slots[key] && getScheduleBlock(slots[key])
        )}
      </TimeSlot>
    ));
  };

  const currentTimeSlots = (
    <SlotWrapper>
      <TimeColumn>
        <SlotTitle>time</SlotTitle>
        <SlotTitle>
          <SmallText>(시작시간)</SmallText>
        </SlotTitle>
        {timeSlotArray.map((time) => (
          <TimeSlot key={time} available={true} time={true}>
            <TitleWrapper>{time}</TitleWrapper>
          </TimeSlot>
        ))}
      </TimeColumn>
      {current.map((booking, index) => (
        <TimeColumn key={index}>
          <SlotTitle>room{index + 1}</SlotTitle>
          <SlotTitle>
            <SmallText onClick={() => handleSelectAll(index)}>{readOnly ? ' ' : '전체선택'}</SmallText>
          </SlotTitle>
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
      {!readOnly && (
        <SlotWrapper>
          <SubmitButton onClick={onClose}>취소</SubmitButton>
          <SubmitButton onClick={handleSubmit}>예약</SubmitButton>
        </SlotWrapper>
      )}
    </Wrapper>
  );
}
