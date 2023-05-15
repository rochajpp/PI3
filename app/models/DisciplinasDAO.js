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

DisciplinasDAO.prototype.alterarDisciplina = function(disciplina, callback){
    this._connection.query('UPDATE disciplinas SET nome="' + disciplina.nome + '", professor="' + disciplina.professor + '", quantNotas=' + disciplina.quantNotas + ', localidade="' + disciplina.localidade + '", sala="' + disciplina.sala + '" WHERE id=' + disciplina.id, callback );
}

module.exports = () => {
    return DisciplinasDAO;
}