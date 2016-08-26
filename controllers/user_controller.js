var users = { admin: {id: 1, username:"admin", password:"1234"},
              pepe: {id: 2, username:"pepe", password:"5678"}
            };


// Comprueba si el usuario está registrado
// Si falla o hay errores ejecuta callback
exports.autenticar = function(login, password, callback) {
    if (users[login]) {
        if (password === users[login].password){
            callback(null, users[login]);
        }
        else {
            callback(new Error('Password erróneo.'));
        }
    }
    else {
            callback(new Error('No existe el usuario.'));
    }
};
