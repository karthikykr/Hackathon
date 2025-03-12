const User = require('../model/user');
const ExpressError = require('../utils/ExpressError');
const { createJSONToken } = require('../utils/helper');
const Question = require('../model/question');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const PDFDocument = require('pdfkit');

exports.loginHandler = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ExpressError('Email or Password is wrong', 422);
    }

    // if (user.role !== 'admin') {
    //     return res.status(403).json({ message: 'not an admin' });
    // }

    if (password !== user.password) {
        return res.status(401).json('user or password is incorrect');
    }

    const token = createJSONToken(
        { username: user.username, userId: user._id.toString() },
        'secret',
        '15m'
    );

    res.status(200).json({ token });
};

exports.createQuestion = async (req, res) => {
    const { className, type, co, po, bl, question, subject } = req.body;
    const newEntry = new Question({
        className: className,
        type: type,
        po: po,
        question: question,
        bl: bl,
        co: co,
        subject: subject,
    });
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
};

exports.getQuestion = async (req, res) => {
    const questions = await Question.find();
    res.status(200).json({ questions: questions });
};

exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;

    await Question.findByIdAndDelete(id);

    res.status(200).json({ message: 'succefully deleted ' + id });
};

exports.uploadCSV = async (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');
    const promises = []; // Store promises for each row processing

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (row) => {
            const saveQuestion = (async () => {
                try {
                    const question = new Question({
                        bl: row.bl,
                        className: row.className,
                        co: row.co,
                        po: row.po,
                        question: row.question,
                        subject: row.subject,
                        type: row.type,
                    });

                    const savedQuestion = await question.save(); // Save the question
                    return {
                        _id: savedQuestion._id,
                        ...row,
                    };
                } catch (err) {
                    console.error('Error saving question:', err);
                    return null; // Handle errors, you can customize this
                }
            })();

            promises.push(saveQuestion); // Add the promise to the array
        })
        .on('end', async () => {
            try {
                const results = await Promise.all(promises); // Wait for all saves to complete
                const filteredResults = results.filter(
                    (result) => result !== null
                ); // Remove any failed saves

                fs.unlinkSync(req.file.path); // Remove the CSV file after processing
                res.json({
                    message: 'All records processed',
                    data: filteredResults,
                }); // Respond with the results
            } catch (err) {
                console.error('Error processing CSV:', err);
                res.status(500).json({ message: 'Error processing CSV' });
            }
        });
};

exports.downloadPDF = async (req, res) => {
    const random2MarkQuestions = await Question.aggregate([
        { $match: { type: '2-mark' } },
        { $sample: { size: 5 } },
    ]);

    const random8MarkQuestions = await Question.aggregate([
        { $match: { type: '10-mark' } },
        { $sample: { size: 5 } },
    ]);

    generatePDF(res, random2MarkQuestions, random8MarkQuestions);
};

function drawTable(doc, data, startX, startY, columnWidths, rowHeight) {
    // Set the line width for the table grid
    doc.lineWidth(0.5);

    // Iterate over the rows of data
    data.forEach((row, rowIndex) => {
        let currentX = startX; // Track the X position for each cell
        row.forEach((cell, columnIndex) => {
            const columnWidth = columnWidths[columnIndex]; // Get the width for this column
            const y = startY + rowIndex * rowHeight;

            // Draw the cell border
            doc.rect(currentX, y, columnWidth, rowHeight).stroke();

            // Add text in the cell, slightly offset for padding
            doc.text(cell, currentX + 5, y + 5, {
                width: columnWidth - 10,
                align: 'left',
            });

            // Move to the next column's starting X position
            currentX += columnWidth;
        });
    });
}

function mapQuestionsToArrays(questions) {
    return questions.map((question, index) => {
        const match = question.type.match(/(\d+)-mark/);

        const marks = match ? parseInt(match[1], 10) : 0;

        return [
            index + 1, // Q.No (1-based index)
            question.question, // Question text
            question.bl, // BL
            question.co, // CO
            question.po, // PO
            marks, // Marks (parsed from type)
        ];
    });
}

exports.generateQuestionPaper = async (req, res) => {
    const { twoMarkQuestions, tenMarkQuestions } = req.body;

    generatePDF(res, twoMarkQuestions, tenMarkQuestions);
};

