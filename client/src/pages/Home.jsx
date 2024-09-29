import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  SwiperCore.use([Navigation]);

  console.log(offerListings);

  // fetch offer listings => rent listings => sale listings and run 1 time when the page is loaded
  useEffect(() => {
    // fetch offer listings function
    const fetchOfferListings = async () => {
      try {
        const response = await fetch('/api/listing/get?offer=true&limit=9');
        const data = await response.json();
        setOfferListings(data);
        // call fetchRentListings after the data is clear
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    // fetch offer listings function

    // fetch rent listings function
    const fetchRentListings = async () => {
      try {
        const response = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await response.json();
        setRentListings(data);
        // call fetchSaleListings after the data is clear
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    // fetch rent listings function

    // fetch sale listings function
    const fetchSaleListings = async () => {
      try {
        const response = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await response.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    // fetch sale listings function

    // call the functions from order offer => rent => sale
    fetchOfferListings();
    fetchRentListings();
    fetchSaleListings();
    // call the functions from order offer => rent => sale
  }, []);
  // fetch offer listings => rent listings => sale listings and run 1 time when the page is loaded

  return (
    <>
      {/* top section */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        {/* top section message */}
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span> <br />{' '}
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Charmy Estate will help you find your home fast, easy and comfortable.
          <br />
          Our expert support are always available.
        </div>
        {/* top section message */}
        {/* link to search page */}
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
        {/* link to search page */}
      </div>
      {/* top section */}

      {/* swiper section*/}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                // add style because SwiperSlide don't work with normal styles
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* swiper section*/}

      {/* show listing results for offer, sale and rent */}
      <div className='max-w-fit mx-auto flex flex-col gap-8 my-10'>
        {/* offer listing */}
        {offerListings && offerListings.length > 0 && (
          <div className='my-3'>
            {/* title and link wrapper */}
            <div className=''>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Recent Offers
              </h2>
              {/* link to search page (show more offers) */}
              <Link
                to={'/search?offer=true'}
                className='text-sm text-blue-800 hover:underline'
              >
                Show more offers
              </Link>
              {/* link to search page (show more offers) */}
            </div>
            {/* title and link wrapper */}

            {/* render listing results */}
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem
                  listing={listing}
                  key={listing._id}
                />
              ))}
            </div>
            {/* render listing results */}
          </div>
        )}
        {/* offer listing */}

        {/* rent listing */}
        {rentListings && rentListings.length > 0 && (
          <div className='my-3'>
            {/* title and link wrapper */}
            <div className=''>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Recent places for Rent
              </h2>
              {/* link to search page (show more rents) */}
              <Link
                to={'/search?type=rent'}
                className='text-sm text-blue-800 hover:underline'
              >
                Show more places for rent
              </Link>
              {/* link to search page (show more v) */}
            </div>
            {/* title and link wrapper */}

            {/* render listing results */}
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((rent) => (
                <ListingItem
                  listing={rent}
                  key={rent._id}
                />
              ))}
            </div>
            {/* render listing results */}
          </div>
        )}
        {/* rent listing */}

        {/* sale listing */}
        {saleListings && saleListings.length > 0 && (
          <div className='my-3'>
            {/* title and link wrapper */}
            <div className=''>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Recent places for Sale
              </h2>
              {/* link to search page (show more sales) */}
              <Link
                to={'/search?type=sale'}
                className='text-sm text-blue-800 hover:underline'
              >
                Show more places for sale
              </Link>
              {/* link to search page (show more sales) */}
            </div>
            {/* title and link wrapper */}

            {/* render listing results */}
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((sale) => (
                <ListingItem
                  listing={sale}
                  key={sale._id}
                />
              ))}
            </div>
            {/* render listing results */}
          </div>
        )}
        {/* sale listing */}
      </div>
      {/* show listing results for offer, sale and rent */}
    </>
  );
}
