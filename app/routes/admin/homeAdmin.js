module.exports = (app) => {
    app.get('/admin/home', (req, res) => {
        app.app.controllers.admin.home(app, req, res);
    });

    app.post('/admin/home/login', (req, res) => {
        app.app.controllers.admin.login(app, req, res);
    });
};