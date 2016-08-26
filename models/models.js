var path = require('path');

//Postgres DATABASE_URL = postgres://user:passwd@host:port/database
//SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar modelo ORM
var Sequelize = require('sequelize');

// Usar DB SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
	{	dialect:  protocol, 
		protocol: protocol,
		port:	  port,
		host:	  host,
		storage:  storage, 	// solo SQLite (.env)
		omitNull: true		// solo Postgres		
	}
);

// Importar la definición de la tabla Quiz
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

//Importar la definición de la tabla Comment
var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

// Relaciones entre tablas
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// Exportar definición de tablas
exports.Quiz = Quiz;
exports.Comment = Comment;

// sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().then(function() {
	// Ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function (count) {
		if (count===0) {
			Quiz.create({pregunta: 'Capital de Italia',respuesta: 'Roma'})						
			.then(function() {
				console.log('Base de datos inicializada con 1 registro')});
		} else if (count===1) {
			Quiz.create({pregunta: 'Capital de Francia',respuesta: 'París'})						
			.then(function() {
				console.log('Base de datos inicializada con 2 registros')});
		}		
	});
});