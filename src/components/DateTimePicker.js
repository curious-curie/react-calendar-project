import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  container: {},
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
}));

const Container = styled.div`
  margin: 4px,
  display: flex,
  flexWrap: wrap,    
`;

const StyledTextField = styled(TextField)`
    margin-left: theme.spacing(1),
    margin-right: theme.spacing(1),
    width: 250,
`;

export default function DateAndTimePickers({
  isAllDay,
  invalid,
  name,
  handleChange,
}) {
  const classes = useStyles();

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
        className={classes.textField}
        name={name}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
      />
    </Container>
  );
}
