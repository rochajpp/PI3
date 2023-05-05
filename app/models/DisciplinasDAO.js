function DisciplinasDAO(connection){
    this._connection = connection;
}

DisciplinasDAO.prototype.salvarDisciplina = function(disciplina, callback){
    this._connection.query('INSERT INTO disciplinas SET ?', disciplina, callback);
}

module.exports = () => {
    return DisciplinasDAO;
}