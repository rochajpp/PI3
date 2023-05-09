function AtividadesDAO(connection){
    this._connection = connection;
}

AtividadesDAO.prototype.obterAtividades = function (id, callback){
    this._connection.query('SELECT * FROM atividades WHERE idDisciplina=' + id, callback);
}

module.exports = () => {
    return AtividadesDAO;
}