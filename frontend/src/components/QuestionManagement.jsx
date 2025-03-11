import { useState } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import * as XLSX from "xlsx";

const QuestionManagement = () => {
    const [questions, setQuestions] = useState([]);

    const addQuestion = (question) => {
        setQuestions([...questions, question]);
    };

    const deleteQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const editQuestion = (index) => {
        const updatedQuestion = prompt("Edit Question:", questions[index].question);
        if (updatedQuestion) {
            const updatedQuestions = [...questions];
            updatedQuestions[index].question = updatedQuestion;
            setQuestions(updatedQuestions);
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);

            const formattedQuestions = parsedData.map((row) => ({
                question: row.Question || "",
                type: row.Type || "2-mark",
                co: row.CO || "",
                po: row.PO || "",
                bl: row.BL || ""
            }));

            setQuestions([...questions, ...formattedQuestions]);
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="p-6 text-white">
            <div className="mb-4">
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    className="bg-gray-800 p-2 rounded-lg text-white cursor-pointer"
                />
            </div>
            <QuestionForm onSubmit={addQuestion} />
            <QuestionList questions={questions} onDelete={deleteQuestion} onEdit={editQuestion} />
        </div>
    );
};

export default QuestionManagement;
