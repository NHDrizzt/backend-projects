const userService = require('../services/userService');
const mapStatusHTTP = require('../utils/mapStatusHttp');

module.exports = {
    createUser: async (req, res) => {
        const userInfo = await userService.createUser(req.body);
        res.status(mapStatusHTTP(userInfo.status)).json(userInfo.data);
    },
    
    findAllUsers: async (_req, res) => {
        const users = await userService.findAllUsers();
        res.status(mapStatusHTTP(users.status)).json(users.data);
    },
    
    findUserById: async (req, res) => {
        const { id } = req.params;
        const user = await userService.findUserById(id);
        res.status(mapStatusHTTP(user.status)).json(user.data);
    },
};
