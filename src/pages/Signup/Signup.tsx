import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/utility/button/Button';
import Card from '../../components/utility/card/Card';
import { useSignup } from '../../hooks/useSignup';
import Spinner from '../../components/utility/Spinner';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { UserContext } from '../../context/AuthContext';
import Error from '../../components/utility/error/Error';
import classNames from 'classnames';
import { MdOutlineError } from 'react-icons/md';
import { useMutation } from 'urql';
import { CREATE_USER } from '../../graphql/Mutation';

const Signup = () => {
  const { user, setUser, setValidateUser } = useContext(UserContext);
  const [createUserResult, createUser] = useMutation(CREATE_USER);
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, error, isPending } = useSignup();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // form register
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { email, password, displayName } = data;
    await signUp(email, password, displayName);
  };

  // google sign in
  const handleGoogleSignIn = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const googleAuthProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleAuthProvider).then((userCredential) => {
        setUser(userCredential.user);
        crossValidate(userCredential.user.uid, userCredential.user.displayName);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // validate to graphql server
  const crossValidate = async (id: string, name: string | null) => {
    try {
      await createUser({ id: id, name: name });
      setValidateUser(true);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-3 p-3">
      <Card>
        <h2 className="mb-5 font-bold text-2xl text-green">Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[20rem] ">
          <label className={classNames({ 'text-red': errors.displayName })}>{errors.displayName ? errors.displayName.message?.toString() : 'Display name'}</label>
          <input
            {...register('displayName', {
              required: 'Display name is required',
              minLength: {
                value: 3,
                message: 'Display name must be at least 3 characters',
              },
            })}
            type="text"
            placeholder="Display name"
            className={classNames('mb-3 mt-1', {
              'input-error': errors.displayName,
              input: !errors.displayName,
            })}
          />

          <label className={classNames({ 'text-red': errors.email })}>{errors.email ? errors.email.message?.toString() : 'Email'}</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email',
              },
            })}
            type="text"
            placeholder="Email"
            className={classNames('mb-3 mt-1', {
              'input-error': errors.email,
              input: !errors.email,
            })}
          />

          <label className={classNames({ 'text-red': errors.password })}>{errors.password ? errors.password.message?.toString() : 'Password'}</label>
          <div className="relative flex items-center">
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={classNames('mb-3 mt-1', {
                'input-error': errors.password,
                input: !errors.password,
              })}
            />

            <button type="button" className="absolute right-3 top-2  text-small text-green" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {/* Firebase Errors */}
          {error && (
            <Error>
              <MdOutlineError size={23} />
              {error}
            </Error>
          )}
          {/* Graphql Errors */}
          {createUserResult?.error && (
            <Error>
              <>
                <MdOutlineError size={23} />
                {createUserResult.error}
              </>
            </Error>
          )}
          <div className="mt-5">
            <Button disabled={isPending}>{isPending ? <Spinner /> : 'Signup'}</Button>
          </div>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-1 border border-gray"></div>
          <span className="text-sm mx-4 font-semibold text-gray">OR</span>
          <div className="flex-1 border border-gray"></div>
        </div>

        <button onClick={handleGoogleSignIn} className="border border-gray hover:shadow-md transition-all duration-300 py-2 px-5 rounded-md flex justify-center gap-3 text-base items-center w-full">
          <FcGoogle className="text-xl" /> Sign in with google
        </button>
      </Card>
      <div className="mt-6">
        <Card>
          <p className="text-center">
            Already have an account ?{' '}
            <span className="font-bold text-green">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
