import Sequelize from 'sequelize'

const sequelize = new Sequelize('findmatch','postgres','zxczxc',{
    dialect: 'postgres',
    define:{
        underscored:true
    }
});

const db={
    User: sequelize.import('./user'),
    Activity: sequelize.import('./activity'),
    Message: sequelize.import('./message'),
    Region: sequelize.import('./region'),

}

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;