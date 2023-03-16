module.exports.home = (app, req, res) => {
    res.render('admin/home/adminHome', {validacao: {}});
};

module.exports.login = (app, req, res) => {
    const aluno = req.body;
    console.log(aluno);

    req.assert('matricula', 'Digite a matrícula').notEmpty();
    req.assert('senha', 'Digite a senha').notEmpty();

    const error = req.validationErrors();

    if(error){
        console.log(error);
        res.render('admin/home/adminHome', {validacao: error});
        return;
    }

    const connection = require('../../config/dbConnection');
    const model = new app.app.models.AlunosDAO(connection);

    model.validarInfo(aluno, (error, result) => {
        if(result == false){
            
            res.send('Usuário não encontrado');
            return;
        }
        res.send(result);
    });

};