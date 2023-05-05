module.exports.addSubject = (app, req, res) => {

    res.render("studentPage/addSubject", {matricula: req.query.matricula});  
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
                res.redirect('/studentPage?key=' + key + '&matricula=' + aluno.matricula + '&password=' + (stringData* 24244142));
    
            });
        }else{
            res.send("User not found");
        }
    })
    
    
}