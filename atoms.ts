import { atom } from "jotai";
import { User } from "firebase/auth";
const authAtom = atom<boolean>(false);
const userAtom = atom<null | User>(null);

export { authAtom, userAtom };
