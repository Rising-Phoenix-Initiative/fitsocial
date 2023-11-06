import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../../components/logo/logo.component';
import { HeaderContainer, Navigation } from './header.styles';
import { Box, Button } from '@mui/material';

const Header = () => {
  return (
    <HeaderContainer>
      <Logo />
      <Navigation>
        <Box component={'ul'} sx={{ display: 'flex', alignItems: 'center' }}>
          <li><Link to="/login">Login</Link></li>
          <li style={{ color: 'black' }}><Button variant='contained' component={Link} to="/signup">Sign Up</Button></li>
        </Box>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;