import styled from 'styled-components';

export const DeleteButton = styled.button`
  background: gray;
  opacity: 0.7;
  right: 2px;
  font-size: 5px;
  color: #fff;
  border: none;
  border-radius: 50%;
  text-align: center;
  padding: 4px 5px;
  position: absolute;
  top: 0;
`;

export const ColorContainer = styled.div`
  background-color: ${(props) => props.color};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 8px;
  ${({ selected }) => selected && `border: 2px solid gray !important;`}
  ${({ empty }) => empty && `border: 1px dashed gray;`}
`;

export const PaletteContainer = styled.div`
  display: flex;
  width: 300px;
  padding: 16px;
`;

export const TitleInput = styled.input`
  border: 1px solid #ececec;
  border-radius: 4px;
  width: 220px;
  padding: 8px;
`;

export const LabelButton = styled.button`
  padding: 8px;
  border: 1px solid #ececec;
  border-radius: 4px;
`;

export const LabelWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SelectedLabelWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const ListWrapper = styled.div`
  margin: 8px;
  display: flex;
  justify-content: center;
`;

export const RightWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
