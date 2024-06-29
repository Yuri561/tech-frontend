const express = require('express');
const router = express.Router();
const {
	getVideos,
	createVideo,
	deleteVideo,
} = require('../controllers/videoController');

router.get('/video', getVideos);
router.post('/video', createVideo);
router.delete('/video/:id', deleteVideo); // Ensure the route includes ':id'

module.exports = router;
