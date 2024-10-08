import { createContext, useState } from "react";

interface UserContextType {
    userId: string;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
}

const UserType = createContext<UserContextType | undefined>(undefined);

const UserContext = ({ children }: { children: React.ReactNode }) => {
    const [userId, setUserId] = useState<string>('');

    return (
        <UserType.Provider value={{ userId, setUserId }}>
            {children}
        </UserType.Provider>
    )
}

export { UserType, UserContext };
