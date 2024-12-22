import React, { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack, Typography } from "@mui/material"

function CreateShoppingListForm({ open, onClose, onSubmit }) {
  const [listName, setListName] = useState("")

  function handleListNameChange(e) {
    setListName(e.target.value)
  }

  function handleConfirm() {
    if (listName) {
      onSubmit(listName)
      setListName("")
      onClose()
    }
  }

  function handleCancel() {
    setListName("")
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6" fontSize="20px">
          Create New Shopping List
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <TextField
            label="Name"
            variant="outlined"
            value={listName}
            onChange={handleListNameChange}
            fullWidth
            autoFocus
            size="small"
            InputProps={{
              style: { fontSize: "12px" },
            }}
            InputLabelProps={{
              style: { fontSize: "12px" },
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{ paddingX: 3, paddingY: 2, justifyContent: "flex-end" }}
      >
        <Button
          onClick={handleCancel}
          color="secondary"
          variant="outlined"
          sx={{
            borderRadius: "20px",
            border: "1px solid #B0B0B0",
            color: "secondary",
            padding: "6px 16px",
            fontSize: "12px",
            textTransform: "none",
            marginRight: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          variant="contained"
          sx={{
            borderRadius: "20px",
            padding: "6px 16px",
            fontSize: "12px",
            textTransform: "none",
            backgroundColor: "#0057FF",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#3388FF",
            },
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateShoppingListForm