import React, { useState, useMemo, useEffect } from 'react';
import { format, isSameDay, isBefore } from 'date-fns';
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
  background: #cbcbcb;
  font-size: 18px;
  font-weight: 5pp;
  color: white;
  padding: 8px;
  text-align: center;
  width: 80%;
  margin: 16px auto;
  border-style: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
`;

const Field = styled.span`
  margin: 8px;
  padding: 8px;
`;

function ScheduleForm({ handleSubmit, presetData, readOnly, defaultLabel }) {
  //TODO: 100개 제한 체크 / 반복일정
  const uniqueId = require('lodash.uniqueid');

  const formatDefaultDate = (date) => {
    return isAllDay ? format(date, 'yyyy-MM-dd') : format(date, "yyyy-MM-dd'T'HH:mm");
  };

  const [schedule, setSchedule] = useState(
    presetData
      ? { ...presetData }
      : {
          allDay: false,
          title: '',
          memo: '',
          start: new Date(),
          end: new Date(),
          label: defaultLabel,
          id: +uniqueId(),
        }
  );
  const [isAllDay, setIsAllDay] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (presetData) {
      setIsAllDay(presetData.allDay ?? false);
      setSchedule({ ...presetData, label: presetData.label });
    }
  }, [presetData]);

  const isDateValid = useMemo(
    () =>
      isBefore(new Date(schedule.start), new Date(schedule.end)) ||
      isSameDay(new Date(schedule.start), new Date(schedule.end)),
    [schedule.start, schedule.end]
  );

  const bottomButtonTitle = presetData ? '수정' : '만들기';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule((schedule) => ({ ...schedule, [name]: value }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setSchedule((schedule) => ({ ...schedule, [name]: new Date(value) }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (schedule.title && schedule.end && schedule.start && isDateValid) {
      const id = presetData?.id ?? +uniqueId();
      const { start, end } = schedule;
      setSchedule({ ...schedule, start: new Date(start), end: new Date(end), id: id });
      handleSubmit(schedule);
    }
  };

  const handleSelectLabel = (label) => {
    setSchedule((schedule) => ({ ...schedule, label }));
  };

  const toggleAllDay = (e) => {
    setIsAllDay(e);
    setSchedule({ ...schedule, allDay: e });
  };

  const formatDate = (date) => {
    return format(date, 'yyyy-MM-dd HH:mm');
  };

  return (
    <FormWrapper>
      <form name="form" onSubmit={onSubmit}>
        <div>
          제목
          {readOnly ? (
            <Field>{presetData.title}</Field>
          ) : (
            <FormInput
              type="text"
              name="title"
              onChange={handleChange}
              invalid={submitted && !schedule.title}
              value={schedule.title}
            />
          )}
        </div>
        <div>
          메모
          {readOnly ? (
            <Field>{presetData.memo}</Field>
          ) : (
            <MemoInput type="text" name="memo" onChange={handleChange} value={schedule.memo} />
          )}
        </div>
        <DateWrapper invalid={submitted && (!schedule.start || !isDateValid)}>
          시작일
          {readOnly ? (
            <DateField>{formatDate(presetData.start)}</DateField>
          ) : (
            <DateTimePicker
              isAllDay={isAllDay}
              handleChange={handleDateChange}
              name="start"
              defaultDate={formatDefaultDate(schedule.start)}
            />
          )}
        </DateWrapper>
        <DateWrapper invalid={submitted && (!schedule.end || !isDateValid)}>
          종료일
          {readOnly ? (
            <DateField>{formatDate(presetData.end)}</DateField>
          ) : (
            <DateTimePicker
              isAllDay={isAllDay}
              handleChange={handleDateChange}
              name="end"
              defaultDate={formatDefaultDate(schedule.end)}
            />
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
          <LabelPicker readOnly={readOnly} handleSelect={handleSelectLabel} selected={schedule.label} />
        </div>
        {!readOnly && <BottomButton>{bottomButtonTitle}</BottomButton>}
      </form>
    </FormWrapper>
  );
}

export default ScheduleForm;
