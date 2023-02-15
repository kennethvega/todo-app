import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/utility/Button';
import Card from '../components/utility/Card';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useLogin } from '../hooks/useLogin';
import Spinner from '../components/utility/Spinner';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase-config';
import { FcGoogle } from 'react-icons/fc';
import { UserContext } from '../context/AuthContext';
import classNames from 'classnames';
import Error from '../components/utility/Error';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, error, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { email, password } = data;
    await loginUser(email, password);
  };

  // google sign in
  const handleGoogleSignIn = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const googleAuthProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleAuthProvider).then((userCredential) => {
        setUser(userCredential.user);
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-3 p-3">
      <Card>
        <h2 className="mb-5 font-bold text-2xl text-green">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[20rem] ">
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
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={classNames('mb-3 mt-1', {
                'input-error': errors.password,
                input: !errors.password,
              })}
            />

            <button type="button" className="absolute right-3 top-2  text-base text-green" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {error && <Error>{error}</Error>}
          <div className="mt-5">
            <Button disabled={isPending}>{isPending ? <Spinner /> : 'Login'}</Button>
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
            Don't have an account ?{' '}
            <span className="font-bold text-green">
              <Link to="/register">Sign up</Link>
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
