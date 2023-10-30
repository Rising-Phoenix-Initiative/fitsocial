import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
`;

export const NavSection = styled.nav`
  min-width: 250px;
  background-color: ${props => props.theme.colors.surface};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    position: fixed;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    z-index: 100;
    height: 100%;
  }
`;

export const NavLink = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: ${props => props.theme.colors.onSurface};

  &:hover {
    background-color: ${props => props.theme.colors.primaryVariant};
  }
`;

export const MainContent = styled.main`
  flex-grow: 1;
  overflow-y: auto;
  padding: 100px 1rem 1rem 40px;

  @media (max-width: 768px) {
    margin-left: 250px; // Same as the width of the NavSection
  }
`;