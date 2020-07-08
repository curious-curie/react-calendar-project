import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { isBefore } from 'date-fns';
import DateTimePicker from './DateTimePicker';
import LabelPicker from './LabelPicker';
import styled from 'styled-components';
import { createSchedule } from '../modules/schedules';

const FormWrapper = styled.div`
  padding: 20px;
`;
const FormInput = styled.input`
  margin: 8px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid gray;
  ${({ invalid }) =>
    invalid &&
    `
    border: 2px solid red;
  `}
`;

const MemoInput = styled.input`
  margin: 8px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid gray;
  width: 200px;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  width: 100%;
  ${({ invalid }) =>
    invalid &&
    `
    color: red;
  `}
`;

const CheckWrapper = styled.div`
  text-align: right;
`;

const BottomButton = styled.button`
  background: gray;
  font-size: 18px;
  font-weight: 5pp;
  color: white;
  padding: 8px;
  text-align: center;
  width: 80%;
  margin: 16px auto;
  border-radius: 8px;
  display: flex;
  justify-content: center;
`;
function ScheduleForm() {
  const [schedule, setSchedule] = useState({
    title: '',
    memo: '',
    startDate: '',
    endDate: '',
    label: null,
  });
  const [isAllDay, setIsAllDay] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const isDateValid = useMemo(
    () => isBefore(new Date(schedule.startDate), new Date(schedule.endDate)),
    [schedule.startDate, schedule.endDate]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule((schedule) => ({ ...schedule, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (
      schedule.title &&
      schedule.endDate &&
      schedule.startDate &&
      isDateValid
    ) {
      dispatch(createSchedule(schedule));
    }
  };

  const handleSelectLabel = (label) => {
    setSchedule((schedule) => ({ ...schedule, label }));
  };

  const toggleAllDay = () => {
    setIsAllDay(!isAllDay);
  };
  return (
    <FormWrapper>
      <form name='form' onSubmit={handleSubmit}>
        <div>
          제목
          <FormInput
            type='text'
            name='title'
            onChange={handleChange}
            invalid={submitted && !schedule.title}
          />
        </div>
        <div>
          메모
          <MemoInput type='text' name='memo' onChange={handleChange} />
        </div>
        <DateWrapper
          invalid={submitted && (!schedule.startDate || !isDateValid)}
        >
          시작일
          <DateTimePicker
            isAllDay={isAllDay}
            handleChange={handleChange}
            name='startDate'
          />
        </DateWrapper>
        <DateWrapper invalid={submitted && (!schedule.endDate || !isDateValid)}>
          종료일
          <DateTimePicker
            isAllDay={isAllDay}
            handleChange={handleChange}
            name='endDate'
          />
        </DateWrapper>
        <CheckWrapper>
          하루 종일
          <input
            type='checkbox'
            onChange={(e) => toggleAllDay(e.currentTarget.checked)}
            checked={isAllDay}
          />
        </CheckWrapper>
        <div>
          레이블
          <LabelPicker
            handleSelect={handleSelectLabel}
            selected={schedule.label}
          />
        </div>
        <BottomButton>만들기</BottomButton>
      </form>
    </FormWrapper>
  );
}

export default ScheduleForm;
