import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../logo/logo.component';
import { InputBase, IconButton, Badge, Avatar, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Search, Notifications, ExpandMore, Portrait, ExitToApp } from '@mui/icons-material';
import { HeaderContainer, Navigation, SearchContainer, UserSection } from './header.styles';

const Header = ({ authenticated = false }) => {
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [userDropdownAnchorEl, setUserDropdownAnchorEl] = useState(null);

  const handleNotifOpen = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleUserDropdownOpen = (event) => {
    setUserDropdownAnchorEl(event.currentTarget);
  };

  return (
    <HeaderContainer>
      <Logo />
      {authenticated ? (
        <>
          <SearchContainer>
            <IconButton size="small">
              <Search />
            </IconButton>
            <InputBase placeholder="Search..." />
          </SearchContainer>

          <UserSection>
            <IconButton onClick={handleNotifOpen}>
              <Badge variant="dot" color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={notifAnchorEl}
              open={Boolean(notifAnchorEl)}
              onClose={() => setNotifAnchorEl(null)}
            >
              <MenuItem>Notification 1</MenuItem>
              <MenuItem>Notification 2</MenuItem>
              {/* ... */}
            </Menu>

            <IconButton disableRipple onClick={handleUserDropdownOpen}>
              <Avatar /> <ExpandMore />
            </IconButton>
            <Menu
              anchorEl={userDropdownAnchorEl}
              open={Boolean(userDropdownAnchorEl)}
              onClose={() => setUserDropdownAnchorEl(null)}
            >
              <MenuItem>
                <ListItemIcon><Portrait /></ListItemIcon>
                <ListItemText primary="Change Avatar" />
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ExitToApp /></ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </UserSection>
        </>
      ) : (
        <Navigation>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </Navigation>
      )}
    </HeaderContainer>
  );
};

export default Header;