const db = require("./db")

// Model para Usuarios 
const usuarios = db.sequelize.define('usuarios', {
    firstname: {
        type: db.Sequelize.STRING,
    },
    lastname: {
        type: db.Sequelize.STRING,
    },
    email: {
        type: db.Sequelize.STRING
    },
    password: {
        type: db.Sequelize.STRING
    },
    descricao: {
        type: db.Sequelize.JSONB
    }
})

module.exports = usuarios




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