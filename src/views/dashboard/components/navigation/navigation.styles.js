import { Box } from "@mui/material";
import styled from "styled-components";

export const NavigationContainer = styled(Box)`
    padding: 20px 40px 20px 0;
    width: 320px;
    max-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
`;