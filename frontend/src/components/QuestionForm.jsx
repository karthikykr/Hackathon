import { useState } from "react";
import { motion } from "framer-motion";
import Button from "./ui/Button";

const QuestionForm = ({ onSubmit }) => {
    const [question, setQuestion] = useState("");
    const [type, setType] = useState("2-mark");
    const [co, setCo] = useState("");
    const [po, setPo] = useState("");
    const [bl, setBl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ question, type, co, po, bl });
        setQuestion("");
        setType("2-mark");
        setCo("");
        setPo("");
        setBl("");
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg"
            onSubmit={handleSubmit}
        >
            <h2 className="text-xl font-bold mb-4 text-neon-blue">Add Question</h2>
            <input
                type="text"
                placeholder="Enter question"
                className="w-full p-2 mb-4 rounded-lg bg-gray-700 text-white"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
            />
            <select
                className="w-full p-2 mb-4 rounded-lg bg-gray-700 text-white"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="2-mark">2-mark</option>
                <option value="8-mark">8-mark</option>
                <option value="10-mark">10-mark</option>
            </select>
            <input
                type="text"
                placeholder="Course Outcome (CO)"
                className="w-full p-2 mb-4 rounded-lg bg-gray-700 text-white"
                value={co}
                onChange={(e) => setCo(e.target.value)}
            />
            <input
                type="text"
                placeholder="Program Outcome (PO)"
                className="w-full p-2 mb-4 rounded-lg bg-gray-700 text-white"
                value={po}
                onChange={(e) => setPo(e.target.value)}
            />
            <input
                type="text"
                placeholder="Bloom's Taxonomy Level (BL)"
                className="w-full p-2 mb-4 rounded-lg bg-gray-700 text-white"
                value={bl}
                onChange={(e) => setBl(e.target.value)}
            />
            <Button text="Submit" />
        </motion.form>
    );
};

export default QuestionForm;