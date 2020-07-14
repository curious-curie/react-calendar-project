import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 8px;
  display: flex,
  flexWrap: wrap,    
`;

const StyledTextField = styled(TextField)`
  margin: 0 16px;
  width: 250;
`;

export default function DateAndTimePickers({ isAllDay, invalid, name, handleChange, defaultDate }) {
  const defaultValue = useMemo(() => {
    const formatString = isAllDay ? 'yyyy-MM-dd' : "yyyy-MM-dd'T'HH:mm";
    return defaultDate ? format(new Date(defaultDate), formatString) : format(new Date(), "yyyy-MM-dd'T'HH:mm");
  }, [isAllDay, defaultDate]);

  const inputType = useMemo(() => {
    return isAllDay ? 'date' : 'datetime-local';
  }, [isAllDay]);

  return (
    <Container invalid={invalid} noValidate>
      <StyledTextField
        id={inputType}
        type={inputType}
        value={defaultValue}
        name={name}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
      />
    </Container>
  );
}
