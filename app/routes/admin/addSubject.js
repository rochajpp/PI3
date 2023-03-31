module.exports = (app) => {
    app.get('/addSubject', (req, res) => {
        app.app.controllers.subject.addSubject(app, req, res);
    });

    app.post('/saveSubject', (req, res) => {
        
    });
}