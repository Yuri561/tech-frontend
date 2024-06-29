const express = require('express');
const router = express.Router();
const {
	getQuizes,
	createQuiz,
	deleteQuiz,
} = require('../controllers/quizController');

router.get('/quiz', getQuizes);
router.post('/quiz', createQuiz);
router.delete('/quiz/:id', deleteQuiz); // Ensure the route includes ':id'

module.exports = router;
