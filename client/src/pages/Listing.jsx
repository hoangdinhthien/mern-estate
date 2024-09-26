import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from '../components/Contact';

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing() {
  SwiperCore.use([Navigation]);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  // get listing id from url
  const params = useParams();
  // fetch listing
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  // -----render UI-----
  return (
    <main>
      {/* -----loading effect----- */}
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {/* -----loading effect----- */}
      {/*  */}
      {/* -----error effect----- */}
      {error && (
        <p className='text-center my-7 text-2xl text-red-600'>
          Something went wrong!!!
        </p>
      )}
      {/* -----error effect----- */}
      {/*  */}
      {/* -----display listing----- */}
      {listing && !loading && !error && (
        <>
          {/* -----image slider----- */}
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat `,
                    backgroundSize: `cover`,
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* -----image slider----- */}
          {/*  */}
          {/* -----share button----- */}
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {/* -----share button----- */}
          {/*  */}
          {/* -----copied effect----- */}
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          {/* -----copied effect----- */}
          {/*  */}
          {/* -----listing details----- */}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            {/* -----name and price----- */}
            <p className='text-2xl font-semibold'>
              {listing.name} - $
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            {/* -----name and price----- */}
            {/*  */}
            {/* -----address----- */}
            <p className='flex items-center gap-2 mt-6 text-slate-600 text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            {/* -----address----- */}
            {/*  */}
            {/* -----type and discount wrapper----- */}
            <div className='flex gap-4'>
              {/* -----type----- */}
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center rounded-md p-1'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {/* -----type----- */}
              {/* -----discount----- */}
              {listing.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center rounded-md p-1'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
              {/* -----discount----- */}
            </div>
            {/* -----type and discount wrapper----- */}
            {/*  */}
            {/* -----description----- */}
            <p className='text-slate-800 '>
              <span className='text-black font-semibold'>Description - </span>
              {listing.description}
            </p>
            {/* -----description----- */}
            {/*  */}
            {/* -----features----- */}
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              {/* -----bedrooms----- */}
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              {/* -----bedrooms----- */}
              {/*  */}
              {/* -----bathrooms----- */}
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
              {/* -----bathrooms----- */}
              {/*  */}
              {/* -----parking----- */}
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No parking spot'}
              </li>
              {/* -----parking----- */}
              {/*  */}
              {/* -----furnished----- */}
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
              {/* -----furnished----- */}
            </ul>
            {/* -----features----- */}
            {/*  */}
            {/* -----contact button----- */}
            {/* prevents the listing owner from seeing a button to contact themselves and ensures that only authenticated users can attempt to contact the landlord. */}
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-80 p-3'
                onClick={() => setContact(true)}
              >
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
            {/* -----contact button----- */}
          </div>
          {/* -----listing details----- */}
        </>
      )}
      {/* -----display listing----- */}
    </main>
  );
  // -----render UI-----
}
