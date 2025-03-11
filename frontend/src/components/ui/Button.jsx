// src/components/Button.jsx
import { motion } from "framer-motion";

const Button = ({ text, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="px-6 py-2 bg-neon-blue text-gray-900 rounded-lg font-semibold shadow-md transition"
        onClick={onClick}
    >
        {text}
    </motion.button>
);

export default Button;
