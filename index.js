const app = require('./config/server');

app.get("/", function(req, res){
    res.send('Teste');
});

app.get('/login', function(req, res){
    res.render("index");
})

app.listen('80', function(){
    console.log("Servidor ON");
})