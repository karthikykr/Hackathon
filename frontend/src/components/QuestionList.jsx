import { motion } from "framer-motion";
import { Trash2, Edit } from "lucide-react";

const QuestionList = ({ questions, onDelete, onEdit }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-6 bg-gray-800 p-6 rounded-2xl shadow-lg"
    >
        <h2 className="text-xl font-bold mb-4 text-neon-blue">Question List</h2>
        {questions.length === 0 ? (
            <p className="text-gray-400">No questions available.</p>
        ) : (
            <ul className="space-y-4">
                {questions.map((q, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
                        <span className="text-white">{q.question} ({q.type})</span>
                        <div className="flex space-x-4">
                            <button onClick={() => onEdit(index)} className="text-neon-blue hover:text-white">
                                <Edit size={20} />
                            </button>
                            <button onClick={() => onDelete(index)} className="text-red-500 hover:text-white">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </motion.div>
);

export default QuestionList;