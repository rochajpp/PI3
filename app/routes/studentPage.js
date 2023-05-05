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
}