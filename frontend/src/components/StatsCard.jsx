import { motion } from "framer-motion";

const StatsCard = ({ title, value }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg transition duration-300 text-center"
    >
        <p className="text-neon-blue text-lg font-medium">{title}</p>
        <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mt-2"
        >
            {value}
        </motion.h2>
    </motion.div>
);

export default StatsCard;