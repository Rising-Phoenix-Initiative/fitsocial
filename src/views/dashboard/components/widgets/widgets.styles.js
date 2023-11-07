import styled from "styled-components";
import { Typography, LinearProgress, Box } from '@mui/material';

export const StatsContainer = styled(Box)`
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius};
  font-family: ${(props) => props.theme.fonts.primary};
  height: 70vh;
  width: 375px;
`;

export const Stat = styled(Typography)`
  font-size: ${(props) => props.theme.fontSizes.medium};
  margin-bottom: ${(props) => props.theme.spacings.small};
`;

export const StyledLinearProgress = styled(LinearProgress)`
  margin-bottom: ${(props) => props.theme.spacings.medium};
  color: ${(props) => props.theme.colors.primary};
`;

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
