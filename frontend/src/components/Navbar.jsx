import { UserCircle } from 'lucide-react';
import { useAuthContext } from '../AuthProvider';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { isLoggedIn } = useAuthContext();
    return (
        <div className='bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg p-4 flex justify-between items-center pl-24 text-white'>
            <h1 className='text-xl font-bold'>qpms Dashboard</h1>
            <div className='flex items-center space-x-4'>
                {/* <p className="text-gray-300">Karthik</p> */}
                {isLoggedIn ? (
                    <Link to='/profile'>
                        <UserCircle size={32} className='text-neon-blue' />
                    </Link>
                ) : (
                    <Link
                        to='/login'
                        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out'>
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
