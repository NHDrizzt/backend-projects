const categoryService = require('../services/categoryService');
const mapStatusHTTP = require('../utils/mapStatusHttp');

module.exports = {
    createCategory: async (req, res) => {
        const { name } = req.body;
        try {
            const userInfo = await categoryService.createCategory(name);
            res.status(mapStatusHTTP(userInfo.status)).json(userInfo.data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    getAllCategories: async (_req, res) => {
        try {
            const categories = await categoryService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
