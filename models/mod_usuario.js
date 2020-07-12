const db = require("./db")

// Model para Usuarios 
const Usuario = db.sequelize.define('usuarios', {
    firstname: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    checkemail: {
        type: db.Sequelize.BOOLEAN,
        defaultValue: false
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: db.Sequelize.JSONB
    }
})

module.exports = Usuario




/*

usuarios.create({
    firstname: "Denis",
    lastname: "Leivas",
    email: "denis.leivas@gmail.com",
    password: "123456",
    descricao: {
        logradouro: "Rua São Paulo",
        nro: 1296,
        cidade: "São Caetano do Sul",
        bairro: "Ceramica",
        cep: "09530-211"
    }

}).then(function () {
    console.log("Inserido com sucesso!!")
}).catch(function (err) {
    console.log(`Erro ap inserir: ${err}`)
})
*/