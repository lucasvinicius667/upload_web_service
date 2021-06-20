let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/view'));    //Permite usar arquivos estáticos na pasta view

//Define um template para fazer requisições pro arquivo de rotas
//O prefixo api é padrão do REST
app.use('/api/carros', require('./routes/carros'));
app.use('/api/upload', require('./routes/upload'));

//Teste de erro
//Printa a pilha de erro(stacktrace) no browser pela pesquisa da rota mapeada abaixo
/*app.get('/teste_erro', function(req, res) {

    throw Error('Erro Ninja');

});*/

//Tratamento de erro para rotas não mapeadas
//O bloco de tratamento de erro deve ser colocado sempre depois dos blocos de tratamento das rotas mapeadas
/*app.use(function(req, res, next) {

    res.status(404);
    res.json({err: "Não encontrado"});
    /*let err = new Error('Não encontrado');
    err.status(404);
    next(err);*/
    
//});

//Rota genérica de erro 500
//app.use(function(err, req, res, next) {

    /*console.error(err.stack);
    res.status(500);
    res.json({erro: "Ocorreu um erro: " + err.message});*/
    //res.status(500);
    //res.json({erro: err.message});
    //res.json({erro: 'Erro na transação'});

//});

let server = app.listen(3000, function() {

    let host = "localhost";
    let port = server.address().port;

    console.log("Servidor iniciado em http://%s:%s", host, port);

});