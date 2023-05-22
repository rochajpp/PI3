module.exports.salvarNota = (app, req, res) => {
    const nota = req.body;
    const infos = req.query;
    
    const connection = require("../../config/dbConnection");
    const model = new app.app.models.NotasDAO(connection);

    model.addNota(nota, (error, result) => {
        res.redirect("/studentPage/subject?disciplina=" + nota.idDisciplina + "&aluno=" + nota.matriculaAluno + "&password=" + infos.password);
    });

}