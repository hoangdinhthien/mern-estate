import { data } from 'autoprefixer';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // creates a shallow copy of the current formData object to avoid directly mutating the state.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // -----submit form function || fetch api-----
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/'); // => navigate to home
    } catch (error) {
      dispatch(signInFailure(error.message));
    }

    console.log(data);
  };
  // -----submit form function || fetch api-----

  // -----render UI-----
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4'
      >
        {/* -----email input----- */}
        <input
          type='email'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        {/* -----email input----- */}
        {/*  */}
        {/* -----password input----- */}
        <input
          type='password'
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        {/* -----password input----- */}
        {/*  */}
        {/* -----sign in button----- */}
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        {/* -----sign in button----- */}
        {/*  */}
        {/* -----sign in with google button|link----- */}
        <OAuth />
        {/* -----sign in with google button|link----- */}
      </form>

      {/* -----don't have account and sign up button wrapper----- */}
      <div className='flex gap-2 mt-5'>
        <p className=''>Don&apos;t have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {/* -----don't have account and sign up button wrapper----- */}
      {/*  */}
      {/* -----show error----- */}
      {error && <p className='text-red-500 mt-5 text-center'>{error}</p>}
      {/* -----show error----- */}
    </div>
  );
  // -----render UI-----
}
