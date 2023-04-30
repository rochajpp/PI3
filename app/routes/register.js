module.exports = (app) => {
    app.get("/register", (req, res) => {
        app.app.controllers.register.register(app, req, res);
    })

    app.post("/student/save", (req, res) => {
        app.app.controllers.register.saveStudent(app, req, res);
    })  
}