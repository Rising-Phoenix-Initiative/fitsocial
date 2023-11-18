import { Box } from "@mui/material";
import styled from "styled-components";

export const WidgetContainer = styled(Box)`
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.surface};
  border-radius: ${(props) => props.theme.borderRadius};
  font-family: ${(props) => props.theme.fonts.primary};
  height: auto;
  width: 375px;
  margin-bottom: 20px;
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
