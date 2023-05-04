module.exports = (app) => {
    app.get("/studentPage", (req, res) => {
        app.app.controllers.studentPage.homePage(app, req, res);
    });
}