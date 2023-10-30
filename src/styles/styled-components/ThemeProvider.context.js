import { createContext, useState } from 'react';

export const ThemeProviderContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProviderContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeProviderContext.Provider>
    );
};