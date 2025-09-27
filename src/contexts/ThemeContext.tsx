import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import type { ThemeOptions } from "@mui/material/styles";

interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface CustomThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const getThemeOptions = (isDark: boolean): ThemeOptions => ({
    palette: {
      mode: isDark ? "dark" : "light",
      primary: {
        main: "#2196F3",
      },
      background: {
        default: isDark ? "#151D32" : "#F3FAFE",
        paper: isDark ? "#292F45" : "#E1E9EE",
      },
      text: {
        primary: isDark ? "#F3F4F7" : "#003464",
        secondary: isDark ? "#F3F3F3" : "#000000",
      },
    },
    typography: {
      fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
      h2: {
        fontSize: "2rem", // 32px
        fontWeight: 600,
      },
      h3: {
        fontSize: "1.5rem", // 24px
        fontWeight: 600,
      },
      h4: {
        fontSize: "1.25rem", // 20px
        fontWeight: 600,
      },
      h5: {
        fontSize: "1rem", // 16px
        fontWeight: 500,
      },
      h6: {
        fontSize: "0.85rem", // 14px
        fontWeight: 500,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: isDark
              ? "0 4px 20px rgba(0,0,0,0.3)"
              : "0 4px 20px rgba(0,0,0,0.1)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
          },
        },
      },
    },
  });

  const theme = createTheme(getThemeOptions(darkMode));

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
