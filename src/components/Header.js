import React from 'react';
import { useTheme } from '../contexts/ThemeProvider';
import { Header as StyledHeader, Nav, NavLink, Button } from '../styles/StyledComponents';

const Header = () => {
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <StyledHeader>
            <Nav>
                <div>
                    <NavLink to="/">Dashboard</NavLink>
                    <NavLink to="/portfolio">Portfolio</NavLink>
                </div>
                <Button onClick={toggleDarkMode}>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
            </Nav>
        </StyledHeader>
    );
};

export default Header;