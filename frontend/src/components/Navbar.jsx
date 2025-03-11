import { UserCircle } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg p-4 flex justify-between items-center pl-24 text-white">
      <h1 className="text-xl font-bold">Futuristic Dashboard</h1>
      <div className="flex items-center space-x-4">
        <p className="text-gray-300">John Doe</p>
        <UserCircle size={32} className="text-neon-blue" />
      </div>
    </div>
  );
};

export default Navbar;