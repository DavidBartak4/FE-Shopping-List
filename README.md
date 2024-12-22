[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mI_B31_F)

lockedInUser

1. GET http://localhost:3000/shopping-lists
    returns array of shopping lists:
    [
        _id: string
        name: string,
        owner: string,
        isArchived: boolean,
        members: [string],
        items: [
            {
                _id: string,
                name: string,
                isResolved: boolean,
                quantity: number
            }
        ]
    ]

3. POST http://localhost:3000/shoppinglists
    returns created shopping list:
    _id: string
    name: string,
    owner: string,
    isArchived: boolean,
    members: [string],
    items: [
        {
            _id: string,
            name: string,
            isResolved: boolean,
            quantity: number
        }
    ]

4. POST http://localhost:3000/shopping-lists/0/leave
    leave shopping list command.

5. GET http://localhost:3000/shopping-lists/0
    returns shopping list by id:
    _id: string
    name: string,
    owner: string,
    isArchived: boolean,
    members: [string],
    items: [
        {
            _id: string,
            name: string,
            isResolved: boolean,
            quantity: number
        }
    ]

6. PATCH http://localhost:3000/shopping-lists/0
    returns updated shopping list (name, isArchived):
    _id: string
    name: string,
    owner: string,
    isArchived: boolean,
    members: [string],
    items: [
        {
            _id: string,
            name: string,
            isResolved: boolean,
            quantity: number
        }
    ]

7. DELETE http://localhost:3000/0
    command for deleting shopping list.

8. POST http://localhost:3000/shopping-lists/item
    returns created item for a shopping list (name, quantity):
    {
        _id: string,
        name: string,
        isResolved: boolean,
        quantity: number
    }

9. PATCH http://localhost:3000/shopping-lists/items/0
    returns updated item for a shopping list (name, quantity, isResolved):
    {
        _id: string,
        name: string,
        isResolved: boolean,
        quantity: number
    }

10. DELETE http://localhost:3000/shopping-lists/items/0
    command for deleting item from a shopping list.