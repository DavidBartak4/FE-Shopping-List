import React, { useState, useContext } from "react"
import { Button, Menu, MenuItem, Typography, Box, Stack, IconButton, Drawer, List, ListItem, ListItemText, Divider, ListItemIcon, useMediaQuery } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import FilterListIcon from "@mui/icons-material/FilterList"
import CheckIcon from "@mui/icons-material/Check"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import CreateShoppingListForm from "./CreateShoppingListForm"
import { ShoppingListsContext } from "./ShoppingListsProvider"
import { useTranslation } from "../../TranslationContext"

function ShoppingListsOverviewHeader({ onFilterChange }) {
  const [filterAnchorEl, setFilterAnchorEl] = useState(null)
  const [filterOption, setFilterOption] = useState("all")
  const [createFormOpen, setCreateFormOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { createShoppingList } = useContext(ShoppingListsContext)
  const { translate } = useTranslation()

  const isNarrowScreen = useMediaQuery("(max-width:500px)")

  function handleFilterClick(event) {
    setFilterAnchorEl(event.currentTarget)
  }

  function handleFilterClose(option) {
    setFilterAnchorEl(null)
    if (option) {
      setFilterOption(option)
      onFilterChange(option)
    }
  }

  function handleCreateListOpen() {
    setCreateFormOpen(true)
  }

  function handleCreateListClose() {
    setCreateFormOpen(false)
  }

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen)
  }

  const renderMenuItem = (option, label) => (
    <MenuItem
      onClick={() => handleFilterClose(option)}
      sx={{ fontSize: "14px", padding: "4px 8px" }}
    >
      {filterOption === option && (
        <CheckIcon fontSize="small" sx={{ marginRight: "8px" }} />
      )}
      {label}
    </MenuItem>
  )

  const filterLabel =
    filterOption === "archived"
      ? translate("archived")
      : filterOption === "unarchived"
      ? translate("unarchived")
      : translate("all")

  return (
    <Box px={2} mb={2}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "100%",
          padding: "8px",
          borderRadius: "4px",
        }}
      >
        {translate("shoppingLists")}
      </Typography>
      {isNarrowScreen ? (
        <>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
            <Box sx={{ width: 250, padding: 2 }}>
              <IconButton onClick={toggleDrawer} sx={{ alignSelf: "flex-end" }}>
                <CloseIcon />
              </IconButton>
              <List>
                <ListItem button onClick={handleCreateListOpen}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="New" />
                </ListItem>
                <Divider />
                <ListItem button onClick={handleFilterClick}>
                  <ListItemIcon>
                    <FilterListIcon />
                  </ListItemIcon>
                  <ListItemText primary={filterLabel} />
                </ListItem>
                <Menu
                  anchorEl={filterAnchorEl}
                  open={Boolean(filterAnchorEl)}
                  onClose={() => handleFilterClose(null)}
                >
            {renderMenuItem("all", translate("all"))}
            {renderMenuItem("archived", translate("archived"))}
            {renderMenuItem("unarchived", translate("unarchived"))}
                </Menu>
              </List>
            </Box>
          </Drawer>
        </>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="flex-start"
          sx={{
            flexWrap: "nowrap",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            onClick={handleCreateListOpen}
            sx={{
              textTransform: "none",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              color: "#000000",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <AddIcon sx={{ marginRight: "8px" }} />
            {translate("new")}
          </Button>
          <Button
            variant="contained"
            onClick={handleFilterClick}
            sx={{
              textTransform: "none",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              color: "#000000",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FilterListIcon sx={{ marginRight: "8px" }} />
            {filterLabel}
          </Button>
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={() => handleFilterClose(null)}
          >
            {renderMenuItem("all", translate("all"))}
            {renderMenuItem("archived", translate("archived"))}
            {renderMenuItem("unarchived", translate("unarchived"))}
          </Menu>
        </Stack>
      )}
      <CreateShoppingListForm
        open={createFormOpen}
        onClose={handleCreateListClose}
        onSubmit={(listName) => createShoppingList(listName)}
      />
    </Box>
  )
}

export default ShoppingListsOverviewHeader