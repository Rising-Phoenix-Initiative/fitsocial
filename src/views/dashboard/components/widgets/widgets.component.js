import * as React from 'react';
import { IconButton, InputBase } from '@mui/material';
import { SearchBar, SearchContainer } from './widgets.styles';
import { Search } from '@mui/icons-material';
import UserStats from './components/user-stats/user-stats.component';
import WhoToFollow from './components/who-to-follow/who-to-follow.component';

const Widgets = ({ user }) => {
  return (
    <>
      <SearchContainer>
        <SearchBar>
          <IconButton size="small">
            <Search />
          </IconButton>
          <InputBase placeholder="Search..." />
        </SearchBar>
      </SearchContainer>
      <WhoToFollow />
      <UserStats user={user} />
    </>
  );
};

export default Widgets;