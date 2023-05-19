module.exports.addAtividade = (app, req, res) => {
    const atividade = req.body;
    const infos = req.query;

    const dia = atividade.data.charAt(8) + atividade.data.charAt(9);
    const mes = atividade.data.charAt(5) + atividade.data.charAt(6);
    const ano = atividade.data.charAt(0) + atividade.data.charAt(1) + atividade.data.charAt(2) + atividade.data.charAt(3);
    
    let dataAtual = new Date();

    let diaAtual = dataAtual.getDate();
    let mesAtual = dataAtual.getMonth() + 1;
    let anoAtual = dataAtual.getFullYear();

    
    if(ano >= anoAtual){
        if(mes >= mesAtual){
            if(dia > diaAtual){
                const connection = require("../../config/dbConnection");
                const model = new app.app.models.AtividadesDAO(connection);
            
                model.salvarAtividade(atividade, (error, result) => {
                    res.redirect("/studentPage/subject?disciplina=" + atividade.idDisciplina + "&aluno=" + infos.aluno + "&password=" + infos.password);
                });
            }else{
                res.send("<h1> Dia inválido! </h1>");
            }
        }else{
            res.send("<h1> Mês inválido! </h1>");
        }
    }else{
        res.send("<h1> Ano inválido! </h1>")
    }
  
}

module.exports.rmAtividade = (app, req, res) => {
    const infos = req.query;
    const id = infos.idAtividade;
    
    const connection = require("../../config/dbConnection");
    const model = new app.app.models.AtividadesDAO(connection);

    model.removerAtividade(id, (error, result) => {
        res.redirect("/studentPage/subject?disciplina=" + infos.disciplina + "&aluno=" + infos.aluno + "&password=" + infos.pass);
    });

}