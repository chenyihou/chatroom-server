export default (sequelize, DataTypes) => {
    const Region = sequelize.define('region', {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
    });

    Region.associate = models => {
        Region.belongsToMany(models.User, {
            through: 'member',
            foreignKey: {
                name: 'regionId',
                field: 'region_id',
            }
        });
    };

    return Region;
};