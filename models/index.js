import Sequelize from 'sequelize'

const sequelize = new Sequelize('findmatch','postgres','Hcy64616883!',{
    host:'postgres.c592vyslvlgs.ca-central-1.rds.amazonaws.com',
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