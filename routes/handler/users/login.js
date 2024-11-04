const bcrypt = require('bcrypt');
const { User } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();


module.exports = async (req, res) => {
    const schema = {
        email: 'email|empty:false',
        password: 'string|min:6',
    };
    // validate request
    const validate = v.validate(req.body, schema);
    if(validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate,
        });
    }
    // check email is already exists
    const user = await User.findOne({
        where: {
            email: req.body.email,
        },
    });
    // check user is exists
    if(!user) {
        return res.status(404).json({
            status: 'error',
            message: 'user not found',
        });
    }
    // check password is valid
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isValidPassword) {
        return res.status(404).json({
            status: 'error',
            message: 'user not found',
        });
    }
    // return response
    return res.json({
        status: 'success',
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            profession: user.profession,
        },
    });
}