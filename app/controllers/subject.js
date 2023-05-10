module.exports.addSubject = (app, req, res) => {

    res.render("subject/addSubject", {matricula: req.query.matricula});  
};

module.exports.saveSubject = (app, req, res) => {
    const newSubject = req.body;
    
    const connection = require("../../config/dbConnection");
    const model = new app.app.models.DisciplinasDAO(connection);
    const modelAluno = new app.app.models.AlunosDAO(connection);

    modelAluno.obterAluno(newSubject.idAluno, (error, result) => {
        console.log(result);
        if(result != null){
            const key = require("../../key");
            const aluno = result[0];

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
    
            model.salvarDisciplina(newSubject, (error, result) => {
                res.redirect('/studentPage?key=' + key + '&matricula=' + aluno.matricula + '&password=' + (stringData* cripto));
    
            });
        }else{
            res.send("User not found");
        }
    })
}

module.exports.subject = (app, req, res) => {

    const id = req.query.disciplina;
    const matricula = req.query.aluno;

    const connection = require("../../config/dbConnection");

    const modelDisciplina = new app.app.models.DisciplinasDAO(connection);
    const modelAluno =  new app.app.models.AlunosDAO(connection);
    const modelAtividades = new app.app.models.AtividadesDAO(connection);
    const modelNotas = new app.app.models.NotasDAO(connection);

    modelDisciplina.obterDisciplina(id, (error, resultDisciplina) => {
        modelAluno.obterAluno(matricula, (error, resultAluno) => {
            modelAtividades.obterAtividades(id, (error, resultAtividades) => {
                for(var i = 0; i < resultAtividades.length; i++){
                    const data= new Date(resultAtividades[i].data);

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
            
                    resultAtividades[i].data = day + "/" + month  + "/" + data.getFullYear().toString();
                   
                }
                modelNotas.obterNotas(id, (error, resultNotas) => {           
                    res.render("subject/infoSubject", {disciplina: resultDisciplina, aluno: resultAluno, notas: resultNotas, atividades: resultAtividades});
                });
            });
        });
    });
    
}

module.exports.deletarDisciplina = (app, req, res) => {
    const id = req.query.disciplina;
    const aluno = req.query.aluno;
    const key = require("../../key");
    const cripto = require("../../cripto");

    
    const connection = require("../../config/dbConnection");
    const model = new app.app.models.DisciplinasDAO(connection);
    const modelAluno = new app.app.models.AlunosDAO(connection);

    model.deletarDisciplina(id, (error, result) => {
        modelAluno.validarSenha(aluno, (error, resultAluno) => {

            const data= new Date(resultAluno[0].data_nascimento);

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

            const pass = day + month + data.getFullYear().toString();
            
            

            res.redirect("/studentPage?key=" + key + "&matricula=" + aluno + "&password=" + pass * cripto);
        })
    });
}

module.exports.alterarDisciplina = (app, req, res) => {
    const connection = require("../../config/dbConnection");
    const model = new app.app.models.DisciplinasDAO(connection);
    const id = req.query.disciplina;

    model.obterDisciplina(id, (error, result) => {
    
        res.render("subject/formAlterar", {disciplina: result});
    });
    
}

module.exports.alterar = (app, req, res) => {
    res.send(req.body);

    const connection = require("../../config/dbConnection");
    const model = new app.app.models.DisciplinasDAO(connection);
    
    

}