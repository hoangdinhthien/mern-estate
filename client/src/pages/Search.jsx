import React from 'react';

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
      {/* -----Left side----- */}
      <div className='p-7 border-b-2 md:border-r-2  md:min-h-screen'>
        <form className='flex flex-col gap-4'>
          {/* -----Search term----- */}
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search term
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
            />
          </div>
          {/* -----Search term----- */}
          {/*  */}
          {/* -----Search type----- */}
          <div className=' flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            {/* -----Rent & Sale checkbox----- */}
            <div className='flex gap-2 '>
              <input
                type='checkbox'
                id='all'
                className='w-5'
              />
              <span>Rent & Sale</span>
            </div>
            {/* -----Rent & Sale checkbox----- */}
            {/*  */}
            {/* -----Rent checkbox----- */}
            <div className='flex gap-2 '>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
              />
              <span>Rent</span>
            </div>
            {/* -----Rent checkbox----- */}
            {/*  */}
            {/* -----Sale checkbox----- */}
            <div className='flex gap-2 '>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
              />
              <span>Sale</span>
            </div>
            {/* -----Sale checkbox----- */}
            {/*  */}
            {/* -----Offer checkbox----- */}
            <div className='flex gap-2 '>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
              />
              <span>Offer</span>
            </div>
            {/* -----Offer checkbox----- */}
          </div>
          {/* -----Search type----- */}
          {/*  */}
          {/* -----Search Amenities----- */}
          <div className=' flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            {/* -----Parking checkbox----- */}
            <div className='flex gap-2 '>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
              />
              <span>Parking</span>
            </div>
            {/* -----Parking checkbox----- */}
            {/*  */}
            {/* -----Furnished checkbox----- */}
            <div className='flex gap-2 '>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
              />
              <span>Furnished</span>
            </div>
            {/* -----Furnished checkbox----- */}
          </div>
          {/* -----Search Amenities----- */}
          {/*  */}
          {/* -----Search sort----- */}
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              name=''
              id='sort_order'
              className='border rounded-lg p-3'
            >
              <option value=''>Price High to Low</option>
              <option value=''>Price Low to High</option>
              <option value=''>Latest</option>
              <option value=''>Oldest</option>
            </select>
          </div>
          {/* -----Search sort----- */}
          {/*  */}
          {/* -----Search button----- */}
          <button className='bg-slate-500 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
          {/* -----Search button----- */}
        </form>
      </div>
      {/* -----Left side----- */}
      {/*  */}
      {/* -----Right side----- */}
      <div className=''>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Listing results:
        </h1>
      </div>
      {/* -----Right side----- */}
    </div>
  );
}