function generatePDF(res, twoMarkQuestions, tenMarkQuestions) {
    var doc = new PDFDocument({ bufferPages: true, size: 'A4' });

    let buffers = [];

    doc.on('data', buffers.push.bind(buffers));

    doc.on('end', () => {
        let pdfData = Buffer.concat(buffers);
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(pdfData),
            'Content-Type': 'application/pdf',
            'Content-disposition': 'attachment;filename=test.pdf',
        }).end(pdfData);
    });

    // doc.pipe(res);

    const margin = 30;
    const width = doc.page.width - 2 * margin;
    const height = doc.page.height - 2 * margin;
    doc.rect(margin, margin, width, height).stroke();

    doc.image('assets/logo.png', 50, 45, {
        width: 100,
    })
        .font('Helvetica-Bold')
        .fontSize(14)
        .text('ST JOSEPH ENGINEERING COLLEGE, MANGALURU', 120, margin + 45, {
            align: 'center',
        })
        .fontSize(12)
        .text('An Autonomous Institution', 150, margin + 65, {
            align: 'center',
        })
        .text(
            'II Internal MCA Programme Examinations Oct.-2024',
            120,
            margin + 80,
            {
                align: 'center',
            }
        )
        .moveDown();

    let currentY = doc.y; // Current vertical position
    doc.moveTo(margin, currentY) // Start of the line (x1, y1)
        .lineTo(doc.page.width - margin, currentY) // End of the line (x2, y2)
        .stroke();

    doc.text('USN:', margin + 10, margin + 125);

    let startX = 70;
    let startY = 150;
    const boxWidth = 20;
    const boxHeight = 20;

    const boxCount = 10;

    for (let i = 0; i < boxCount; i++) {
        const x = startX + i * boxWidth;

        // Draw the box
        doc.rect(x, startY, boxWidth, boxHeight).stroke();
    }

    doc.text('Maximum marks: 50', margin + 40, margin + 120, {
        align: 'right',
    });

    doc.fontSize(14).text(
        twoMarkQuestions[0].subject,
        270,
        margin + 160
        // { align: 'center' }
    );

    const widthIn = doc.page.width - 3 * margin;
    const heightIn = doc.page.height - 9 * margin;
    const startXIn = (doc.page.width - widthIn) / 2;
    doc.rect(startXIn, 220, widthIn, heightIn).stroke();

    doc.fontSize(16).text('PART-A', 270, 210 + margin);
    currentY = doc.y; // Current vertical position
    const newMargin = margin + 15;
    doc.moveTo(newMargin, currentY + 10) // Start of the line (x1, y1)
        .lineTo(doc.page.width - newMargin, currentY + 10) // End of the line (x2, y2)
        .stroke();

    doc.fontSize(8);

    // Define the table structure
    startX = newMargin; // Starting X position
    startY = 279; // Starting Y position
    const rowHeight = 30; // Height of each row

    // Example data for the table (6 columns per row)
    let data = [
        ['Q.No', 'Question', 'BL', 'CO', 'PO', 'Marks'],
        // Add more rows as needed
    ];

    let rows = mapQuestionsToArrays(twoMarkQuestions);
    data = data.concat(rows);

    const columnWidths = [30, 355, 30, 30, 30, 30]; // Specify different widths for each column

    // Draw the table
    drawTable(doc, data, startX, startY, columnWidths, rowHeight);
    // doc.fontSize(12).text(
    //     random2MarkQuestions[0].question,
    //     newMargin + 10,
    //     margin + 260
    // );

    doc.fontSize(16).text('PART-B', 270, doc.y + margin);
    doc.moveTo(newMargin, doc.y + 10) // Start of the line (x1, y1)
        .lineTo(doc.page.width - newMargin, doc.y + 10) // End of the line (x2, y2)
        .stroke();
    rows = mapQuestionsToArrays(tenMarkQuestions);

    doc.fontSize(8);
    drawTable(doc, rows, startX, doc.y + 10, columnWidths, rowHeight);

    doc.end();
}

exports.getAdmin = async (req, res) => {
    const userID = req.userId;
    const user = await User.findById(userID);

    res.json({ user });
};
