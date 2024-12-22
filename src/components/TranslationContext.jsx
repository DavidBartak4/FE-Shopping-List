import React, { createContext, useState, useContext } from "react"

const translations = {
  en: {
    all: "All",
    done: "Done",
    confirm: "Confirm",
    owner: "Owner",
    resolved: "Resolved",
    unresolved: "Unresolved",
    new: "New",
    archived: "Archived",
    unarchived: "Unarchived",
    name: "Name", 
    quantity: "Quantity",
    collaborate: "Collaborate",
    create: "Create",
    createNewItem: "Create New Item",
    cancel: "Cancel",
    yes: "Yes",
    no: "No",
    members: "Members",
    leaveCollaboration: "Leave Collaboration",
    removeMember: "Remove Member",
    confirmLeave: "Confirm Leave",
    leaveConfirmDialog: "Are you sure you want to remove yourself as a member?",
    collaboration: "Collaborate",
    notifyPeople: "Notify People",
    addPeople: "Add People",
    message: "Message",
    share: "Share",
    send: "Send",
    shoppingLists: "Shopping Lists",
    confirmDelete: "Confirm Delete",
    confirmDeleteDialog: "Are you sure you want to delete this shopping list?",
    delete: "Delete",
    toggleArchived: "Toggle Archived",
    open: "Open",
    pieChart: "Pie Chart",
    chartTitle: "Resolved Vs. Unresolved",
    close: "Close"
  },
  cz: {
    all: "Všechno",
    done: "Hotovo",
    confirm: "Potvrdit",
    owner: "Vlastník",
    resolved: "Vyřešeno",
    unresolved: "Nevyřešeno",
    new: "Nový",
    archived: "Archivováno",
    unarchived: "Nezarchivováno",
    name: "Název", 
    quantity: "Množství", 
    collaborate: "Spolupracovat",
    create: "Vytvořit",
    createNewItem: "Vytvořit Novou Položku",
    cancel: "Zrušit",
    yes: "Ano",
    no: "Ne",
    members: "Členové",
    leaveCollaboration: "Opustit Spolupráci",
    removeMember: "Odstranit Člena",
    confirmLeave: "Potvrdit Odchod",
    leaveConfirmDialog: "Opravdu se chcete odebrat jako člen?",
    collaboration: "Spolupráce",
    notifyPeople: "Informujte Lidi",
    addPeople: "Přidat Lidi",
    message: "Zpráva",
    share: "Sdílet",
    send: "Poslat",
    shoppingLists: "Nákupní seznamy",
    confirmDeleteDialog: "Opravdu chcete smazat tento nákupní seznam?",
    confirmDelete: "Potvrdit Odstranění",
    delete: "Odstranit",
    toggleArchived: "Přepnout Archivaci",
    open: "Otevřít",
    toggleResolved: "Přepnout Vyřešeno",
    pieChart: "Koláčový Graf",
    chartTitle: "Vyřešeno Vs. Nevyřešeno",
    close: "Zavřít"
  },
}

const TranslationContext = createContext()

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en")

  const translate = (key) => translations[language][key] || key

  return (
    <TranslationContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = () => useContext(TranslationContext)