const { BlogPost, PostCategory, sequelize, User, Category } = require('../models');

module.exports = {
    createPost: async ({ title, content, categoryIds }, id) => {
        try {
            const transactionResult = await sequelize.transaction(async (t) => {
                const newBlogPost = await BlogPost
                    .create({ title, content, userId: id }, { transaction: t });
                await PostCategory.bulkCreate([...categoryIds.map((categoryId) =>
                        ({ categoryId, postId: newBlogPost.id }))], { transaction: t });
                return newBlogPost;
            });
            return { status: 'CREATED', data: transactionResult };
        } catch (e) {
            return { status: 'BAD_REQUEST', data: { message: e.message } };
        }
    },
    
    findAllPosts: async () => {
        try {
            const posts = await BlogPost.findAll({
                include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
                    { model: Category, as: 'categories' }],
            });
            return { status: 'SUCCESSFUL', data: posts };
        } catch (e) {
            return { status: 'BAD_REQUEST', data: { message: e.message } };
        }
    },
    
    findPostById: async (id) => {
        try {
            const post = await BlogPost.findByPk(id, {
                include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
                    { model: Category, as: 'categories' },
                ],
            });
            if (!post) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
            return { status: 'SUCCESSFUL', data: post };
        } catch (e) {
            return { status: 'BAD_REQUEST', data: { message: e.message } };
        }
    },
    
    updatePost: async (id, { title, content }) => {
        try {
            const transactionResult = await sequelize.transaction(async (t) => {
                await BlogPost.update({ title, content }, { where: { id } }, { transaction: t });
                const updatePost = await BlogPost.findByPk(id, {
                    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
                        { model: Category, as: 'categories' }] }, { transaction: t });
                return { status: 'SUCCESSFUL', data: updatePost };
            });
            return transactionResult;
        } catch (e) {
            return { status: 'BAD_REQUEST', data: { message: e.message } };
        }
    },
};
