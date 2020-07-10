import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createLabel, deleteLabel } from '@/modules/labels';

import {
  ColorContainer,
  PaletteContainer,
  TitleInput,
  LabelButton,
  LabelWrapper,
  SelectedLabelWrapper,
  ListWrapper,
  RightWrapper,
  DeleteButton,
} from './label-styles';

export default function LabelPicker({ readOnly, handleSelect, selected }) {
  const colorList = ['#b49fdc', '#c5ebfe', '#fefd97', '#a5f8ce', '#fec9a7', '#f197c0'];
  const defaultColor = '#62efd3';
  const dispatch = useDispatch();
  const { labels } = useSelector((state) => state.labels);
  const validLabels = labels.filter((label) => label.visible);
  let lastId = labels[labels.length - 1].id;

  const [newLabel, setNewLabel] = useState({
    title: '',
    color: null,
    id: lastId + 1,
  });
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    setNewLabel({ ...newLabel, id: ++lastId });
  }, [lastId]);

  const setColor = (color) => {
    setNewLabel({ ...newLabel, color });
  };

  const setTitle = (e) => {
    setNewLabel({ ...newLabel, title: e.target.value });
  };

  const handleCreateLabel = () => {
    if (newLabel.title) {
      dispatch(createLabel(newLabel));
      setNewLabel({ ...newLabel, title: '' });
      setIsCreate(false);
    }
  };

  const handleDelete = (label) => {
    dispatch(deleteLabel(label));
  };

  const palette = (
    <PaletteContainer>
      {colorList.map((color) => (
        <ColorContainer selected={color === newLabel.color} onClick={() => setColor(color)} color={color} key={color} />
      ))}
    </PaletteContainer>
  );

  const newLabelForm = (
    <div>
      {palette}
      <ListWrapper>
        <TitleInput type="text" name="name" onChange={setTitle} />
        <LabelButton type="button" onClick={handleCreateLabel}>
          만들기
        </LabelButton>
      </ListWrapper>
    </div>
  );

  const labelList = validLabels.map((label) => (
    <LabelWrapper key={label.id} onClick={() => handleSelect(label)}>
      {label.id !== 1 && <DeleteButton onClick={() => handleDelete(label)}>X</DeleteButton>}
      <ColorContainer selected={selected && selected.id === label.id} color={label.color ?? defaultColor} />
      <span>{label.title}</span>
    </LabelWrapper>
  ));

  return (
    <div>
      {readOnly ? (
        <SelectedLabelWrapper key={selected.id}>
          <ColorContainer color={selected.color ?? defaultColor} />
          <span>{selected.title}</span>
        </SelectedLabelWrapper>
      ) : (
        <ListWrapper>{labelList}</ListWrapper>
      )}

      {!readOnly && (
        <RightWrapper>
          <LabelButton type="button" onClick={() => setIsCreate(!isCreate)}>
            레이블 추가
          </LabelButton>
        </RightWrapper>
      )}
      {!readOnly && isCreate && newLabelForm}
    </div>
  );
}
