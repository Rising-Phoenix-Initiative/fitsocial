import styled from 'styled-components';

export const AuthContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  color: ${props => props.theme.colors.onPrimary};
  background-color: ${props => props.theme.colors.primary};
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;