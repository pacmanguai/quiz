// GET /login
exports.new = function(req, res) {
  var errors = req.session.errors || {};
  req.session.errors = {};

  res.render('sessions/new', {errors: errors});
};

// POST /login
exports.create = function(req, res) {
  var login = req.body.login;
  var pwd = req.body.password;

  var userController = require('./user_controller');
  userController.autenticar(login, pwd, function(error, user) {

     // Si exite error se devuelven los mensajes de error de sesión
     if (error) {
        req.session.errors = [{message: 'Se ha producido un error: ' + error}];
        res.redirect("/login");
        return;
     }

     // Crear req.session.user y guardar campos id y username
     // La sessión se define por la existencia de req.session.user
     req.session.user = {id: user.id, username: user.username};
     // Redirección al path anterior al login
     res.redirect(req.session.redir.toString());
  });
};

// DELETE /logout
exports.destroy = function(req, res) {
    delete req.session.user;
    res.redirect(req.session.redir.toString());
};
