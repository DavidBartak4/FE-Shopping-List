import React, { useContext, useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Grid,
  Skeleton,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ShoppingListsOverviewHeader from "./ShoppingListsOverviewHeader"
import { ShoppingListsContext } from "./ShoppingListsProvider"
import ShoppingListCollaborate from "../ShoppingListCollaborate"
import { useTranslation } from "../../TranslationContext"
function ShoppingListsOverview() {
  const {
    filteredLists,
    setFilter,
    toggleArchived,
    deleteShoppingList,
    addMember,
    removeMember,
    lockedInUser,
    isLoading,
  } = useContext(ShoppingListsContext)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const [selectedListId, setSelectedListId] = useState(null)
  const [collaborateOpen, setCollaborateOpen] = useState(false)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [isTileView, setIsTileView] = useState(false)
  const containerRef = React.useRef(null)
  const { translate } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const minRequiredWidth = 600
        setIsTileView(containerWidth < minRequiredWidth)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  function handleFilterChange(option) {
    setFilter(option)
  }

  function handleMenuOpen(event, listId) {
    setMenuAnchorEl(event.currentTarget)
    setSelectedListId(listId)
  }

  function handleMenuClose() {
    setMenuAnchorEl(null)
  }

  function handleToggleArchived() {
    toggleArchived(selectedListId)
    handleMenuClose()
  }

  function handleDeleteConfirmation() {
    setConfirmDeleteOpen(true)
    handleMenuClose()
  }

  function handleConfirmDelete() {
    deleteShoppingList(selectedListId)
    setConfirmDeleteOpen(false)
  }

  function handleCancelDelete() {
    setConfirmDeleteOpen(false)
  }

  function handleCollaborateOpen() {
    setCollaborateOpen(true)
    handleMenuClose()
  }

  function handleCollaborateClose() {
    setCollaborateOpen(false)
  }

  function handleOpen(shoppingListId) {
    navigate(`/shopping-lists/${shoppingListId}/detail`)
    handleMenuClose()
  }

  function renderListTile(list) {
    return (
      <Grid item xs={12} sm={6} md={4} key={list.id}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "14px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "90%",
            }}
          >
            {list.name}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "12px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                maxWidth: "90%",
              }}
            >
              {translate("owner")}:
            </Typography>
            <Avatar src="" sx={{ width: 24, height: 24, fontSize: "12px" }} />
            <Typography
              variant="body2"
              sx={{
                fontSize: "12px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "90%",
              }}
            >
              {list.ownerId}
            </Typography>
          </Stack>
          <Typography
            variant="h6"
            sx={{
              fontSize: "12px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "90%",
            }}
          >
            {`${translate("resolved")}: ${list.resolvedCount} / ${
              list.totalCount
            }`}
          </Typography>
          <IconButton
            onClick={(event) => handleMenuOpen(event, list._id)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl) && selectedListId === list._id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleOpen(list._id)}>
              {translate("open")}
            </MenuItem>
            <MenuItem onClick={handleToggleArchived}>
              {translate("toggleArchived")}
            </MenuItem>
            {list.ownerId === lockedInUser && (
              <MenuItem onClick={handleDeleteConfirmation}>
                {translate("delete")}
              </MenuItem>
            )}
            <MenuItem onClick={handleCollaborateOpen}>
              {translate("collaboration")}
            </MenuItem>
          </Menu>
        </Paper>
      </Grid>
    )
  }

  const selectedList = filteredLists.find(
    (list) => list._id === selectedListId
  )
  return (
    <div ref={containerRef}>
      <ShoppingListsOverviewHeader onFilterChange={handleFilterChange} />
      {isLoading ? (
        isTileView ? (
          <Grid container spacing={2} sx={{ padding: 2 }}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Skeleton variant="text" width="70%" height={20} />
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Skeleton variant="circular" width={24} height={24} />
                    <Skeleton variant="text" width="50%" height={20} />
                  </Stack>
                  <Skeleton variant="text" width="60%" height={20} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              maxHeight: "400px",
              overflowY: "auto",
              boxShadow: "none",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {translate("name")}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {translate("owner")}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {translate("resolved")}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(6)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="text" width="90%" height={20} />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Skeleton variant="circular" width={24} height={24} />
                        <Skeleton variant="text" width="70%" height={20} />
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="50%" height={20} />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="circular" width={24} height={24} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      ) : isTileView ? (
        <Grid container spacing={2} sx={{ padding: 2 }}>
          {filteredLists.map(renderListTile)}
        </Grid>
      ) : (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            maxHeight: "400px",
            overflowY: "auto",
            boxShadow: "none",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>{translate("name")}</TableCell>
                <TableCell>{translate("owner")}</TableCell>
                <TableCell>{translate("resolved")}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLists.map((list) => (
                <TableRow key={list.id}>
                  <TableCell>
                    <Typography
                      noWrap
                      sx={{
                        fontSize: "12px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {list.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar
                        src=""
                        sx={{ width: 24, height: 24, fontSize: "12px" }}
                      />
                      <Typography
                        noWrap
                        sx={{
                          fontSize: "12px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {list.ownerId}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{`${list.resolvedCount} / ${list.totalCount}`}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(event) => handleMenuOpen(event, list._id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={menuAnchorEl}
                      open={
                        Boolean(menuAnchorEl) && selectedListId === list._id
                      }
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleOpen(list._id)}>
                        {translate("open")}
                      </MenuItem>
                      <MenuItem onClick={handleToggleArchived}>
                        {translate("toggleArchived")}
                      </MenuItem>
                      {list.ownerId === lockedInUser && (
                        <MenuItem onClick={handleDeleteConfirmation}>
                          {translate("delete")}
                        </MenuItem>
                      )}
                      <MenuItem onClick={handleCollaborateOpen}>
                        {translate("collaboration")}
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {selectedList && (
        <ShoppingListCollaborate
          open={collaborateOpen}
          onClose={handleCollaborateClose}
          members={selectedList.members}
          owner={selectedList.ownerId}
          data={{ lockedInUser }}
          isOwner={selectedList.ownerId === lockedInUser}
          addMember={(email) => addMember(selectedList._id, email)}
          removeMember={(email) => removeMember(selectedList._id, email)}
          onLeaveCollaboration={() =>
            removeMember(selectedList._id, lockedInUser)
          }
        />
      )}
      <Dialog
        open={confirmDeleteOpen}
        onClose={handleCancelDelete}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>{translate("confirmDelete")}</DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            sx={{ color: "black", fontSize: "14px", marginBottom: 2 }}
          >
            {translate("confirmDeleteDialog")}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{ paddingX: 3, paddingY: 2, justifyContent: "flex-end" }}
        >
          <Button
            onClick={handleCancelDelete}
            color="secondary"
            variant="outlined"
            sx={{
              borderRadius: "20px",
              border: "1px solid #B0B0B0",
              color: "#4A4A4A",
              padding: "6px 16px",
              fontSize: "12px",
              textTransform: "none",
              "&:hover": { backgroundColor: "rgba(0, 87, 255, 0.1)" },
              marginRight: 1,
            }}
          >
            {translate("cancel")}
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="primary"
            variant="contained"
            sx={{
              borderRadius: "20px",
              padding: "6px 16px",
              fontSize: "12px",
              textTransform: "none",
              backgroundColor: "#0057FF",
              color: "#FFFFFF",
              "&:hover": { backgroundColor: "#3388FF" },
            }}
          >
            {translate("confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ShoppingListsOverview