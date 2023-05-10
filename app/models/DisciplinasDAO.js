function DisciplinasDAO(connection){
    this._connection = connection;
}

DisciplinasDAO.prototype.salvarDisciplina = function(disciplina, callback){
    this._connection.query('INSERT INTO disciplinas SET ?', disciplina, callback);
}
DisciplinasDAO.prototype.obterDisciplina = function(id, callback){
    this._connection.query('SELECT * FROM disciplinas WHERE id=' + id, callback);
}
DisciplinasDAO.prototype.deletarDisciplina = function(id, callback){
    this._connection.query('DELETE FROM disciplinas WHERE id=' + id, callback);
}
DisciplinasDAO.prototype.alterarDisciplina = function(id, callback){
    
}
module.exports = () => {
    return DisciplinasDAO;
}