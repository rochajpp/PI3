function AtividadesDAO(connection){
    this._connection = connection;
}

AtividadesDAO.prototype.obterAtividades = function (id, callback){
    this._connection.query('SELECT * FROM atividades WHERE idDisciplina=' + id, callback);
}

AtividadesDAO.prototype.salvarAtividade = function (atividade, callback){
    this._connection.query('INSERT INTO atividades SET ?', atividade, callback);
}

AtividadesDAO.prototype.removerAtividade = function (id, callback){
    this._connection.query('DELETE FROM atividades WHERE id=' + id, callback);
}

module.exports = () => {
    return AtividadesDAO;
}