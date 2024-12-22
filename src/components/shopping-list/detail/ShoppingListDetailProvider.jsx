import { createContext, useEffect, useState, useContext } from "react"
import { APIContext } from "../APIProvider"

const ShoppingListDetailContext = createContext()

function ShoppingListDetailProvider({ shoppingListId, children }) {
  const [data, setData] = useState(null)
  const [filterOption, setFilterOption] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const {
    getShoppingList,
    createItem,
    deleteItem: deleteItemAPI,
    updateItem,
    updateShoppingList,
    addMember: addMemberAPI,
    removeMember: removeMemberAPI,
    account
  } = useContext(APIContext)
  const isOwner = account._id && data?.ownerId && account._id === data.ownerId

  useEffect(() => {
    async function fetchShoppingList() {
      try {
        const shoppingListDetailData = await getShoppingList(shoppingListId)
        setData(shoppingListDetailData)
      } catch (error) {
        console.error("Failed to fetch shopping list details:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchShoppingList()
  }, [shoppingListId, getShoppingList])

  function rename(name) {
    updateShoppingList(shoppingListId, { name })
    .then(() => {
      setData((prevData) => ({
        ...prevData,
        name,
      }))
    })
    .catch((error) => console.error("Failed to rename shopping list:", error))
  }

  function addItem(item) {
    createItem(shoppingListId, {
      name: item.name,
      quantity: Number(item.quantity),
    })
      .then((newItem) => {
        setData((prevData) => ({
          ...prevData,
          items: [...prevData.items, { ...newItem, isResolved: false }],
        }))
      })
      .catch((error) => console.error("Failed to add item:", error))
  }

  function deleteItem(itemId) {
    deleteItemAPI(shoppingListId, itemId)
      .then(() => {
        setData((prevData) => ({
          ...prevData,
          items: prevData.items.filter((item) => item._id !== itemId),
        }))
      })
      .catch((error) => console.error("Failed to delete item:", error))
  }

  function toggleResolved(itemId) {
    const item = data?.items?.find((item) => item._id === itemId)
    if (!item) return

    const updatedItem = { ...item, isResolved: !item.isResolved }

    updateItem(shoppingListId, itemId, updatedItem)
      .then(() => {
        setData((prevData) => ({
          ...prevData,
          items: prevData.items.map((i) =>
            i._id === itemId ? updatedItem : i
          ),
        }))
      })
      .catch((error) =>
        console.error("Failed to toggle item resolution:", error)
      )
  }

  function addMember(userId) {
    if (!data?.members?.includes(userId)) {
      addMemberAPI(shoppingListId, userId)
        .then(() => {
          setData((prevData) => ({
            ...prevData,
            members: [...prevData.members, userId],
          }))
        })
        .catch((error) => console.error("Failed to add member:", error))
    }
  }

  function removeMember(userId) {
    removeMemberAPI(shoppingListId, userId)
      .then(() => {
        setData((prevData) => ({
          ...prevData,
          members: prevData.members.filter((memberId) => memberId !== userId),
        }))
      })
      .catch((error) => console.error("Failed to remove member:", error))
  }

  function setFilter(option) {
    setFilterOption(option)
  }

  const filteredItems =
    data?.items?.filter((item) => {
      if (filterOption === "resolved") return item.isResolved
      if (filterOption === "unresolved") return !item.isResolved
      return true
    }) || []

  return (
    <ShoppingListDetailContext.Provider
      value={{
        isLoading,
        account,
        rename,
        data,
        isOwner,
        addItem,
        deleteItem,
        toggleResolved,
        setFilter,
        filteredItems,
        addMember,
        removeMember,
      }}
    >
      {children}
    </ShoppingListDetailContext.Provider>
  )
}

export { ShoppingListDetailContext, ShoppingListDetailProvider }