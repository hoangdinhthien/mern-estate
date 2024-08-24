import { useEffect, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase/';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.error(data.message);
        return;
      }
      setFormData(data);
    };
    fetchListing();
  }, []);

  // submit image function
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError(`Image upload failed (2 mb max per image!!!)`);
          setUploading(false);
        });
    } else {
      setImageUploadError(`You can only upload 6 images per listing!!!`);
      setUploading(false);
    }
  };

  // store upload image function
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  // delete image function
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  // change/update data function
  const handleChange = (e) => {
    // you can only check 1 checkbox sale or rent, cannot check both
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      // update the form
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    // If the checkbox with id="parking" || "furnished" || "offer" is checked or unchecked, formData.parking || formData.furnished || formData.offer will be set to true or false respectively.
    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      // update the form data
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    // the rest
    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      // update the form
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  // submit form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image!!!');

      // +formData.regularPrice => convert value to number
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price!!!');
      setLoading(true);
      setError(false);
      // fetch api || Make a POST request to the specified API endpoint
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      // Parse the JSON response body
      const data = await res.json(res);
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      }

      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className='p-3 max-w-5xl mx-auto'>
      {/* page title  */}
      <h1 className='text-3xl font-semibold text-center my-7 '>
        Update Listing
      </h1>
      {/* create listing form */}
      <form
        onSubmit={handleSubmit}
        className='flex flex-col sm:flex-row gap-4'
      >
        {/* left col */}
        <div className='flex flex-col gap-4 flex-1'>
          {/* name input */}
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength={62}
            minLength={10}
            required
            onChange={handleChange}
            value={formData.name}
          />
          {/* description input */}
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          {/* address input */}
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          {/* checkbox wrapper */}
          <div className='flex gap-6 flex-wrap'>
            {/* sale checkbox  */}
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span>Sale</span>
            </div>
            {/* rent checkbox  */}
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            {/* parking checkbox */}
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                value={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            {/* furnished checkbox */}
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                value={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            {/* offer checkbox */}
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                value={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          {/* number input wrapper */}
          <div className='flex flex-wrap gap-6'>
            {/* number of beds input */}
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            {/* number of bathrooms input */}
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            {/* regular price input */}
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='50'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Regular Price </p>
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>

            {formData.offer && (
              // {/* discount price input */}
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Discount Price </p>
                  <span className='text-xs'>($ / month)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* right col */}
        <div className='flex flex-col flex-1 gap-4'>
          {/* image file upload */}
          <p className='font-semibold '>
            Images:
            <span className='font-normal text-grey-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className=' flex gap-4'>
            <input
              onChange={(e) => setFiles(e.target.files)}
              type='file'
              id='images'
              accept='image/*'
              multiple
              className='p-3 border border-x-gray-300 rounded w-full'
            />
            {/* image upload button */}
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? `Uploading...` : `Upload`}
            </button>
          </div>
          {/* Update listing button */}
          <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Updating...' : 'Update Listing'}
          </button>

          {/* show upload image error */}
          <p className='text-red-600 text-sm text-center'>
            {imageUploadError && imageUploadError}
          </p>

          {/* render uploaded image to screen */}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing-image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                {/* delete image button */}
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-65'
                >
                  Delete
                </button>
              </div>
            ))}
          {/* show error to upload at least 1 image and error for discount price must be lower than regular price*/}
          {error && <p className='text-red-700 text-sm text-center'>{error}</p>}
        </div>
      </form>
    </main>
  );
}
