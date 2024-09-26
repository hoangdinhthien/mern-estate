import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            `https://cdn.prod.website-files.com/620ec747459e13c7cf12a39e/625b10a58137b364b18df2ea_iStock-94179607.jpg`
          }
          alt='listing-cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale-105 duration-300 ease-in-out'
        />
        <div className='p-3 flex flex-col gap-3 w-full'>
          <p className='text-lg font-semibold text-slate-700 truncate '>
            {listing.name}
          </p>
          <div className='flex items-center gap-2'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-700 w-full truncate'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-3'>
            {listing.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold flex items-center'>
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-us')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms > listing.baths
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} baths`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
