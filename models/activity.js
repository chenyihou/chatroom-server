export default (sequelize, DataTypes) => {
    const Activity = sequelize.define('activity', {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
    });

    Activity.associate = (models) => {
        Activity.belongsToMany(models.User, {
            through: 'activity_member',
            foreignKey: {
                name: 'activityId',
                field: 'activity_id',
            },
        });
    };

    return Activity;
};