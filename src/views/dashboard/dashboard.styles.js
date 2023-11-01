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

export const SearchComponent = styled.div`
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
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-self: flex-start;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 8px;
  margin: 0 40px;
  width: 100%;
`;


export const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`

export const SideContent = styled.aside`
  padding: 20px 75px;
  display: flex;
  justify-content: center;
`;


export const SafeArea = styled.div`
  width: 100%;
  padding: 20px 40px;
  display: flex;
  justify-content: center;
`;

