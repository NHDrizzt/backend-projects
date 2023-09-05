module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'BlogPost',
                key: 'id',
            }
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'Category',
                key: 'id',
            }
        }
    }, { timestamps: false, tableName: 'posts_categories', underscored: true });
    
    PostCategory.associate = ({BlogPost, Category}) => {
        BlogPost.belongsToMany(Category, {
            as: 'categories',
            through: PostCategory,
            foreignKey: 'postId',
            otherKey: 'categoryId',
        });
    
        Category.belongsToMany(BlogPost, {
            as: 'blogPosts',
            through: PostCategory,
            foreignKey: 'categoryId',
            otherKey: 'postId',
        });
    };
    
    return PostCategory;
}
