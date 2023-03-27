module.exports = (app) => {
    app.get('/admin/studentPage', (req, res) => {
        app.app.controllers.studentPage.homePage(app, req, res);
    });
}