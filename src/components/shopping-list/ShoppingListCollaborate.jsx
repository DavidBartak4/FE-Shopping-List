import React, { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Typography,
  IconButton,
  Stack,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useTranslation } from "../TranslationContext"

function ShoppingListCollaborate({
  open,
  onClose,
  isOwner,
  members,
  owner,
  data,
  addMember,
  removeMember,
  onLeaveCollaboration,
}) {
  const [isAdding, setIsAdding] = useState(false)
  const [emails, setEmails] = useState([])
  const [newEmail, setNewEmail] = useState("")
  const [notifyPeople, setNotifyPeople] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedMember, setSelectedMember] = useState(null)
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false)
  const { translate } = useTranslation()

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  function handleEmailChange(e) {
    setNewEmail(e.target.value)
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && newEmail.trim()) {
      setEmails((prevEmails) => [...prevEmails, newEmail.trim()])
      setNewEmail("")
      setIsAdding(true)
    } else if (e.key === "Backspace" && !newEmail.trim() && emails.length > 0) {
      setEmails((prevEmails) => prevEmails.slice(0, -1))
    }
  }

  function handleRemoveEmail(emailToRemove) {
    const updatedEmails = emails.filter((email) => email !== emailToRemove)
    setEmails(updatedEmails)
  }

  function handleBackClick() {
    setIsAdding(false)
    setEmails([])
    setNewEmail("")
    document.activeElement.blur()
  }

  function handleNotifyChange() {
    setNotifyPeople((prev) => !prev)
  }

  function handleMenuClick(event, member) {
    setAnchorEl(event.currentTarget)
    setSelectedMember(member)
  }

  function handleMenuClose() {
    setAnchorEl(null)
    setSelectedMember(null)
  }

  function handleRemoveMember() {
    if (selectedMember) {
      removeMember(selectedMember)
    }
    handleMenuClose()
  }

  function handleLeaveClick(event) {
    setLeaveDialogOpen(true)
    event.currentTarget.blur()
  }

  function handleLeaveConfirm() {
    setLeaveDialogOpen(false)
    onClose()
    if (onLeaveCollaboration) {
      onLeaveCollaboration()
    }
  }

  function handleLeaveCancel() {
    setLeaveDialogOpen(false)
  }

  function handleShareOrSend() {
    if (isAdding) {
      emails.forEach((email) => addMember(email))
      setIsAdding(false)
      setEmails([])
      setNewEmail("")
    } else {
      onClose()
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth={isSmallScreen ? "xs" : "sm"}
      >
        <DialogTitle>
          {isAdding ? (
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton onClick={handleBackClick}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" fontSize="20px">
                {translate("addPeople")}
              </Typography>
            </Stack>
          ) : (
            <Typography variant="h6" fontSize="20px">
              {translate("collaboration")}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent dividers sx={{ paddingY: isOwner ? 2 : 1 }}>
          {isOwner && (
            <TextField
              fullWidth
              placeholder={translate("addPeople")}
              value={newEmail}
              onChange={handleEmailChange}
              onKeyDown={handleKeyDown}
              variant="outlined"
              size="small"
              InputProps={{
                style: { fontSize: "12px" },
                startAdornment: (
                  <>
                    {emails.map((email) => (
                      <Chip
                        key={email}
                        label={email}
                        onDelete={() => handleRemoveEmail(email)}
                        style={{ margin: "4px" }}
                        size="small"
                      />
                    ))}
                  </>
                ),
              }}
            />
          )}
          {!isAdding && (
            <Typography
              variant="subtitle1"
              fontSize="12px"
              sx={{ marginTop: isOwner ? 2 : 0, marginBottom: 1 }}
            >
              {translate("members")}:
            </Typography>
          )}

          {!isAdding && (
            <List
              sx={{
                maxHeight: 150,
                overflow: "auto",
                borderRadius: "8px",
                backgroundColor: "#f5f5f5",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                padding: 0,
              }}
            >
              {members.map((member, index) => (
                <ListItem
                  key={index}
                  sx={{
                    paddingX: 2,
                    paddingY: 1,
                    backgroundColor:
                      theme.palette.mode === "light" ? "#f5f5f5" : "#424242",
                  }}
                  secondaryAction={
                    isOwner &&
                    member !== owner && (
                      <>
                        <IconButton
                          onClick={(e) => handleMenuClick(e, member)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl) && selectedMember === member}
                          onClose={handleMenuClose}
                        >
                          <MenuItem
                            onClick={handleRemoveMember}
                            sx={{ fontSize: "14px" }}
                          >
                            {translate("removeMember")}
                          </MenuItem>
                        </Menu>
                      </>
                    )
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={member.iconUrl || ""} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={member}
                    secondary={member === owner ? translate("owner") : ""}
                    primaryTypographyProps={{ fontSize: "12px" }}
                    secondaryTypographyProps={{
                      fontSize: "12px",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          )}

          {isAdding && isOwner && (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={notifyPeople}
                    onChange={handleNotifyChange}
                  />
                }
                label={
                  <Typography fontSize="12px">
                    {translate("notifyPeople")}
                  </Typography>
                }
                sx={{ marginTop: 2 }}
              />
              {notifyPeople && (
                <TextField
                  label={translate("message")}
                  placeholder={translate("message")}
                  multiline
                  rows={2}
                  fullWidth
                  margin="normal"
                  size="small"
                  InputProps={{ style: { fontSize: "12px" } }}
                  InputLabelProps={{ style: { fontSize: "12px" } }}
                />
              )}
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ paddingX: 3, paddingY: 2 }}>
          {isAdding ? (
            <>
              <Button
                onClick={handleBackClick}
                color="secondary"
                variant="outlined"
                disableRipple
                disableFocusRipple
                sx={{
                  borderRadius: "20px",
                  border: "1px solid #B0B0B0",
                  padding: "6px 16px",
                  fontSize: "12px",
                  textTransform: "none",
                  marginRight: "auto",
                }}
              >
                {translate("cancel")}
              </Button>
              <Button
                onClick={handleShareOrSend}
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
                {notifyPeople ? translate("send") : translate("share")}
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleLeaveClick}
                color="secondary"
                variant="outlined"
                disableRipple
                disableFocusRipple
                sx={{
                  borderRadius: "20px",
                  border: "1px solid #B0B0B0",
                  padding: "6px 16px",
                  fontSize: "12px",
                  textTransform: "none",
                  marginRight: "auto",
                }}
              >
                {translate("leaveCollaboration")}
              </Button>
              <Button
                onClick={handleShareOrSend}
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
                {translate("done")}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={leaveDialogOpen}
        onClose={handleLeaveCancel}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>{translate("confirmLeave")}</DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            sx={{ fontSize: "14px", marginBottom: 2 }}
          >
            {translate("leaveConfirmDialog")}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ paddingX: 3, paddingY: 2, justifyContent: "flex-end" }}>
          <Button
            onClick={handleLeaveCancel}
            color="secondary"
            variant="outlined"
            sx={{
              borderRadius: "20px",
              border: `1px solid ${theme.palette.divider}`,
              color: theme.palette.text.secondary,
              padding: "6px 16px",
              fontSize: "12px",
              textTransform: "none",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "rgba(0, 87, 255, 0.1)"
                    : "rgba(255, 255, 255, 0.1)",
              },
              marginRight: 1,
            }}
          >
            {translate("cancel")}
          </Button>
          <Button
            onClick={handleLeaveConfirm}
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
    </>
  )
}

export default ShoppingListCollaborate