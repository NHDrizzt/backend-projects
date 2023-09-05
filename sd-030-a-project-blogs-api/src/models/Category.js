const Category = (sequelize, DataTypes) => {
    
    return sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }, {
        timestamps: false,
        underscored: true,
    });
    
};


module.exports = Category;
