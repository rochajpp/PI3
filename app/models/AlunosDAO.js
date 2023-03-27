function AlunosDAO(connection){
    this._connection = connection;
}
//This function find the student with enrollment typed in the form
AlunosDAO.prototype.validarInfo = function(aluno, callback){
    this._connection.query('SELECT * FROM alunos WHERE matricula = ' + aluno.matricula, callback);
};

AlunosDAO.prototype.validarEmail = function(aluno, callback){
    this._connection.query("SELECT * FROM alunos WHERE email = '" + aluno.email + "'", callback);
}

AlunosDAO.prototype.salvarAluno = function (aluno, callback){
    this._connection.query('SELECT * FROM alunos', (error, result) => {
        let matricula;
        let cont;
        while(true){
            cont = 0
            matricula = Math.floor(Math.random() * 100000000);

            for(var i = 0; i < result.length; i++){
                if(matricula == result[i].matricula){
                    return;
                }
                cont++;
            }
            if(cont == result.length){
                aluno.matricula = matricula;
                this._connection.query('INSERT INTO alunos SET ?', aluno, callback);
                return;
            }
        }
        
    });
}

AlunosDAO.prototype.obterAluno = function(matricula, callback){
    this._connection.query('SELECT * FROM alunos WHERE matricula= ' + matricula, callback);
}

module.exports = () => {
    return AlunosDAO;
}