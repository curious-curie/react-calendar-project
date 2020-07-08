import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { createLabel } from '../modules/schedules';

const ColorContainer = styled.div`
  background-color: ${(props) => props.color};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 8px;
  ${({ selected }) =>
    selected &&
    `
    border: 2px solid gray;
  `}
`;

const PaletteContainer = styled.div`
  display: flex;
  width: 300px;
  padding: 16px;
`;

const TitleInput = styled.input`
  border: 1px solid #ececec;
  border-radius: 4px;
  width: 220px;
  padding: 8px;
`;

const LabelButton = styled.button`
  padding: 8px;
  border: 1px solid #ececec;
  border-radius: 4px;
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ListWrapper = styled.div`
  margin: 8px;
  display: flex;
  justify-content: center;
`;

export default function LabelPicker({ handleSelect, selected }) {
  useEffect(() => {
    handleSelect(labels[0]);
  }, []);
  const colorList = [
    '#b49fdc',
    '#c5ebfe',
    '#fefd97',
    '#a5f8ce',
    '#fec9a7',
    '#f197c0',
  ];
  const defaultColor = '#24bca8';

  const dispatch = useDispatch();
  const labels = useSelector((state) => state.schedules.labels);
  let lastId = labels[labels.length - 1].id;
  const [newLabel, setNewLabel] = useState({
    title: '',
    color: '',
    id: lastId + 1,
  });

  useEffect(() => {
    setNewLabel({ ...newLabel, id: ++lastId });
  }, [lastId]);

  const [isCreate, setIsCreate] = useState(false);

  const setColor = (color) => {
    setNewLabel({ ...newLabel, color });
  };

  const setTitle = (e) => {
    setNewLabel({ ...newLabel, title: e.target.value });
  };

  const handleCreateLabel = () => {
    if (newLabel.title) {
      dispatch(createLabel(newLabel));
    }
  };

  const palette = (
    <PaletteContainer>
      {colorList.map((color) => (
        <ColorContainer
          selected={color === newLabel.color}
          onClick={() => setColor(color)}
          color={color}
          key={color}
        />
      ))}
    </PaletteContainer>
  );

  const newLabelForm = (
    <div>
      {palette}
      <ListWrapper>
        <TitleInput type='text' name='name' onChange={setTitle} />
        <LabelButton type='button' onClick={handleCreateLabel}>
          만들기
        </LabelButton>
      </ListWrapper>
    </div>
  );

  const labelList = labels.map((label) => (
    <LabelWrapper key={label.id} onClick={() => handleSelect(label)}>
      <ColorContainer
        selected={selected && selected.id === label.id}
        color={label.color ?? defaultColor}
      />
      <span>{label.title}</span>
    </LabelWrapper>
  ));
  return (
    <div>
      <ListWrapper>{labelList}</ListWrapper>
      <LabelButton type='button' onClick={() => setIsCreate(!isCreate)}>
        레이블 추가
      </LabelButton>
      {isCreate && newLabelForm}
    </div>
  );
}
