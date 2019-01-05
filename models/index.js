import Sequelize from 'sequelize'

const sequelize = new Sequelize('slack','postgres','zxczxc',{
    dialect: 'postgres',
    define:{
        underscored:true
    }
});

const db={
    User: sequelize.import('./user'),
    Channel: sequelize.import('./channel'),
    Message: sequelize.import('./message'),
    Team: sequelize.import('./team'),

}

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;