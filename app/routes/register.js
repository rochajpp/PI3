module.exports = (app) => {
    app.get("/register", (req, res) => {
        app.app.controllers.register.home(app, req, res);
    })
}