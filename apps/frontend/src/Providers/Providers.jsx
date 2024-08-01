import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { ApiProvider } from "../context/ApiContext";

const Providers = ({ children }) => {
    return (
        <AuthProvider>
            <ApiProvider>
                {children}
            </ApiProvider>
        </AuthProvider>
    )
}

export default Providers;