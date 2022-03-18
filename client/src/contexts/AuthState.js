import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const username = JSON.parse(localStorage.getItem("username"));
const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
   isAuthenticated: token,
   username: username ? username : null,
   token: null,
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
   const [state, dispatch] = useReducer(AuthReducer, initialState);

   async function handleLogin(credentials) {
      try {
         await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
         })
            .then((res) => res.json())
            .then((data) => {
               dispatch({ type: "LOGIN", payload: data });
            });
      } catch (error) {
         console.error(error);
      }
   }

   async function handleLogout() {
      dispatch({ type: "LOGOUT" });
   }

   return (
      <AuthContext.Provider
         value={{
            isAuthenticated: state.isAuthenticated,
            username: state.username,
            handleLogin,
            handleLogout,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
