import React, { useContext, useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableRow, Grid } from "@mui/material"
import { ShoppingListDetailContext } from "./ShoppingListDetailProvider"
import { useTranslation } from "../../TranslationContext"
import ShoppingListDetailHeader from "./ShoppingListDetailHeader"
import ShoppingListItem from "./ShoppingListItem"

function ShoppingListDetail() {
  const { data, filteredItems, setFilter, isOwner, rename, isLoading } = useContext(ShoppingListDetailContext)
  const [isTileView, setIsTileView] = useState(false)
  const containerRef = React.useRef(null)
  const { translate } = useTranslation()

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const minRequiredWidth = 600
        setIsTileView(containerWidth < minRequiredWidth)
      }
    }

    const rafId = requestAnimationFrame(() => handleResize())
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  function handleFilterChange(option) {
    setFilter(option)
  }

  function handleRename(newName) {
    rename(newName)
  }

  if (!data || !data.items) {
    return null
  }

  return (
    <div ref={containerRef}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "white",
        }}
      >
        <ShoppingListDetailHeader
          name={data.name}
          members={data.members}
          isOwner={isOwner}
          owner={data.ownerId}
          onFilterChange={handleFilterChange}
          onRename={handleRename}
        />
      </div>
      <div
        style={{
          height: "400px",
          overflowY: "auto",
        }}
      >
        {isTileView ? (
          <Grid container spacing={2} style={{ padding: "16px" }}>
            {filteredItems.map((item, key) => (
              <ShoppingListItem key={key} item={item} isTileView />
            ))}
          </Grid>
        ) : (
          <Table style={{ width: "100%", tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    width: "40%",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                  }}
                >
                  {translate("name")}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    width: "30%",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                  }}
                >
                  {translate("resolved")}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    width: "30%",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                  }}
                >
                  {translate("quantity")}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    width: "10%",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                  }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((item, key) => (
                <ShoppingListItem key={key} item={item} />
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}

export default ShoppingListDetail
