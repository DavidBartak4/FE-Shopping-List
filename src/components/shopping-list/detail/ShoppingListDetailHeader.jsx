import React, { useState, useContext } from "react"
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  Box,
  Stack,
  TextField,
  useMediaQuery,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import FilterListIcon from "@mui/icons-material/FilterList"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import AddIcon from "@mui/icons-material/Add"
import CheckIcon from "@mui/icons-material/Check"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import CreateItemForm from "./CreateItemForm"
import ShoppingListCollaborate from "../ShoppingListCollaborate"
import { ShoppingListDetailContext } from "./ShoppingListDetailProvider"
import { useTranslation } from "../../TranslationContext"
import PieChartIcon from "@mui/icons-material/PieChart"
import PieChartDialog from "./PieChartDialog"

function ShoppingListDetailHeader({
  name,
  isOwner,
  onFilterChange,
  onRename,
  members,
  owner,
}) {
  const [filterAnchorEl, setFilterAnchorEl] = useState(null)
  const [filterOption, setFilterOption] = useState("all")
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(name)
  const [createItemOpen, setCreateItemOpen] = useState(false)
  const [collaborateOpen, setCollaborateOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isNarrowScreen = useMediaQuery("(max-width:650px)")
  const navigate = useNavigate()
  const { translate } = useTranslation()

  const { addItem, data, removeMember, addMember, account } = useContext(
    ShoppingListDetailContext
  )

  const [pieChartOpen, setPieChartOpen] = useState(false) 
  const resolvedCount = data?.items?.filter((item) => item.isResolved).length || 0
  const unresolvedCount =
    (data?.items?.length || 0) - resolvedCount

  const chartData = [
    { name: translate("resolved"), value: resolvedCount },
    { name: translate("unresolved"), value: unresolvedCount },
  ]
  const COLORS = ["#4CAF50", "#FF5722"]
  
  function handlePieChartOpen() {
    setPieChartOpen(true)
  }

  function handlePieChartClose() {
    setPieChartOpen(false)
  }

  function handleFilterClick(event) {
    setFilterAnchorEl(event.currentTarget)
  }

  function handleFilterClose() {
    setFilterAnchorEl(null)
  }

  function handleFilterChange(option) {
    setFilterOption(option)
    onFilterChange && onFilterChange(option)
    setFilterAnchorEl(null)
  }

  function handleTitleClick() {
    if (isOwner) setIsEditing(true)
  }

  function handleTitleChange(event) {
    setTitle(event.target.value)
  }

  function handleTitleBlur() {
    setIsEditing(false)
    if (title !== name) {
      onRename(title)
    }
  }

  function handleCreateItemOpen() {
    setCreateItemOpen(true)
  }

  function handleCreateItemClose() {
    setCreateItemOpen(false)
  }

  function handleCreateItemSubmit(item) {
    addItem(item)
    setCreateItemOpen(false)
  }

  function handleCollaborateOpen() {
    setCollaborateOpen(true)
  }

  function handleCollaborateClose() {
    setCollaborateOpen(false)
  }

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen)
  }

  const filterLabel =
    filterOption === "resolved"
      ? translate("resolved")
      : filterOption === "unresolved"
      ? translate("unresolved")
      : translate("all")

  const buttonStyles = {
    textTransform: "none",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    color: "#000000",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
  }

  return (
    <Box
      px={2}
      mb={2}
      sx={(theme) => ({
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgb(255, 255, 255)"
            : "rgba(0, 0, 0, 0.93)",
      })}
    >
      {isEditing ? (
        <TextField
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          variant="outlined"
          autoFocus
          fullWidth
          inputProps={{
            style: { fontSize: "2rem", fontWeight: "bold", padding: "8px" },
          }}
        />
      ) : (
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          onClick={handleTitleClick}
          sx={{
            cursor: isOwner ? "pointer" : "default",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            padding: "8px",
            borderRadius: "4px",
            "&:hover": isOwner && {
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              transition: "background-color 0.2s ease-in-out",
            },
          }}
        >
          {title}
        </Typography>
      )}
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
                <ListItem button onClick={handleCreateItemOpen}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary={translate("new")} />
                </ListItem>
                <Divider />
                <ListItem button onClick={handleFilterClick}>
                  <ListItemIcon>
                    <FilterListIcon />
                  </ListItemIcon>
                  <ListItemText primary={filterLabel} />
                </ListItem>
                <Divider />
                <ListItem button onClick={handleCollaborateOpen}>
                  <ListItemIcon>
                    <GroupAddIcon />
                  </ListItemIcon>
                  <ListItemText primary={translate("collaborate")} />
                </ListItem>
                <Divider />
                <ListItem button onClick={handlePieChartOpen}>
                  <ListItemIcon>
                    <PieChartIcon />
                  </ListItemIcon>
                  <ListItemText primary={translate("pieChart")} />
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </>
      ) : (
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="contained"
            onClick={handleCreateItemOpen}
            sx={buttonStyles}
          >
            <AddIcon sx={{ marginRight: "8px" }} />
            {translate("new")}
          </Button>
          <Button
            variant="contained"
            onClick={handleFilterClick}
            sx={buttonStyles}
          >
            <FilterListIcon sx={{ marginRight: "8px" }} />
            {filterLabel}
          </Button>
          <Button
            variant="contained"
            onClick={handleCollaborateOpen}
            sx={buttonStyles}
          >
            <GroupAddIcon sx={{ marginRight: "8px" }} />
            {translate("collaborate")}
          </Button>
          <Button
            variant="contained"
            onClick={handlePieChartOpen}
            sx={buttonStyles}
          >
            <PieChartIcon sx={{ marginRight: "8px" }} />
            {translate("pieChart")}
          </Button>
        </Stack>
      )}


<PieChartDialog
        pieChartOpen={pieChartOpen}
        handlePieChartClose={handlePieChartClose}
        chartData={chartData}
        COLORS={COLORS}
        resolvedCount={resolvedCount}
        unresolvedCount={unresolvedCount}
        translate={translate}
      />



      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
      >
        <MenuItem onClick={() => handleFilterChange("resolved")}>
          {filterOption === "resolved" && (
            <CheckIcon fontSize="small" sx={{ marginRight: "8px" }} />
          )}
          {translate("resolved")}
        </MenuItem>
        <MenuItem onClick={() => handleFilterChange("unresolved")}>
          {filterOption === "unresolved" && (
            <CheckIcon fontSize="small" sx={{ marginRight: "8px" }} />
          )}
          {translate("unresolved")}
        </MenuItem>
        <MenuItem onClick={() => handleFilterChange("all")}>
          {filterOption === "all" && (
            <CheckIcon fontSize="small" sx={{ marginRight: "8px" }} />
          )}
          {translate("all")}
        </MenuItem>
      </Menu>
      <CreateItemForm
        open={createItemOpen}
        onClose={handleCreateItemClose}
        onSubmit={handleCreateItemSubmit}
      />
      <ShoppingListCollaborate
        open={collaborateOpen}
        onClose={handleCollaborateClose}
        isOwner={isOwner}
        members={members}
        owner={owner}
        data={data}
        addMember={addMember}
        removeMember={removeMember}
        onLeaveCollaboration={function() {
          removeMember(account._id)
          navigate("/shopping-lists")
        }}
      />
    </Box>
  )
}

export default ShoppingListDetailHeader
