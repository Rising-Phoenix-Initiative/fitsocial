import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  backdrop-filter: blur(15px);
  align-items: center;
  padding: 1rem 1%;
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface};
`;


export const Navigation = styled.nav`
  ul {
    display: flex;
    list-style: none;
  }

  li {
    margin-left: 2rem;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;


