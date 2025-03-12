import React, { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useAuthFetch } from '../hooks/useAuthFetch';

const QuestionGeneration = () => {
    const [pdfData, setPdfData] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [isPdfGenerated, setIsPdfGenerad] = useState(false);
    const authFetch = useAuthFetch();

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = () => {
        authFetch('http://localhost:3000/admins/questions')
            .then((res) => {
                if (!res?.ok) {
                    console.log(res);
                }

                return res.json();
            })
            .then((data) => setQuestions(data.questions))
            .catch((err) => console.log(err));
    };

    const twoMarkQuestions = questions?.filter((q) => q.type === '2-mark');
    const tenMarkQuestions = questions?.filter((q) => q.type === '10-mark');

    // State arrays for the user's selections
    const [selected2Mark, setSelected2Mark] = useState([]);
    const [selected10Mark, setSelected10Mark] = useState([]);

    // Handle changes to 2-mark question checkboxes
    const handle2MarkChange = (question, checked) => {
        if (checked) {
            // Add question if checkbox is checked
            setSelected2Mark((prev) => [...prev, question]);
        } else {
            // Remove question if checkbox is unchecked
            setSelected2Mark((prev) =>
                prev.filter((q) => q._id !== question._id)
            );
        }
    };

    // Handle changes to 10-mark question checkboxes
    const handle10MarkChange = (question, checked) => {
        if (checked) {
            setSelected10Mark((prev) => [...prev, question]);
        } else {
            setSelected10Mark((prev) =>
                prev.filter((q) => q._id !== question._id)
            );
        }
    };

    const handleConfirm = async () => {
        if (selected10Mark.length < 5 || selected2Mark.length < 5) {
            alert('Please choose atleast 5 question for each type');
            return;
        }
        const filtered2Mark = selected2Mark.slice(0, 5);
        const filtered10Mark = selected10Mark.slice(0, 5);
        try {
            const response = await authFetch(
                'http://localhost:3000/admins/questions',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        twoMarkQuestions: filtered2Mark,
                        tenMarkQuestions: filtered10Mark,
                    }),
                }
            );

            if (response.ok) {
                const blob = await response.blob(); // Convert response to blob
                setPdfData(URL.createObjectURL(blob)); // Store the PDF blob as URL to preview
                setIsPdfGenerad(true);
            } else {
                console.error('Failed to fetch PDF');
            }
        } catch (err) {
            console.log(err);
        }
        // You can now send finalList to your server or generate a PDF, etc.
    };

    const fetchPDF = async () => {
        try {
            const response = await authFetch(
                'http://localhost:3000/admins/questions/download',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/pdf',
                    },
                }
            );

            if (response.ok) {
                const blob = await response.blob(); // Convert response to blob
                setPdfData(URL.createObjectURL(blob)); // Store the PDF blob as URL to preview
                setIsPdfGenerad(true);
            } else {
                console.error('Failed to fetch PDF');
            }
        } catch (error) {
            console.error('Error fetching PDF:', error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center p-4'>
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4'
                onClick={fetchPDF}>
                Generate Random Paper
            </button>

            {!isPdfGenerated && (
                <>
                    <h1 className='font-bold'>OR</h1>
                    <h2>Pick questions from below</h2>
                    <div className='p-4'>
                        <h2 className='text-lg font-bold mb-2'>
                            2-Mark Questions
                        </h2>
                        {twoMarkQuestions?.map((q) => (
                            <div key={q._id} className='mb-1'>
                                <label>
                                    <input
                                        type='checkbox'
                                        onChange={(e) =>
                                            handle2MarkChange(
                                                q,
                                                e.target.checked
                                            )
                                        }
                                    />{' '}
                                    {q.question}
                                </label>
                            </div>
                        ))}

                        <h2 className='text-lg font-bold mt-4 mb-2'>
                            10-Mark Questions
                        </h2>
                        {tenMarkQuestions?.map((q) => (
                            <div key={q._id} className='mb-1'>
                                <label>
                                    <input
                                        type='checkbox'
                                        onChange={(e) =>
                                            handle10MarkChange(
                                                q,
                                                e.target.checked
                                            )
                                        }
                                    />{' '}
                                    {q.question}
                                </label>
                            </div>
                        ))}

                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
                            onClick={handleConfirm}>
                            Confirm Selection
                        </button>
                    </div>
                </>
            )}

            {isPdfGenerated && (
                <a
                    href={pdfData}
                    download='question-paper.pdf'
                    className='inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 mb-2'>
                    Download PDF
                </a>
            )}

            {/* If PDF data is available, show the PDF preview */}
            {pdfData && (
                <div className='w-full h-100 bg-gray-100 shadow-md rounded-lg p-4'>
                    <h2 className='text-lg text-black font-semibold mb-4'>
                        Preview Generated PDF
                    </h2>
                    <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
                        <div className='h-full'>
                            <Viewer fileUrl={pdfData} />
                        </div>
                    </Worker>
                </div>
            )}
        </div>
    );
};

export default QuestionGeneration;
