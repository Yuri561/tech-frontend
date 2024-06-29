const videoModel = require('../models/videoSchema');



const createVideo = (req, res) => {
	const video = new videoModel({
		title: req.body.title,
		description: req.body.description,
        url: req.body.url,
        dateUploaded: req.body.dateUploaded,
	});
	video
		.save()
		.then((data) => {
			res.status(201).json({
				message: 'Video created successfully',
				data: data,
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

const getVideos = (req, res) => {
	videoModel
		.find()
		.then((data) => {
			res.status(200).json({
				message: 'Video fetched successfully',
				data: data,
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err,
			});
		});
};

const deleteVideo = (req, res) => {
	const id = req.params.id;
	videoModel.findByIdAndRemove(id);
	res.status(200).json({
		message: 'Video deleted successfully',
	});
	console.log(id);
	console.log(req.params.id);
};

module.exports = {
	createVideo,
	getVideos,
	deleteVideo,
};
