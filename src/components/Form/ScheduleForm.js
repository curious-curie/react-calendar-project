import React, { useState, useMemo, useEffect } from 'react';
import { format, isSameDay, isBefore } from 'date-fns';
import DateTimePicker from './DateTimePicker';
import LabelPicker from '../Label/LabelPicker';
import styled from 'styled-components';
import RRule from 'rrule';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';

const FormWrapper = styled.div`
  padding: 20px;
`;

const FormInput = styled.input`
  margin: 8px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid gray;
  ${({ invalid }) => invalid && `border: 2px solid red`}
`;

const FieldWrapper = styled.div`
  ${({ title }) => title && `font-weight: bold; font-size: 20px;`}
  ${({ readOnly }) => readOnly && `margin: 16px 0`}
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
  ${({ invalid }) => invalid && `color: red;`}
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

const FormTitle = styled.div`
  margin: 16px 0;
  font-size: 20px;
  font-weight: bold;
`;

const RepeatLabel = styled.span`
  margin-right: 16px;
`;

function ScheduleForm({ handleSubmit, presetData, readOnly, defaultLabel, defaultDate }) {
  //TODO: 반복일정
  const uniqueId = require('lodash.uniqueid');

  const repeatFields = [
    { name: '매일', value: RRule.DAILY },
    { name: '매주', value: RRule.WEEKLY },
    { name: '매달', value: RRule.MONTHLY },
    { name: '매년', value: RRule.YEARLY },
    { name: '매 주중마다', value: 'WK' },
    { name: '매 주말마다', value: 'WKD' },
  ];
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
          start: defaultDate ? new Date(defaultDate) : new Date(),
          end: defaultDate ? new Date(defaultDate) : new Date(),
          label: defaultLabel,
          id: +uniqueId(),
          repeated: false,
          repeatRule: RRule.DAILY,
        }
  );
  const [isAllDay, setIsAllDay] = useState(false);
  const [repeated, setRepeated] = useState(false);
  const [repeatRule, setRepeatRule] = useState(RRule.DAILY);
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

  const handleRepeatChange = (e) => {
    setRepeatRule(e.target.value);
    setSchedule((schedule) => ({ ...schedule, repeatRule: e.target.value }));
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

  const toggleRepeated = (e) => {
    setRepeated(e);
    setSchedule({ ...schedule, repeated: e });
  };

  const formatDate = (date) => {
    return format(date, 'yyyy-MM-dd HH:mm');
  };

  return (
    <FormWrapper>
      {!readOnly && <FormTitle>일정 {bottomButtonTitle}</FormTitle>}
      <form name="form" onSubmit={onSubmit}>
        <FieldWrapper readOnly={readOnly} title="1">
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
        </FieldWrapper>
        <FieldWrapper readOnly={readOnly}>
          메모
          {readOnly ? (
            <Field>{presetData.memo}</Field>
          ) : (
            <MemoInput type="text" name="memo" onChange={handleChange} value={schedule.memo} />
          )}
        </FieldWrapper>
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
            <input type="checkbox" onChange={(e) => toggleAllDay(e.currentTarget.checked)} checked={isAllDay} />
            하루 종일
          </CheckWrapper>
        )}
        <CheckWrapper>
          {!readOnly && !presetData?.id && (
            <>
              <input type="checkbox" onChange={(e) => toggleRepeated(e.currentTarget.checked)} checked={repeated} />
              <RepeatLabel>반복</RepeatLabel>
            </>
          )}
          {!readOnly && repeated && (
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={repeatRule}
              onChange={handleRepeatChange}
            >
              <MenuItem value="" disabled>
                반복
              </MenuItem>
              {repeatFields.map((field) => (
                <MenuItem key={field.value} value={field.value}>
                  {field.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </CheckWrapper>
        {readOnly && schedule.repeated && (
          <FieldWrapper readOnly={readOnly}>
            반복
            <Field>{repeatFields.find((item) => item.value === schedule.repeatRule).name}</Field>
          </FieldWrapper>
        )}
        <FieldWrapper readOnly={readOnly}>
          레이블
          <LabelPicker readOnly={readOnly} handleSelect={handleSelectLabel} selected={schedule.label} />
        </FieldWrapper>
        {!readOnly && <BottomButton>{bottomButtonTitle}</BottomButton>}
      </form>
    </FormWrapper>
  );
}

export default ScheduleForm;
