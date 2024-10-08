import { data } from 'autoprefixer';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // creates a shallow copy of the current formData object to avoid directly mutating the state.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // -----submit form function-----
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }

    console.log(data);
  };
  // -----submit form function-----

  // -----render ui-----
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>

      {/* -----Signup form----- */}
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4'
      >
        {/* -----username input----- */}
        <input
          type='text'
          placeholder='Username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
        {/* -----username input----- */}
        {/*  */}
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
        {/* -----sign up button----- */}
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        {/* -----sign up button----- */}
        {/*  */}
        {/* -----sign in with google button----- */}
        <OAuth />
        {/* -----sign in with google button----- */}
      </form>
      {/* -----Signup form----- */}

      {/* -----don't have account || sign in wrapper----- */}
      <div className='flex gap-2 mt-5'>
        <p className=''>Have an account?</p>
        {/* -----sign in link----- */}
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign In</span>
        </Link>
        {/* -----sign in link----- */}
      </div>
      {/* -----don't have account || sign in wrapper----- */}
      {/*  */}
      {/* -----show error----- */}
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      {/* -----show error----- */}
    </div>
  );
  // -----render ui-----
}
