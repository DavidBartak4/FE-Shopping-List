import React, { createContext, useEffect, useState } from "react"
import axios from "axios"

export const APIContext = createContext()

export function APIProvider({ children }) {
  const api = axios.create({ baseURL: "http://localhost:3000" })
  const [account, setAccount] = useState({ username: "example", password: "12345678", _id: null })

  async function autoSetupTokenTesting() {
    let token = localStorage.getItem("token")
    if (token) {
      try {
        await api.get("/users/user/profile")
      } catch (error) {
        token = null
      }
    }
    if (!token) {
      try {
        const res = await api.post("login", account)
        token = res.data.access_token
      } catch (error) {}
    }
    if (!token) {
      try {
        const res = await api.post("/signup", account)
        token = res.data.access_token
      } catch (error) {}
    }
    token = localStorage.setItem("token", token)
  }

  api.interceptors.request.use(async function(configuration) {
    const token = localStorage.getItem("token")
    configuration.headers.Authorization = `Bearer ${token}`
    return configuration
  })

  async function request(fn) {
    await autoSetupTokenTesting()
    try {
      const res = await fn()
      return res.data
    } catch (error) {
      throw error.response.data
    }
  }

  async function createShoppingList(createShoppingListDto) {
    return await request(async function() {
      return await api.post("/shopping-lists", createShoppingListDto)
    })
  }

  async function getShoppingList(shoppingListId) {
    return await request(async function() {
      return await api.get(`/shopping-lists/${shoppingListId}`)
    })
  }

  async function updateShoppingList(shoppingListId, updateShoppingListDto) {
    return await request(async function() {
      return await api.patch(`/shopping-lists/${shoppingListId}`, updateShoppingListDto)
    })
  }

  async function deleteShoppingList(shoppingListId) {
    return await request(async function() {
      return await api.delete(`/shopping-lists/${shoppingListId}`)
    })
  }

  async function getShoppingLists() {
    return await request(async function() {
      return await api.get("/shopping-lists")
    })
  }

  async function createItem(shoppingListId, createItemDto) {
    return await request(async function() {
      return await api.post(`/shopping-lists/${shoppingListId}/items`, createItemDto)
    })
  }

  async function updateItem(shoppingListId, itemId, updateItemDto) {
    return await request(async function() {
      return await api.patch(`/shopping-lists/${shoppingListId}/items/${itemId}`, updateItemDto)
    })
  }

  async function deleteItem(shoppingListId, itemId) {
    return await request(async function() {
      return await api.delete(`/shopping-lists/${shoppingListId}/items/${itemId}`)
    })
  }

  async function addMember(shoppingListId, userId) {
    return await request(async function() {
      return await api.post(`/shopping-lists/${shoppingListId}/members`, { userId: userId})
    })
  }

  async function removeMember(shoppingListId, memberId) {
    return await request(async function() {
      return await api.delete(`/shopping-lists/${shoppingListId}/members/${memberId}`)
    })
  }

  async function leave(shoppingListId) {
    return await request(async function() {
      return await api.post(`/shopping-lists/${shoppingListId}`)
    })
  }

  async function getUserById(userId) {
    return await request(async function() {
      return await api.get(`/users/${userId}`)
    })
  }

  async function getProfile() {
    return request(async function() {
      return await api.get("/users/user/profile")
    })
  }

  async function signup(signupDto) {
    return request(async function() {
      return await api.post("/signup", signupDto)
    })
  }

  useEffect(function() {
    async function init() {
      const profile = await getProfile()
      setAccount((prev) => ({ ...prev, _id: profile._id }))
      for (let i = 1; i <= 3; i++) {
        try {
          await signup({ username: "john_doe" + i, password: "12345678" })
        } catch (error) {}
      }
    }
    init()
  }, [])

  return (
    <APIContext.Provider value={{ 
      account,
      createShoppingList,
      getShoppingList,
      updateShoppingList,
      deleteShoppingList,
      getShoppingLists,
      createItem,
      updateItem,
      deleteItem,
      addMember,
      removeMember,
      leave,
      getUserById
      }}>
      {children}
    </APIContext.Provider>
  )
}