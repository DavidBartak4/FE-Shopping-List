import { useParams } from "react-router-dom"
import { ShoppingListDetailProvider } from "./ShoppingListDetailProvider"
import ShoppingListDetail from "./ShoppingListDetail"
import Toolbar from "../../Toolbar"

function ShoppingListDetailPage() {
  const { shoppingListId } = useParams()
  return (
    <ShoppingListDetailProvider shoppingListId={shoppingListId}>
      <Toolbar/>
      <ShoppingListDetail />
    </ShoppingListDetailProvider>
  )
}

export default ShoppingListDetailPage