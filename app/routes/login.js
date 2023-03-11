module.exports = (app) => {
    app.get("/enter", (req, res) => {
        app.app.controllers.login.enter(app, req, res);
    });
}