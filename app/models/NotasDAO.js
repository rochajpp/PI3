function NotasDAO(connection){
    this._connection = connection;
}

NotasDAO.prototype.obterNotas = function(id, callback){
    this._connection.query('SELECT * FROM notas WHERE idDisciplina=' + id, callback);
}

module.exports = () => {
    return NotasDAO;
}