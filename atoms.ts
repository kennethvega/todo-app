import { atom } from "jotai";

const authAtom = atom(false);
const userAtom = atom(null);

export { authAtom, userAtom };
