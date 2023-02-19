import { UserContext } from './../context/AuthContext';

import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase-config';
import { useMutation } from 'urql';
import { CREATE_USER } from '../graphql/Mutation';

export const useSignup = () => {
  const [, createUser] = useMutation(CREATE_USER);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [error, setError] = useState<null | string>(null);
  const [isPending, setIsPending] = useState(false);

  const signUp = async (email: string, password: string, displayName: string) => {
    setError(null);
    setIsPending(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(async ({ user }) => {
        await updateProfile(user, {
          displayName: displayName,
        });
        await createUser({ id: user.uid, name: user.displayName });
        setUser(user);
        navigate('/');
      });
      setIsPending(false);
      setError(null);
    } catch (err: any) {
      // error message
      if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
        setError('Email is already taken. please try again');
      } else {
        setError(err.message);
      }
      setIsPending(false);
      // toast.error(`${err.message}`);
    }
  };
  return { signUp, error, isPending };
};
