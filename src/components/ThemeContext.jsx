import React, { createContext, useState, useMemo, useContext } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

const ThemeContext = createContext()

export function ThemeProviderWrapper({ children }) {
  const [mode, setMode] = useState("light")

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#0057FF" : "#3388FF",
          },
        },
        components: {
          MuiTypography: {
            styleOverrides: {
              root: {
                color: mode === "light" ? "#000" : "#FFF",
                "&.title": {
                  backgroundColor:
                    mode === "light"
                      ? "rgba(0, 0, 0, 0)"
                      : "rgba(255, 255, 255, 0)",
                  padding: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor:
                      mode === "light"
                        ? "rgba(0, 0, 0, 0.1)"
                        : "rgba(255, 255, 255, 0.2)",
                  },
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              outlinedSecondary: {
                color:  mode === "light"
                ? "rgba(0, 0, 0, 0.61)"
                : "rgba(255, 255, 255, 0.76)",
                borderColor: "divider",
                "&:hover": mode === "light"
                ? { backgroundColor: "rgba(0, 87, 255, 0.1)" }
                : { backgroundColor: "rgba(255, 255, 255, 0.1)" }
              },
            },
          },
        },
      }),
    [mode]
  )
  
  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useThemeMode() {
  return useContext(ThemeContext)
}
