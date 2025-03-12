import React, { useEffect, useState } from 'react';
import { useAuthFetch } from '../hooks/useAuthFetch';

const UserProfile = () => {
    // Example user data (could be fetched from an API)
    const [user, setUser] = useState(null);
    const authFetch = useAuthFetch();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = () => {
        authFetch('http://localhost:3000/admins')
            .then((res) => res.json())
            .then((data) => setUser(data.user))
            .catch(console.log);
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
            <div className='max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden'>
                {/* Header / Cover Image */}
                <div className='bg-blue-600 h-32'></div>

                {/* Avatar */}
                <div className='flex justify-center -mt-16'>
                    <img
                        className='h-32 w-32 rounded-full border-4 border-white object-cover'
                        src={
                            'https://res.cloudinary.com/dlds2z087/image/upload/v1669354509/India%20Tour/default_avatar_fbyzfp.jpg'
                        }
                        alt='User Avatar'
                    />
                </div>

                {/* User Info */}
                <div className='p-6 text-center'>
                    <h2 className='text-2xl font-semibold text-gray-800'>
                        {user?.username}
                    </h2>
                    <p className='text-gray-600'>{user?.email}</p>
                </div>

                {/* Actions */}
                <div className='flex border-t border-gray-200'>
                    <button className='flex-1 py-3 text-center text-blue-600 hover:bg-gray-100 focus:outline-none'>
                        Follow
                    </button>
                    <button className='flex-1 py-3 text-center text-blue-600 hover:bg-gray-100 focus:outline-none'>
                        Message
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
