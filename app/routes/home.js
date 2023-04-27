module.exports = (app) => {
    app.get("/", (req, res) => {
        app.app.controllers.home.home(app, req, res);
    });

    app.post("/login", (req, res) => {
        app.app.controllers.home.login(app, req, res);
    });
}