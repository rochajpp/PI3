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
    const pass = req.query.password;
    const key = require("../../key");

    const connection = require("../../config/dbConnection");

    const modelDisciplina = new app.app.models.DisciplinasDAO(connection);
    const modelAluno =  new app.app.models.AlunosDAO(connection);
    const modelAtividades = new app.app.models.AtividadesDAO(connection);
    const modelNotas = new app.app.models.NotasDAO(connection);
    modelNotas.obterNotas(id, (error, resultNotas) => {    
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


                    const notas = resultNotas;
                    const disciplina = resultDisciplina;

                    let media = 0;
                    let somaNota = 0;
                    let pesoTotal = 0;
                    let notaFut = 0;
                    if(notas.length == disciplina[0].quantNotas){
                        for(var i = 0; i < notas.length; i++){
                            somaNota = somaNota + (notas[i].nota * notas[i].peso);
                            pesoTotal = pesoTotal + notas[i].peso;
                        }

                        media = somaNota / pesoTotal;
                        media = media.toFixed(2);

                    } else if(notas.length == disciplina[0].quantNotas - 1){
                        let maiorPeso = 1;
                        for(var i = 0; i < notas.length; i++){
                            if(notas[i].peso > maiorPeso){
                                maiorPeso = notas[i].peso;
                            }
                            somaNota = somaNota + (notas[i].nota * notas[i].peso);
                            pesoTotal = pesoTotal + notas[i].peso;
                        }

                        let pesoFut = maiorPeso + 1;
                        pesoTotal = pesoTotal + pesoFut;
                        notaFut = ((7 * pesoTotal) - somaNota) / pesoFut;
                        notaFut = notaFut.toFixed(2);
                        console.log(somaNota);
                        console.log(pesoTotal);
                        
                    }
                    res.render("subject/infoSubject", {disciplina: resultDisciplina, aluno: resultAluno, notas: resultNotas, atividades: resultAtividades, pass: pass, key: key, media: media, notaFut: notaFut});
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
    const modelNota = new app.app.models.NotasDAO(connection);

    modelNota.deletarNota(id, (error, resultNota) => {
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
    });
}

module.exports.alterar = (app, req, res) => {
    const disciplina = req.query.disciplina;
    const aluno = req.query.aluno;
    const cripto = require("../../cripto");
    const connection = require("../../config/dbConnection");
    const model = new app.app.models.DisciplinasDAO(connection);
    const modelAluno = new app.app.models.AlunosDAO(connection);

    model.obterDisciplina(disciplina, (error, result) => {
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

            res.render("subject/alterarDisciplina", {disciplina: result[0], pass: pass * cripto, aluno: aluno});
        })
        
    });
    
}
module.exports.alterSave = (app, req, res) => {
    
    const disciplina = req.body;
    const pass = req.query.pass;
    const key = require("../../key");

    const connection = require("../../config/dbConnection");
    const model = new app.app.models.DisciplinasDAO(connection);
   
    model.alterarDisciplina(disciplina, (error, result) => {
        res.redirect("/studentPage?key=" + key + "&matricula=" + req.query.aluno + "&password=" + pass);
    });
}

module.exports.novaNota = (app, req, res) => {

}

