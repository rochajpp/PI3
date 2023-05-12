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

    app.get("/studentPage/alterarDisciplina", (req, res) => {
        app.app.controllers.subject.alterarDisciplina(app, req, res);
    });
    app.post("/studentPage/alterar", (req, res) => {
        app.app.controllers.subject.alterar(app, res, res);
    });
}