import React, { createContext, useState, useEffect, useContext } from "react"
import { APIContext } from "../APIProvider"

export const ShoppingListsContext = createContext()

export function ShoppingListsProvider({ children }) {
  const [shoppingLists, setShoppingLists] = useState([])
  const [filterOption, setFilterOption] = useState("all")
  const { 
    getShoppingLists, 
    createShoppingList, 
    deleteShoppingList, 
    addMember, 
    removeMember, 
    updateShoppingList,
    account
  } = useContext(APIContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchShoppingLists() {
      try {
        const lists = await getShoppingLists()
        const listsWithBadges = lists.map((list) => ({
          ...list,
          resolvedCount: list.items.filter((item) => item.isResolved).length,
          totalCount: list.items.length,
        }))
        setShoppingLists(listsWithBadges)
      } catch (error) {
        console.error("Failed to fetch shopping lists:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchShoppingLists()
  }, [getShoppingLists])

  async function createShoppingListHandler(name) {
    try {
      const newList = await createShoppingList({ name })
      const listWithBadge = {
        ...newList,
        resolvedCount: 0,
        totalCount: 0,
      }
      setShoppingLists((prevLists) => [...prevLists, listWithBadge])
    } catch (error) {
      console.error("Failed to create shopping list:", error)
    }
  }

  async function toggleArchived(listId) {
    const list = shoppingLists.find((l) => l._id === listId)
    if (!list) return

    try {
      const updatedList = await updateShoppingList(listId, { isArchived: !list.isArchived })
      setShoppingLists((prevLists) =>
        prevLists.map((l) =>
          l._id === listId
            ? {
                ...updatedList,
                resolvedCount: updatedList.items.filter((item) => item.isResolved).length,
                totalCount: updatedList.items.length,
              }
            : l
        )
      )
    } catch (error) {
      console.error("Failed to toggle archive state:", error)
    }
  }

  async function deleteShoppingListHandler(listId) {
    try {
      await deleteShoppingList(listId)
      setShoppingLists((prevLists) => prevLists.filter((list) => list._id !== listId))
    } catch (error) {
      console.error("Failed to delete shopping list:", error)
    }
  }

  async function addMemberHandler(listId, email) {
    try {
      await addMember(listId, email)
      setShoppingLists((prevLists) =>
        prevLists.map((list) =>
          list._id === listId
            ? { ...list, members: [...list.members, email] }
            : list
        )
      )
    } catch (error) {
      console.error("Failed to add member:", error)
    }
  }

  async function removeMemberHandler(listId, email) {
    try {
      await removeMember(listId, email)
      setShoppingLists((prevLists) =>
        prevLists.map((list) =>
          list._id === listId
            ? { ...list, members: list.members.filter((member) => member !== email) }
            : list
        )
      )
    } catch (error) {
      console.error("Failed to remove member:", error)
    }
  }

  function setFilter(option) {
    setFilterOption(option)
  }

  const filteredLists = shoppingLists
    .filter((list) => list.members.includes(account._id))
    .filter((list) => {
      if (filterOption === "archived") return list.isArchived
      if (filterOption === "unarchived") return !list.isArchived
      return true
    })

  return (
    <ShoppingListsContext.Provider
      value={{
        isLoading,
        lockedInUser: account._id,
        shoppingLists,
        filteredLists,
        createShoppingList: createShoppingListHandler,
        toggleArchived,
        deleteShoppingList: deleteShoppingListHandler,
        addMember: addMemberHandler,
        removeMember: removeMemberHandler,
        setFilter,
      }}
    >
      {children}
    </ShoppingListsContext.Provider>
  )
}
