const { User } = require('../../../models');
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        password: 'string|min:6',
        profession: 'string|optional',
    };

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

    if(user) {
        return res.status(409).json({
            status: 'error',
            message: 'email already exists',
        });
    }

    const password = await bcrypt.hash(req.body.password, 10);

    const data = {
        password,
        name: req.body.name,
        profession: req.body.profession,
        email: req.body.email,
        role: 'student',
    };

    const createUser = await User.create(data);

    return res.json({
        status: 'success',
        data: {
            id: createUser.id,
        },
    });
};