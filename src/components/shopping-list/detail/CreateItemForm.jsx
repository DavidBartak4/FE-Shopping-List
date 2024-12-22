import React, { useState } from "react"
import {
  Typography,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material"
import { useTranslation } from "../../TranslationContext"

function CreateItemForm({ open, onClose, onSubmit }) {
  const [itemName, setItemName] = useState("")
  const [quantity, setQuantity] = useState("")
  const { translate } = useTranslation()

  function handleItemNameChange(e) {
    setItemName(e.target.value)
  }

  function handleQuantityChange(e) {
    const input = e.target.value.replace(/,/g, "")
    const parsedValue = parseFloat(input)

    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setQuantity(new Intl.NumberFormat("en-US").format(parsedValue))
    } else if (input === "") {
      setQuantity("")
    }
  }

  function handleConfirm() {
    if (itemName && quantity) {
      onSubmit({ name: itemName, quantity: quantity.replace(/,/g, "") })
      setItemName("")
      setQuantity("")
      onClose()
    }
  }

  function handleCancel() {
    setItemName("")
    setQuantity("")
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6" fontSize="20px">
          {translate("createNewItem")}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <TextField
            label={translate("name")} 
            variant="outlined"
            value={itemName}
            onChange={handleItemNameChange}
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
          <TextField
            label={translate("quantity")}
            variant="outlined"
            value={quantity}
            onChange={handleQuantityChange}
            fullWidth
            size="small"
            InputProps={{
              inputMode: "numeric",
              style: { fontSize: "12px" },
              inputProps: {
                style: { MozAppearance: "textfield" },
                min: 0,
              },
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
          {translate("cancel")}
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
          {translate("create")}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateItemForm