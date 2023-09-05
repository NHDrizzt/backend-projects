const { User } = require('../models');
const { generateToken } = require('../auth/loginAuthentication');

const checkIfUserExists = async (email) => {
    const user = await User.findOne({
        where: {
            email,
        },
    });
    return user;
};

module.exports = {
    createUser: async (params) => {
        const { email } = params;
        const user = await checkIfUserExists(email);
        if (user) {
            return {
                status: 'CONFLICT',
                data: { message: 'User already registered' } };
        }
        await User.create(params);
        const token = generateToken(email);
        return { status: 'CREATED', data: { token } };
    },
    
    findAllUsers: async () => {
        try {
            const users = await User.findAll({ attributes: { exclude: ['password'] } });
            return { status: 'SUCCESSFUL', data: users };
        } catch (error) {
            return { status: 'BAD_REQUEST', data: { message: error.message } };
        }
    },
    
    findUserById: async (id) => {
        try {
            const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
            if (!user) {
                return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
            }
            return { status: 'SUCCESSFUL', data: user };
        } catch (error) {
            return { status: 'BAD_REQUEST', data: { message: error.message } };
        }
    },
};
