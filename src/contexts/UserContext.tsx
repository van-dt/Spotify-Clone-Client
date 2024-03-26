"use client";

import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { User } from "../types";
import { fetchSecureApi } from "../utils";

interface UserContextProps {
  children: ReactNode;
}

interface UserContextData {
  user: User | undefined;
  getUser: () => void;
}

const UserContextDataInit = {
  user: undefined,
  getUser: () => {},
};

export const UserContext = createContext<UserContextData>(UserContextDataInit);

const UserContextProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const [loadUser, setLoadUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchSecureApi<User>("get", "users/my");
        if (userData) {
          setUser(userData);
        } else {
          setUser(undefined);
        }
      } catch (error) {
        console.error(error);
        setUser(undefined);
      }
    };

    fetchData();
  }, [loadUser]);

  const userData = useMemo(() => {
    return {
      user,
      getUser: () => {
        setLoadUser((pre) => !pre);
      },
    };
  }, [user]);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
