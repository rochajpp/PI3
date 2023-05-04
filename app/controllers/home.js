module.exports.home = (app, req, res) => {
    res.render("home/home", {validacao: {}, incorrectPassword: false});
}

module.exports.login = (app, req, res) => {
    const aluno = req.body;
    console.log(aluno);

    req.assert('matricula', 'Digite a matrícula').notEmpty();
    req.assert('senha', 'Digite a senha').notEmpty();
    req.assert('senha', 'Digite a senha corretamente. Ex: 25072003').len(8, 9);

    const error = req.validationErrors();

    if(error){
        console.log(error);
        res.render('home/home', {validacao: error, incorrectPassword: false});
        return;
    }

    const connection = require('../../config/dbConnection');
    const model = new app.app.models.AlunosDAO(connection);

    model.validarInfo(aluno, (error, result) => {
        if(result == false){      
            res.render("errors/userNotFound");
            return;
        }
        const nascimento = result[0].data_nascimento;
        const data = new Date(nascimento);

        let day;

        if(data.getDate() < 10){
            day = "0" + data.getDate();
        }else{
            day = data.getDate().toString();
        }

        let month;

        if(data.getMonth() < 10){
            month = "0" + (data.getMonth() + 1);
        }else{
            month = (data.getMonth() + 1).toString();
        }

        const stringData = day + month  + data.getFullYear().toString();
        
        let senha = aluno.senha;

        if(senha == stringData){
            
            const key = require('../../key');
            res.redirect('/studentPage?key=' + key + '&matricula=' + result[0].matricula + '&password=' + (stringData * 24244142));
            console.log("Student validated");
        }else{
            res.render("home/home", {validacao: {}, incorrectPassword: true});
            console.log("Senha incorreta");
        
        }
    });

};