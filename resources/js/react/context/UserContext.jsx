import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children, users }) {
    const [activeUser, setActiveUser] = useState(users[0] ?? null);

    return (
        <UserContext.Provider value={{ activeUser, setActiveUser, users }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}