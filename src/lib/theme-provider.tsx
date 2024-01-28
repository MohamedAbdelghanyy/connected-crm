import Cookies from 'js-cookie';
import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextProps {
  theme: string;
  setTheme: (newTheme: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const initialTheme = Cookies.get('theme');
  const [theme, setThemeValue] = useState(initialTheme && initialTheme == 'light' ? 'light' : 'dark');

  const setTheme = (value: string) => {
    const newTheme = (value == 'light' ? 'light' : 'dark');
    setThemeValue(newTheme);
    Cookies.set('theme', newTheme);
  };

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.className = theme;
      htmlElement.style.colorScheme = theme;
    }
  }, [theme]);


  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
