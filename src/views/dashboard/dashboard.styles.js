import { Box } from '@mui/material';
import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  margin: 0 10%;
`;

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  overflow-y: auto;
  border-right: 1px solid ${({ theme }) => theme.colors.surface};
`;

export const MainContentTitle = styled(Box)`
  backdrop-filter: blur(10px);
  position: sticky;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 111;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface};
`

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 20px;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-self: flex-start;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 8px;
  margin: 0;
  width: 100%;
`;

export const SideContent = styled.aside`
  padding: 20px 75px;
  display: flex;
  flex-direction: column;
`;


export const SafeArea = styled(Box)`
  width: 100%;
  padding: 20px 40px;
  display: flex;
  justify-content: center;
`;

