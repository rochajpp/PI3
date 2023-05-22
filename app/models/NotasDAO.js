function NotasDAO(connection){
    this._connection = connection;
}

NotasDAO.prototype.obterNotas = function(id, callback){
    this._connection.query('SELECT * FROM notas WHERE idDisciplina=' + id, callback);
}

NotasDAO.prototype.deletarNota = function(id, callback){
    this._connection.query('DELETE FROM notas WHERE idDisciplina=' + id, callback);
}

NotasDAO.prototype.apagarNota = function(id, callback){
    this._connection.query('DELETE FROM notas WHERE id=' + id, callback);
}

NotasDAO.prototype.addNota = function(nota, callback){
    this._connection.query('INSERT INTO notas SET ?', nota, callback);
}

module.exports = () => {
    return NotasDAO;
}