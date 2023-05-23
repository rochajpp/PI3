module.exports.register = (app , req ,res) => {
    res.render('register/register');
}

module.exports.saveStudent = (app, req, res) => {
    const novoAluno = req.body;

    const connection = require('../../config/dbConnection');
    const model = new app.app.models.AlunosDAO(connection);

    model.validarEmail(novoAluno, (error, result) => {
        if(result.length > 0){
            res.send('Email já cadastrado');
        }else{
            model.salvarAluno(novoAluno, (error, result) => {
                console.log('Usuário registrado com sucesso');
                res.render('register/finalRegister', {matricula: novoAluno.matricula});
            });
        }
    });

}
