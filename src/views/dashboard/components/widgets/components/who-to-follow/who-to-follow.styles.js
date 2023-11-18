import styled from "styled-components";
import { Typography, LinearProgress } from '@mui/material';

export const Stat = styled(Typography)`
  font-size: ${(props) => props.theme.fontSizes.medium};
  margin-bottom: ${(props) => props.theme.spacings.small};
`;

export const StyledLinearProgress = styled(LinearProgress)`
  margin-bottom: ${(props) => props.theme.spacings.medium};
  color: ${(props) => props.theme.colors.primary};
`;