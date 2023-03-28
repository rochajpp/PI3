module.exports.homePage = (app, req, res) => {
    const key = require('../../key');
    const params = req.query;
    if(req.query.key == key){
        if(params.matricula == undefined){
            res.send("No user found");
        }else{
            const matricula = params.matricula;

            const connection = require('../../config/dbConnection');
            const model = new app.app.models.AlunosDAO(connection);

            model.obterAluno(matricula, (error, result) => {
                res.render('admin/studentPage/studentPage', {aluno: result});
            });
        }
    } else{
        res.send('No validation');
    }
    
}