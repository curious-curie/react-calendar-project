import React, { useState, useMemo } from 'react';
import { isBefore } from 'date-fns';
import DateTimePicker from './DateTimePicker';
import LabelPicker from './LabelPicker';
import styled from 'styled-components';

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

const DateField = styled.div`
  margin: 0 16px;
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

const Field = styled.span`
  margin: 8px;
  padding: 8px;
`;

function ScheduleForm({ handleSubmit, presetData, readOnly }) {
  //TODO: 100개 제한 체크 / prefill info when editing / 반복일정
  const uniqueId = require('lodash.uniqueid');
  const [schedule, setSchedule] = useState({
    title: '',
    memo: '',
    startDate: '',
    endDate: '',
    label: null,
    id: uniqueId(),
  });
  const [isAllDay, setIsAllDay] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isDateValid = useMemo(() => isBefore(new Date(schedule.startDate), new Date(schedule.endDate)), [
    schedule.startDate,
    schedule.endDate,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule((schedule) => ({ ...schedule, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (schedule.title && schedule.endDate && schedule.startDate && isDateValid) {
      const id = uniqueId();
      setSchedule({ ...schedule, id: id });
      handleSubmit(schedule);
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
      <form name="form" onSubmit={onSubmit}>
        <div>
          제목
          {readOnly ? (
            <Field>{presetData.title}</Field>
          ) : (
            <FormInput type="text" name="title" onChange={handleChange} invalid={submitted && !schedule.title} />
          )}
        </div>
        <div>
          메모
          {readOnly ? <Field>{presetData.memo}</Field> : <MemoInput type="text" name="memo" onChange={handleChange} />}
        </div>
        <DateWrapper invalid={submitted && (!schedule.startDate || !isDateValid)}>
          시작일
          {readOnly ? (
            <DateField>{presetData.startDate}</DateField>
          ) : (
            <DateTimePicker isAllDay={isAllDay} handleChange={handleChange} name="startDate" />
          )}
        </DateWrapper>
        <DateWrapper invalid={submitted && (!schedule.endDate || !isDateValid)}>
          종료일
          {readOnly ? (
            <DateField>{presetData.endDate}</DateField>
          ) : (
            <DateTimePicker isAllDay={isAllDay} handleChange={handleChange} name="endDate" />
          )}
        </DateWrapper>
        {!readOnly && (
          <CheckWrapper>
            하루 종일
            <input type="checkbox" onChange={(e) => toggleAllDay(e.currentTarget.checked)} checked={isAllDay} />
          </CheckWrapper>
        )}
        <div>
          레이블
          <LabelPicker
            readOnly={readOnly}
            handleSelect={handleSelectLabel}
            selected={readOnly ? presetData.label : schedule.label}
          />
        </div>
        {!readOnly && <BottomButton>만들기</BottomButton>}
      </form>
    </FormWrapper>
  );
}

export default ScheduleForm;
