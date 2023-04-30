module.exports.home = (app, req, res) => {
    
    res.render('admin/home/adminHome', {validacao: {}});
};

module.exports.login = (app, req, res) => {
    app.disable('/admin/studentPage');
    const aluno = req.body;
    console.log(aluno);

    req.assert('matricula', 'Enter the Enrollment').notEmpty();
    req.assert('senha', 'Enter the password').notEmpty();
    req.assert('senha', 'Enter the password correctly. Ex: 25072003').len(8, 9);

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
            res.send('User not found');
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
            res.redirect('/admin/studentPage?key=' + key + '&matricula=' + result[0].matricula + '&password=' + (stringData * 24244142));
            console.log("Student validated");
        }else{
            res.send('Incorrect password');
            console.log("Senha incorreta");
        }
    });

};

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
