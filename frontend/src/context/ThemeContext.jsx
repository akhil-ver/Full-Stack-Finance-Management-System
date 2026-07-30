import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isGreyTheme, setIsGreyTheme] = useState(false);

    useEffect(() => {
        if (isGreyTheme) {
            document.body.classList.add('bg-gray-200');
            document.body.classList.remove('bg-gray-50');
        } else {
            document.body.classList.add('bg-gray-50');
            document.body.classList.remove('bg-gray-200');
        }
    }, [isGreyTheme]);

    return (
        <ThemeContext.Provider value={{ isGreyTheme, setIsGreyTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
