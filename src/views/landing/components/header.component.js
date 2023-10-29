import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../../../components/logo/logo.component';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 10%;
  background-color: ${props => props.theme.colors.background};
`;

const Navigation = styled.nav`
  ul {
    display: flex;
    list-style: none;
  }

  li {
    margin-left: 2rem;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Header = () => (
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

export default Header;