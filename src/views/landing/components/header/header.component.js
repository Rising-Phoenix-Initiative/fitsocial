import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../../components/logo/logo.component';
import { HeaderContainer, Navigation } from './header.styles';

const Header = () => {
  return (
    <HeaderContainer>
      <Logo />
      <Navigation>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;