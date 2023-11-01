import styled from 'styled-components';

const respond = (breakpoint, content) => {
  switch (breakpoint) {
    case 'phone':
      return `@media (max-width: 600px) { ${content} }`;
    // You can add more cases for different breakpoints
    default:
      return;
  }
};

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;

  &:link,
  &:visited {
    text-decoration: none;
  }

  &:hover {
    cursor: pointer;
  }

  ${respond('phone', `
    width: 100%;
    justify-content: center;
  `)}
`;

export const LogoImage = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 100%;
`;

export const Title = styled.div`
  text-decoration: none;
  font-family: ${props => props.theme.brand.fontFamily};
  color: #ddd;
  font-size: 2rem;
  margin-left: 1.3rem;
  font-weight: 700;
  line-height: 1;
  display: flex;

  ${respond('phone', 'font-size: 1.75rem;')}
`;

export const TitleGreen = styled.span`
  color: ${props => props.theme.brand.primary} !important;
`;

export const TitleWhite = styled.span`
  color: ${props => props.theme.colors.background} !important;
`;
