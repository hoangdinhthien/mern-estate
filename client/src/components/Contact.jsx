import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandLord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandLord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandLord();
  }, [listing.userRef]);

  // -----render UI-----
  return (
    <>
      {landLord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landLord.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()} </span>
          </p>
          {/* -----message input----- */}
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full  border p-3 rounded-lg'
          />
          {/* -----message input----- */}
          {/*  */}
          {/* -----send message button----- */}
          <Link
            to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-80 p-3 text-center'
          >
            Send Message
          </Link>
          {/* -----send message button----- */}
        </div>
      )}
    </>
  );
  // -----render UI-----
}
