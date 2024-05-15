// Miejsce, gdzie jest zdefiniowany UserProvider, prawdopodobnie jakiś plik kontekstu
import React, { createContext, useReducer } from 'react';
import { userReducer } from '../reducers/userReducer';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, {
        token: sessionStorage.getItem('userToken') || null,
        role: sessionStorage.getItem('userRole') || null,
        email: sessionStorage.getItem('userEmail') || null,
        // ... inne wartości stanu
    });

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
