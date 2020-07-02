const Sequelize = require("sequelize")
const sequelize = new Sequelize('db_dglapp', 'dgleivas', '11kitzen', { // parametros: BD, User, PAssword
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

/*
Certifica se a conexão aconteceu
sequelize.authenticate()
    .then(() => console.log("**Conectado ao BD postgres:db_dglapp!**"))
    .catch(err => console.log(`Erro na conexao: ${err}`))
*/