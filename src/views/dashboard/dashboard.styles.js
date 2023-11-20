import { Box } from '@mui/material';
import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  margin: 0 10%;
`;


export const SideContent = styled.aside`
  padding: 20px 75px;
  display: flex;
  flex-direction: column;
`;


export const SafeArea = styled(Box)`
  width: 100%;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
`;

