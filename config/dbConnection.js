const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'systemdev',
    password: 'database'
});

if(connection.connect((err) => {
    if(err){
        console.log("Erro ao conectar ao banco de dados: " + err.stack);
        return;
    }

    console.log("Conexão bem sucedida ao banco de dados com ID: " + connection.threadId);
}));

module.exports = connection;