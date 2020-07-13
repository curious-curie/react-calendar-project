import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import CreateIcon from '@material-ui/icons/Create';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;
const TabButton = styled.button`
  outline: 0;
  border-radius: 4px;
  margin: 4px;
  width: 80px;
  padding: 8px 0;
  text-align: center;
  border: none;
  background: #eee;
  ${({ selected }) => selected && `background: #cfedfc;`}
`;

const Right = styled.div`
  width: 40px;
`;

function Header({ location }) {
  return (
    <HeaderWrapper>
      <Link to="/search">
        <SearchIcon />
      </Link>
      <Link to="/reservations">
        <LibraryBooksIcon />
      </Link>
      <div>
        <Link to="/">
          <TabButton selected={location.pathname === '/'}>Monthly</TabButton>
        </Link>
        <Link to="/list">
          <TabButton selected={location.pathname === '/list'}>List</TabButton>
        </Link>
      </div>
      <Link to="/new">
        <Right>
          <CreateIcon />
        </Right>
      </Link>
    </HeaderWrapper>
  );
}

export default withRouter(Header);
