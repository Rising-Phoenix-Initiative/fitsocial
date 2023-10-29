import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  padding: 2rem 10%;
  text-align: center;
`;

const CopyRight = styled.p`
  margin: 0;
  font-size: 0.875rem;
`;

const Footer = () => (
    <FooterContainer>
        <CopyRight>&copy; {new Date().getFullYear()} Fitsocial. All rights reserved.</CopyRight>
        {/* You can add additional footer links or information here */}
    </FooterContainer>
);

export default Footer;