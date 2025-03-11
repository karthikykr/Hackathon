import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import StatsCard from "./StatsCard";
import Chart from "./Chart";

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const data = [
        { name: "Module 1", questions: 50 },
        { name: "Module 2", questions: 40 },
        { name: "Module 3", questions: 30 },
    ];

    return (
        <div className="min-h-screen flex bg-gray-950 text-white">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-[280px]' : 'ml-[80px]'}`}>
                <Navbar />
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-6 text-neon-blue">Dashboard Overview</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatsCard title="Total Questions" value="120" />
                        <StatsCard title="Patterns Defined" value="8" />
                        <StatsCard title="Exams Scheduled" value="5" />
                    </div>
                    <Chart data={data} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;