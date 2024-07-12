import React from 'react';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { app } from '../firebase';

export default function OAuth() {
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
    } catch (error) {
      console.error(`COULD NOT SIGN IN WITH GOOGLE`, error);
    }
  };
  return (
    <button
      type='button'
      onClick={handleGoogleClick}
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      Continue with Google
    </button>
  );
}
