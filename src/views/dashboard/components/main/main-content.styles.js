import { Box } from '@mui/material';
import styled from 'styled-components';

export const MainContentContainer = styled.main`
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