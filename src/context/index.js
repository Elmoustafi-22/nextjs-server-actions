'use client'

import { createContext, useState } from "react";
import { addNewUserFormInitialState } from "@/utils";


export const UserContext = createContext(null)


export default function UserState({children}) {
    const [openPopup, setOpenPopup] = useState(false);
    const [addNewUserFormData, setAddNewUserFormData] = useState(
      addNewUserFormInitialState
    ); 
    const [currentEditedID, setCurrentEditedID] = useState(null)

    return <UserContext.Provider value={{currentEditedID, setCurrentEditedID, openPopup, setOpenPopup, addNewUserFormData, setAddNewUserFormData }}>
        {children}
    </UserContext.Provider>
}