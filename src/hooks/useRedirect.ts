import { UserContext } from './../context/AuthContext';
import { useContext } from 'react';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const useRedirectLoggedOutUser = (path: string) => {
  const navigate = useNavigate();
  const { user, validateUser } = useContext(UserContext);
  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      if (!user && validateUser) {
        return navigate(path);
      }
    };
    redirectLoggedOutUser();
  }, [navigate, path]);
};

export default useRedirectLoggedOutUser;
