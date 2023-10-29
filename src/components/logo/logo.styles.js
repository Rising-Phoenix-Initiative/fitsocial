import styled from 'styled-components';

// Define a helper for media queries if you use them frequently
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
  width: 15%;
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
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #ddd;
  font-size: 2rem;
  margin-left: 1.5rem;
  font-weight: 700;
  line-height: 1;
  display: flex;

  ${respond('phone', 'font-size: 5rem;')}
`;

export const TitleGreen = styled.span`
  color: ${props => props.theme.brand.primary} !important;
`;

export const TitleWhite = styled.span`
  color: ${props => props.theme.colors.background} !important;
`;
