module.exports.homePage = (app, req, res) => {
    const key = require('../../key');
    const params = req.query;

    const connection = require('../../config/dbConnection');
    const model = new app.app.models.AlunosDAO(connection);

  
    
    model.validarSenha(params.matricula, (error, result) => {
        const nascimento = result[0].data_nascimento;
        const data = new Date(nascimento);
        const cripto = require("../../cripto");

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

        if(stringData == params.password / cripto){   
            if(params.key == key){
                if(params.matricula == undefined){
                    res.send("No user found");
                }else{
                    const matricula = params.matricula;

                    const connection = require('../../config/dbConnection');
                    const model = new app.app.models.AlunosDAO(connection);

                    model.obterAluno(matricula, (error, result) => {
                        const alunoInfo = result;
                        model.receberDisciplinas(matricula, (error, result) => {
                            res.render('studentPage/studentPage', {aluno: alunoInfo, disciplinas: result, pass: params.password});
                        });          
                    
                        
                    });
                }
            } else{
                res.send('No validation');
            }
        }else{
            res.send("Error validation");
        }
    });
    
};

