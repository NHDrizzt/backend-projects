const loginService = require('../services/loginService');
const mapStatusHTTP = require('../utils/mapStatusHttp');

module.exports = {
    loginController: async (req, res) => {
        const userInfo = await loginService.loginUser(req.body);
        res.status(mapStatusHTTP(userInfo.status)).json(userInfo.data);
    },
};
