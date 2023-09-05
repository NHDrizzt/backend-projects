const postService = require('../services/postService');
const mapStatusHTTP = require('../utils/mapStatusHttp');

module.exports = {
    createPost: async (req, res) => {
        try {
            const userInfo = await postService.createPost(req.body, req.user);
            res.status(mapStatusHTTP(userInfo.status)).json(userInfo.data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    findAllPosts: async (_req, res) => {
        try {
            const posts = await postService.findAllPosts();
            res.status(mapStatusHTTP(posts.status)).json(posts.data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    findPostById: async (req, res) => {
        try {
            const { id } = req.params;
            const post = await postService.findPostById(id);
            res.status(mapStatusHTTP(post.status)).json(post.data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    updatePost: async (req, res) => {
        try {
            const { id } = req.params;
            const post = await postService.updatePost(id, req.body);
            res.status(mapStatusHTTP(post.status)).json(post.data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
