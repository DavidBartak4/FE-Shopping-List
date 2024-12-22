import React from "react"
import { AppBar, Toolbar as MuiToolbar, IconButton, Menu, MenuItem } from "@mui/material"
import { Brightness4, Brightness7 } from "@mui/icons-material"
import { useThemeMode } from "./ThemeContext"
import { useTranslation } from "./TranslationContext"

function Toolbar() {
  const { mode, toggleTheme } = useThemeMode()
  const { language, setLanguage } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleLanguageMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <MuiToolbar>
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <IconButton onClick={handleLanguageMenuOpen} color="inherit">
          {language.toUpperCase()}
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={() => handleLanguageChange("en")}>EN</MenuItem>
          <MenuItem onClick={() => handleLanguageChange("cz")}>CZ</MenuItem>
        </Menu>
      </MuiToolbar>
    </AppBar>
  )
}

export default Toolbar
