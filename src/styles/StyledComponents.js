import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AppContainer = styled.div`
  max-width: 2000px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${props => props.theme.darkMode ? '#1a1a1a' : '#ffffff'};
  color: ${props => props.theme.darkMode ? '#ffffff' : '#000000'};
  min-height: 100vh;
`;

export const Header = styled.header`
  //background-color: ${props => props.theme.darkMode ? '#2c3e50' : '#f8f9fa'};
  padding: 1rem 0;
  margin: 15px;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavLink = styled(Link)`
  color: ${props => props.theme.darkMode ? '#ffffff' : '#000000'};
  text-decoration: none;
  margin-right: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

export const Button = styled.button`
  background-color: ${props => props.theme.darkMode ? '#3498db' : '#007bff'};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: ${props => props.theme.darkMode ? '#2980b9' : '#0056b3'};
  }
`;

export const Input = styled.input`
  padding: 0.5rem;
  margin-right: 0.5rem;
  border: 1px solid ${props => props.theme.darkMode ? '#34495e' : '#ced4da'};
  border-radius: 4px;
  background-color: ${props => props.theme.darkMode ? '#2c3e50' : '#ffffff'};
  color: ${props => props.theme.darkMode ? '#ffffff' : '#000000'};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

export const Th = styled.th`
  background-color: ${props => props.theme.darkMode ? '#34495e' : '#f8f9fa'};
  color: ${props => props.theme.darkMode ? '#ffffff' : '#000000'};
  padding: 0.75rem;
  text-align: left;
  border-bottom: 2px solid ${props => props.theme.darkMode ? '#2c3e50' : '#dee2e6'};
`;

export const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid ${props => props.theme.darkMode ? '#34495e' : '#dee2e6'};
`;

export const Title = styled.h1`
  color: ${props => props.theme.darkMode ? '#ffffff' : '#343a40'};
  margin-bottom: 1rem;
`;

export const Subtitle = styled.h2`
  color: ${props => props.theme.darkMode ? '#ecf0f1' : '#6c757d'};
  margin-bottom: 0.75rem;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
`;

export const ErrorMessage = styled.div`
  color: ${props => props.theme.darkMode ? '#e74c3c' : '#dc3545'};
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
`;

export const StyledLink = styled(Link)`
  color: ${props => props.theme.darkMode ? '#3498db' : '#007bff'};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;