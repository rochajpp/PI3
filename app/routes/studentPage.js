module.exports = (app) => {
    app.get("/studentPage", (req, res) => {
        app.app.controllers.studentPage.homePage(app, req, res);
    });

    app.get("/studentPage/addSubject", (req, res) => {
        app.app.controllers.subject.addSubject(app, req, res);
    });

    app.post("/studentPage/saveSubject", (req, res) => {
        app.app.controllers.subject.saveSubject(app, req, res);
    });
    app.get("/studentPage/subject", (req, res) => {
        app.app.controllers.subject.subject(app, req, res);
    });

    app.get("/studentPage/deletarDisciplina", (req, res) => {
        app.app.controllers.subject.deletarDisciplina(app, req, res);
    });

    app.get("/alterarDisciplina", (req, res) => {
        app.app.controllers.subject.alterar(app, req, res);
    });
    app.post("/alterarSave", (req, res) => {
        app.app.controllers.subject.alterSave(app, req, res);
    });

    app.post("/addAtividade", (req, res) => {
        app.app.controllers.atividade.addAtividade(app, req, res);
    });

    app.get("/removerAtividade", (req, res) => {
        app.app.controllers.atividade.rmAtividade(app, req, res);
    });

    app.post("/salvarNota", (req, res) => {
        app.app.controllers.nota.salvarNota(app, req, res);
    })

    app.get("/removerNota", (req, res) => {
        app.app.controllers.nota.removerNota(app, req ,res);
    });
}