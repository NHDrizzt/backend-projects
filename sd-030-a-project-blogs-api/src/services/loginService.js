const { User } = require('../models');
const { generateToken } = require('../auth/loginAuthentication');

module.exports = {
    loginUser: async (params) => {
        const { email, password } = params;
        const user = await User.findOne({
            where: {
                email,
                password,
            },
        });

        if (!user || email !== user.email || password !== user.password) {
            return { status: 'BAD_REQUEST',
            data: { message: 'Invalid fields' } };
        }
    
        const token = generateToken(user.id);
        return { status: 'SUCCESSFUL', data: { token } };
    },
};
