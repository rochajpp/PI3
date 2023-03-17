module.exports = (app) => {
    app.get('/register', (req, res) => {
        app.app.controllers.admin.register(app, req, res);
    });

    app.post('/student/save', (req, res) => {
        app.app.controllers.admin.saveStudent(app, req, res);
    });
}