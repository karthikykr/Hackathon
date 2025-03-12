import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import StatsCard from './StatsCard';
import Chart from './Chart';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const location = useLocation();

    return (
        <div className='min-h-screen flex bg-gray-950 text-white'>
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div
                className={`flex-1 transition-all duration-300 ${
                    sidebarOpen ? 'ml-[280px]' : 'ml-[80px]'
                }`}>
                <Navbar />
                <div className='p-6'>
                    {/* Show Stats and Chart only on the default Dashboard page */}
                    {location.pathname === '/' && (
                        <>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                <StatsCard
                                    title='Total Questions'
                                    value='120'
                                />
                                <StatsCard title='Patterns Defined' value='8' />
                                <StatsCard title='Exams Scheduled' value='5' />
                            </div>
                        </>
                    )}
                    {/* Load dynamic content inside the dashboard */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
