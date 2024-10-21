"use client";

import { createContext, useReducer, useEffect, ReactNode, useContext } from "react";
import Cookies from "js-cookie";

// Define the User interface
interface User {
    userId: string;
    email: string;
    registrationDate: string;
}

// Define the context type, including the user state and dispatch function
interface AuthContextType {
    user: User | null;
    dispatch: React.Dispatch<AuthAction>;
}

// Define action types for better type checking in the reducer
type AuthAction = 
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" };

// Initialize the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the reducer function with appropriate types
export const authReducer = (state: { user: User | null }, action: AuthAction) => {
    switch (action.type) {
        case "LOGIN":
            Cookies.set('isLoggedIn', 'true');
            localStorage.setItem("user", JSON.stringify(action.payload));
            return { ...state, user: action.payload }; // Update user state
        case "LOGOUT":
            Cookies.remove('isLoggedIn');
            localStorage.removeItem("user"); 
            return { ...state, user: null }; // Set user to null
        default:
            return state; // Return current state for unrecognized action types
    }
};

// Initializer function to retrieve user from localStorage
const getInitialUserState = () => {
    if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    }
    return null;
}

// Define the context provider
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const initialState = {
        user: getInitialUserState(),
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const user = JSON.parse(localStorage.getItem("user") || 'null');

            if (user) {
                dispatch({ type: "LOGIN", payload: user });
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use the AuthContext
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    return context;
};
