const { Category } = require('../models');

const checkIfCategoryExists = async (name) => {
    const category = await Category.findOne({
        where: {
            name,
        },
    });
    return category;
};

module.exports = {
    createCategory: async (name) => {
        try {
            const category = await checkIfCategoryExists(name);
            if (category) {
                return { status: 'CONFLICT',
                    data: { message: 'Category already registered' } };
            }
            const newCategory = await Category.create({ name });
            return { status: 'CREATED', data: newCategory };
        } catch (e) {
            return { status: 'BAD_REQUEST', data: { message: e.message } };
        }
    },
    getAllCategories: async () => {
        try {
            return await Category.findAll();
        } catch (e) {
            return { status: 'BAD_REQUEST', data: { message: e.message } };
        }
    },
};
