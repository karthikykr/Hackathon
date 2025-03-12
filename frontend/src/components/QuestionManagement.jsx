import { useEffect, useState } from 'react';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
import * as XLSX from 'xlsx';
import { useAuthFetch } from '../hooks/useAuthFetch';

const QuestionManagement = () => {
    const [questions, setQuestions] = useState([]);
    const authFetch = useAuthFetch();

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = () => {
        authFetch('http://localhost:3000/admins/questions')
            .then((res) => res.json())
            .then((data) => setQuestions(data.questions))
            .catch((err) => console.log(err));
    };

    const addQuestion = (question) => {
        authFetch('http://localhost:3000/admins/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(question),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((e) => console.log(e));
    };

    const deleteQuestion = (id) => {
        authFetch(`http://localhost:3000/admins/questions/${id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        setQuestions(questions?.filter((item) => item._id !== id));
    };

    const handleFileUpload = (event) => {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);

        if (!event.target.files[0]) {
            console.log('no file found');
            return;
        }

        authFetch('http://localhost:3000/admins/questions/csv/upload', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => setQuestions([...questions, ...data.data]))
            .catch((err) => console.log(err));
    };

    return (
        <div className='p-6 text-white'>
            <div className='mb-4'>
                <input
                    type='file'
                    accept='.csv'
                    onChange={handleFileUpload}
                    className='bg-gray-800 p-2 rounded-lg text-white cursor-pointer'
                />
            </div>
            <QuestionForm onSubmit={addQuestion} />
            <QuestionList questions={questions} onDelete={deleteQuestion} />
        </div>
    );
};

export default QuestionManagement;
