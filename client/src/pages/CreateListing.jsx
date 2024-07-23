export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 '>
        Create Listing
      </h1>
      {/* create listing form */}
      <form className='flex flex-col sm:flex-row gap-4'>
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
          />
          {/* description input */}
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
          />
          {/* address input */}
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
          />
          {/* checkbox wrapper */}
          <div className='flex gap-6 flex-wrap'>
            {/* sale checkbox  */}
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
              />
              <span>Sale</span>
            </div>
            {/* rent checkbox  */}
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
              />
              <span>Rent</span>
            </div>
            {/* parking checkbox */}
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
              />
              <span>Parking spot</span>
            </div>
            {/* furnished checkbox */}
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
              />
              <span>Furnished</span>
            </div>
            {/* offer checkbox */}
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
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
              />
              <p>Baths</p>
            </div>
            {/* regular price input */}
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <div className='flex flex-col items-center'>
                <p>Regular Price </p>
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
            {/* discount price input */}
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='discountPrice'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <div className='flex flex-col items-center'>
                <p>Discount Price </p>
                <span className='text-xs'>($ / month)</span>
              </div>
            </div>
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
              type='file'
              id='images'
              accept='image/*'
              multiple
              className='p-3 border border-x-gray-300 rounded w-full'
            />
            <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
              Upload
            </button>
          </div>
          <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
