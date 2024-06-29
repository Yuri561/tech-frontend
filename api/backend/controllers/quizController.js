const quizModel = require('../models/quizSchema');

const createQuiz = (req, res) => {
    const quiz = new quizModel({
        title: req.body.title,
        description: req.body.description,
        questions: req.body.questions
    });
    quiz.save()
       .then(data => {
            res.status(201).json({
                message: "Quiz created successfully",
                data: data
            });
        })
       .catch(err => {
            res.status(500).json({
                error: err
            });
        });
 };




const getQuizes = (req, res) => {
    quizModel.find()
       .then(data => {
            res.status(200).json({
                message: "Quizes fetched successfully",
                data: data
            });
        })
       .catch(err => {
            res.status(500).json({
                error: err
            });
        });
 };





const deleteQuiz = (req, res) => {
    const id = req.params.id;
    quizModel.findByIdAndRemove(id);
    res.status(200).json({
        message: "Quiz deleted successfully"
    });
    console.log(id);
    console.log(req.params.id);

 };


module.exports = {
    createQuiz,
    getQuizes,
    deleteQuiz
}