function AlunosDAO(connection){
    this._connection = connection;
}
//This function find the student with enrollment typed in the form
AlunosDAO.prototype.validarInfo = function(aluno, callback){
    this._connection.query('SELECT * FROM alunos WHERE matricula = ' + aluno.matricula, callback);
};

AlunosDAO.prototype.gerarMatricula = function (callback){
    this._connection.query('SELECT * FROM alunos', callback)
}

AlunosDAO.prototype.salvarAluno = function(aluno, callback){
    
    this._connection.query('INSERT INTO alunos SET ?', aluno, callback);
}

module.exports = () => {
    return AlunosDAO;
}