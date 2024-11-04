const login = require('./login');
const register = require('./register');
const update = require('./update');
const getUser = require('./getuser');
const getUsers = require('./getUsers');
const logout = require('./logout');

module.exports = {
    register,
    login,
    update,
    getUser,
    getUsers,
    logout
};