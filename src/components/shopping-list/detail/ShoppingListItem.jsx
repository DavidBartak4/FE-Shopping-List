import React, { useState, useContext } from "react"
import {
  TableRow,
  TableCell,
  Grid,
  Paper,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { ShoppingListDetailContext } from "./ShoppingListDetailProvider"
import { useTranslation } from "../../TranslationContext"

function ShoppingListItem({ item, isTileView }) {
  const [anchor, setAnchor] = useState(null)
  const { toggleResolved, deleteItem } = useContext(ShoppingListDetailContext)
  const { translate } = useTranslation()

  const ellipsisTextStyle = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "block",
    maxWidth: isTileView ? "90%" : "100%",
  }

  const formattedQuantity = item.quantity
    ? new Intl.NumberFormat("en-US").format(item.quantity)
    : item.quantity

  function handleMenuOpen(event) {
    setAnchor(event.currentTarget)
  }

  function handleMenuClose() {
    setAnchor(null)
  }

  function handleToggleResolved() {
    toggleResolved(item._id)
    handleMenuClose()
  }

  function handleDelete() {
    deleteItem(item._id)
    handleMenuClose()
  }

  if (isTileView) {
    return (
      <Grid item xs={12} sm={6} md={4}>
        <Paper
          elevation={3}
          style={{ padding: "16px", position: "relative" }}
        >
          <Typography
            variant="h6"
            style={ellipsisTextStyle}
            sx={{ fontSize: "14px" }}
          >
            {item.name}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "12px" }}>
            {translate("resolved")}: {item.isResolved ? translate("yes") : translate("no")}
          </Typography>
          <Typography
            variant="body2"
            style={ellipsisTextStyle}
            sx={{ fontSize: "12px" }}
          >
            {translate("quantity")}: {formattedQuantity}
          </Typography>
          <IconButton
            onClick={handleMenuOpen}
            style={{ position: "absolute", top: "8px", right: "8px" }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleMenuClose}>
            <MenuItem onClick={handleToggleResolved}>{translate("toggleResolved")}</MenuItem>
            <MenuItem onClick={handleDelete}>{translate("delete")}</MenuItem>
          </Menu>
        </Paper>
      </Grid>
    )
  }

  return (
    <TableRow>
      <TableCell style={{ maxWidth: "200px", fontSize: "12px" }}>
        <span style={ellipsisTextStyle}>{item.name}</span>
      </TableCell>
      <TableCell style={{ fontSize: "12px" }}>
        {item.isResolved ? translate("yes") : translate("no")}
      </TableCell>
      <TableCell style={{ maxWidth: "100px", fontSize: "12px" }}>
        <span style={ellipsisTextStyle}>{formattedQuantity}</span>
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleMenuClose}>
          <MenuItem onClick={handleToggleResolved}>{translate("toggleResolved")}</MenuItem>
          <MenuItem onClick={handleDelete}>{translate("delete")}</MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  )
}

export default ShoppingListItem