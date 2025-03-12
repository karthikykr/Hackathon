const catchAsync = require('../utils/catchAsync');

const routes = require('express').Router();
const adminController = require('../controllers/admin');
const multer = require('multer');
const path = require('path');
const isAuth = require('../middleware/isAuth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Set the destination directory
    },
    filename: (req, file, cb) => {
        // Extract the file's original extension
        const ext = path.extname(file.originalname);
        // Generate a new filename with the extension
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

routes.route('/').get(isAuth, catchAsync(adminController.getAdmin));

routes.route('/login').post(catchAsync(adminController.loginHandler));

routes
    .route('/questions')
    .get(isAuth, catchAsync(adminController.getQuestion))
    .post(isAuth, catchAsync(adminController.createQuestion))
    .put(isAuth, catchAsync(adminController.generateQuestionPaper));

routes
    .route('/questions/csv/upload')
    .post(isAuth, upload.single('file'), catchAsync(adminController.uploadCSV));

routes
    .route('/questions/:id')
    .delete(isAuth, catchAsync(adminController.deleteQuestion));

routes
    .route('/questions/download')
    .get(isAuth, catchAsync(adminController.downloadPDF));

module.exports = routes;
