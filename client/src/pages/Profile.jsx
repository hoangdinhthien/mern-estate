import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  // When file changes (and is not undefined), the useEffect hook triggers handleFileUpload to upload the file.
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  // -----upload profile image function-----
  const handleFileUpload = (file) => {
    if (file.size > 2 * 1024 * 1024) {
      setFileUploadError(true);
      return;
    } else {
      setFileUploadError(false);
    }

    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        console.error(error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  // -----upload profile image function-----

  // -----update user profile info function-----
  // update user profile info || creates a shallow copy of the current formData object to avoid directly mutating the state.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // -----update user profile info function-----

  // -----submit form function-----
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  // -----submit form function-----

  // -----delete user function-----
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  // -----delete user function-----

  // -----sign out function-----
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error));
    }
  };
  // -----sign out function-----

  // -----show user listings function-----
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  // -----show user listings function-----

  // -----delete user listing function-----
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.error(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.error(error.message);
    }
  };
  // -----delete user listing function-----

  // -----render UI-----
  return (
    <div className='p-3 max-w-lg mx-auto'>
      {/* -----page title----- */}
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      {/* -----page title----- */}
      {/*  */}
      {/* -----user information form----- */}
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4'
      >
        {/* profile image input */}
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        {/* profile image */}
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          // src={currentUser.avatar || formData.avatar}
          alt='profile-img'
          className='rounded-full h-24 object-cover cursor-pointer self-center mt-2'
        />

        {/* upload image status (fail and success)*/}
        <p className='self-center text-sm'>
          {/* if upload got error => render error
              if upload success => render success
          */}
          {fileUploadError ? (
            <span className='text-red-700'>
              ERROR IMAGE UPLOAD !!! (IMAGE MUST BE LESS THEN 2MB)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className='text-slate-700'>
              {`UPLOADING  ${filePercentage}%`}
            </span>
          ) : filePercentage === 100 ? (
            <span className='text-green-700'>
              IMAGE SUCCESSFULLY UPLOADED !
            </span>
          ) : (
            ''
          )}
        </p>

        {/* username input */}
        <input
          id='username'
          type='text'
          placeholder='username'
          defaultValue={currentUser.username}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        {/* email input */}
        <input
          id='email'
          type='email'
          placeholder='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        {/* password input */}
        <input
          id='password'
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />

        {/* update button */}
        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'loading...' : 'update'}
        </button>

        {/* create listing button/link  */}
        <Link
          to={'/create-listing'}
          className='bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-95 text-center'
        >
          create listing
        </Link>
      </form>
      {/* -----user information form----- */}
      {/*  */}
      {/* -----delete and sign out wrapper----- */}
      <div className='flex justify-between mt-4'>
        {/* -----delete button----- */}
        <span
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
        {/* -----delete button----- */}
        {/*  */}
        {/* -----sign out button----- */}
        <span
          onClick={handleSignOut}
          className='text-red-700 cursor-pointer'
        >
          Sign out
        </span>
        {/* -----sign out button----- */}
      </div>
      {/* -----delete and sign out wrapper----- */}
      {/*  */}
      {/* -----show update status error----- */}
      <p className='text-red-500 mt-5 text-center'>{error ? error : ''}</p>
      {/* -----show update status error----- */}
      {/*  */}
      {/* -----show update status success----- */}
      <p className='text-green-500 mt-5 text-center'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
      {/* -----show update status success----- */}
      {/*  */}
      {/* -----show listings button----- */}
      <button
        onClick={handleShowListings}
        className='text-green-700 w-full'
      >
        Show Listings
      </button>
      {/* -----show listings button----- */}
      {/*  */}
      {/* -----error show listings----- */}
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>
      {/* -----error show listings----- */}
      {/*  */}
      {/* -----show all listings----- */}
      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          {/* -----render all listings----- */}
          {userListings.map((listing) => (
            <div
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
              key={listing._id}
            >
              {/* -----listing image----- */}
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing-cover'
                  className='h-16 w-16 object-contain rounded-lg'
                />
              </Link>
              {/* -----listing image----- */}
              {/*  */}
              {/* -----listing name----- */}
              <Link
                className='flex-1 text-slate-700 font-semibold hover:underline truncate'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              {/* -----listing name----- */}
              {/*  */}
              {/* -----edit and delete listing button wrapper----- */}
              <div className='flex flex-col'>
                {/* -----delete listing button----- */}
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700'
                >
                  Delete
                </button>
                {/* -----delete listing button----- */}
                {/*  */}
                {/* -----edit listing button----- */}
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700'>Edit</button>
                </Link>
                {/* -----edit listing button----- */}
              </div>
              {/* -----edit and delete listing button wrapper----- */}
            </div>
          ))}
          {/* -----render all listings----- */}
        </div>
      )}
      {/* -----show all listings----- */}
    </div>
  );
  // -----render UI-----
}
