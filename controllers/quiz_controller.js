var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {
				next(new Error('No existe quizId=' + quizId));
			}
		}
	).catch(function(error) {next(error);});
};


// GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then(
			function(quizes) {
				res.render('quizes/index', {quizes: quizes});	
			}
	).catch(function(error) {next(error);});
};


// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz});		
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	var resultado = "Incorrecto";
	
	if (req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()) {
		resultado = "correcto";	
	}
	
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado} );
			
};

// GET /quizes/new
exports.new = function(req, res) {
	// Crea objeto Quiz
	var quiz = models.Quiz.build(
			{pregunta: "pregunta", respuesta: "respuesta"});
	
	res.render('quizes/new', {quiz: quiz});
};

// POST /quizes/create
exports.create = function(req, res) {
	var quiz = models.Quiz.build(req.body.quiz);

	// Guarda en DB la pregunta y respuesta
	quiz.save({fields:["pregunta", "respuesta"]}).then(function() {
		res.redirect('/quizes');
		}).catch(function(error) {next(error);});
	
};
