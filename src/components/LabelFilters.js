import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { applyFilter, removeFilter, resetFilter } from '@/modules/labels';
import { ColorContainer, LabelWrapper, ListWrapper } from './label-styles';

export default function LabelFilters() {
  const { labels, labelFilter } = useSelector((state) => state.labels);
  const dispatch = useDispatch();
  const defaultColor = '#62efd3';

  const isSelected = (label) => {
    return labelFilter.includes(label.id);
  };

  const isAllSelected = useMemo(() => labelFilter.length === labels.length || !labelFilter.length, [
    labels,
    labelFilter,
  ]);

  const handleSelect = (label) => {
    if (isSelected(label)) dispatch(removeFilter(label.id));
    else dispatch(applyFilter(label.id));
  };

  const handleSelectAll = () => {
    if (!isAllSelected) dispatch(resetFilter());
  };

  const allButton = (
    <LabelWrapper onClick={() => handleSelectAll()}>
      <ColorContainer selected={isAllSelected} empty />
      <span>All</span>
    </LabelWrapper>
  );

  const labelList = labels.map((label) => (
    <LabelWrapper key={label.id} onClick={() => handleSelect(label)}>
      <ColorContainer selected={isSelected(label)} color={label.color ?? defaultColor} />
      <span>{label.title}</span>
    </LabelWrapper>
  ));
  return (
    <ListWrapper>
      {allButton} {labelList}
    </ListWrapper>
  );
}
