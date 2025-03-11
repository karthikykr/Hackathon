import { motion } from "framer-motion";
import { Menu, X, LayoutGrid, FileText, Settings, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => (
    <motion.div
        initial={{ width: isOpen ? 280 : 80 }}
        animate={{ width: isOpen ? 280 : 80 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="h-screen bg-gray-900 text-white p-5 fixed top-0 left-0 shadow-lg flex flex-col"
    >
        <button onClick={toggleSidebar} className="mb-6 self-end text-gray-400 hover:text-white transition">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ul className="space-y-6">
            <li className="flex items-center space-x-3 cursor-pointer hover:text-neon-blue transition">
                <LayoutGrid />
                {isOpen && <Link to="/">Dashboard</Link>}
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:text-neon-blue transition">
                <FileText />
                {isOpen && <Link to="questions">Question Management</Link>}
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:text-neon-blue transition">
                <Settings />
                {isOpen && <Link to="generate-question">Generate Question</Link>}
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:text-neon-blue transition">
                <Download />
                {isOpen && <Link to="download-qp">Download QP</Link>}
            </li>
        </ul>
    </motion.div>
);

export default Sidebar;