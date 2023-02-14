import { useEffect, useState } from 'react';

import { createContext, Dispatch, SetStateAction, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config/firebase-config';
export interface UserContextInterface {
  user: null | User;
  isAuth: boolean | User;
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsAuth: Dispatch<SetStateAction<boolean | User>>;
}
const initialState = {
  user: null,
  isAuth: false,
  setUser: (user: User) => {},
} as UserContextInterface;

export const UserContext = createContext(initialState);

type UserProviderProps = {
  children: ReactNode;
};
export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<null | User>(null);
  const [isAuth, setIsAuth] = useState<boolean | User>(false);

  // check if authentication is ready
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAuth(true);
      setUser(user);
      unsub();
    });
  }, [auth]);

  return <UserContext.Provider value={{ user, isAuth, setUser, setIsAuth }}>{children}</UserContext.Provider>;
}
