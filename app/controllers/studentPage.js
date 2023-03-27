module.exports.homePage = (app, req, res) => {

    const params = req.query;
    if(params.length == undefined){
        res.send("No user found")
    }else{
        const matricula = params.matricula;

        const connection = require('../../config/dbConnection');
        const model = new app.app.models.AlunosDAO(connection);

        model.obterAluno(matricula, (error, result) => {
            res.render('admin/studentPage/studentPage', {aluno: result});
        });
    }

    
}