import React, { useEffect } from 'react';
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

export default function DateAndTimePickers({
  isAllDay,
  invalid,
  name,
  handleChange,
}) {
  const inputType = isAllDay ? 'date' : 'datetime-local';
  const defaultValue = isAllDay
    ? format(new Date(), 'yyyy-MM-dd')
    : format(new Date(), "yyyy-MM-dd'T'HH:mm");

  return (
    <Container invalid={invalid} noValidate>
      <StyledTextField
        id={inputType}
        type={inputType}
        // defaultValue={defaultValue}
        name={name}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
      />
    </Container>
  );
}
