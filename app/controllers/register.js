module.exports.register = (app , req ,res) => {
    res.render('register/register');
}

module.exports.saveStudent = (app, req, res) => {
    const novoAluno = req.body;

    const connection = require('../../config/dbConnection');
    const model = new app.app.models.AlunosDAO(connection);

    model.validarEmail(novoAluno, (error, result) => {
        if(result.length > 0){
            console.log('Email já cadastrado');
        }else{
            model.salvarAluno(novoAluno, (error, result) => {
                console.log('Usuário registrado com sucesso');
                res.render('admin/register/finalRegister', {matricula: novoAluno.matricula});
            });
        }
    });

}
