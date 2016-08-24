var path = require('path');

// Cargar modelo ORM
var Sequelize = require('sequelize');

// Usar DB SQLite
var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "quiz.sqlite"});

// Importar la definición de la tabla Quiz
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Exportar definición de la tabla Quiz
exports.Quiz = Quiz;

// sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().success(function() {
	// Ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function (count) {
		if (count===0) {
			Quiz.create({ 	pregunta: 'Capital de Italia',
							respuesta: 'Roma'
						})
				.success(function() {console.log('Base de datos inicilizada')});
		};
	});
});