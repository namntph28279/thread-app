import { createContext, useState } from "react";

interface UserContextType {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  isAuth: boolean | null;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const UserType = createContext<UserContextType | undefined>(undefined);

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string>('');
  const [isAuth, setIsAuth] = useState<boolean>(null);


  return (
    <UserType.Provider value={{ userId, setUserId, isAuth, setIsAuth }}>
      {children}
    </UserType.Provider>
  )
}

export { UserType, UserContext };

