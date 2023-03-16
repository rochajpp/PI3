function AlunosDAO(connection){
    this._connection = connection;
}
//This function find the student with enrollment typed in the form
AlunosDAO.prototype.validarInfo = function(aluno, callback){
    this._connection.query('SELECT * FROM aluno WHERE matricula = ' + aluno.matricula, callback);
};

module.exports = () => {
    return AlunosDAO;
}