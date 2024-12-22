import React from "react"
import { ShoppingListsProvider } from "./ShoppingListsProvider"
import ShoppingListsOverview from "./ShoppingListsOverview"
import Toolbar from "../../Toolbar"

function ShoppingListOverviewPage() {
  return (
    <ShoppingListsProvider>
      <Toolbar/>
      <ShoppingListsOverview />
    </ShoppingListsProvider>
  )
}

export default ShoppingListOverviewPage