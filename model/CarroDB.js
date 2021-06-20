const { query } = require('express');
var mysql = require('mysql');
var table = "carro7";

class CarroDB {

    //Conecta no banco de dados
    static connect() {
        var connection = mysql.createConnection({     
            host : 'localhost',
            user : 'livro',
            password : 'livro123',
            database : 'livro2'
        });
        connection.connect();
        return connection;
    }

    //Retorna a lista de carros
    static getCarros() {
        //let connection = CarroDB.connect()
        //let sql = "select * from "+ table;
        //let query = connection.query(sql, function(error, results, fields) {
            /*if(error) throw error;
            callback(results)*/
            /*if(error) {
                callback(error, null);
                return;
            }
            callback(null, results);     //Retorna os dados pela função de callback
        });
        console.log(query.sql);
        connection.end();*/

        return new Promise(function(resolve, reject) {

            let connection = CarroDB.connect();
            let sql = "select * from " + table;

            connection.query(sql, function(error, results, fields) {
                if(error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
            connection.end();
        });
    }

    //Retorna a lista de carros por tipo
    static getCarrosByTipo(tipo) {
        return new Promise(function() {
            let connection = CarroDB.connect()
            let sql = "select id,nome,tipo from "+ table +" where tipo = '"+ tipo +"'";
            let query = connection.query(sql, function(error, results, fields) {
                if(error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
            connection.end();
        });
    }

    //Retorna a lista de carros por id
    static getCarroById(id) {
        return new Promise(function(resolve, reject) {
            let connection = CarroDB.connect()
            let sql = "select * from "+ table +" where id=?";
            let query = connection.query(sql, id, function(error, results, fields) {
                if(error) {
                    reject(error);
                } else {
                    if(results.length == 0) {
                        reject(Error("Nenhum carro encontrado."));
                        return
                    }
                    
                    let carro = results[0];
                    resolve(carro);

                }
            });
            connection.end();
        });
    }

    //Salva o carro no banco de dados
    //Recebe o JSON com dados do carro como parâmetro
    static save(carro) {
        return new Promise(function(resolve, reject) {
            let connection = CarroDB.connect()
            let sql = "insert into "+ table +" set ?";
            let query = connection.query(sql, carro, function(error, results, fields) {
                if(error) {
                    reject(error);
                } else {
                    carro.id = results.insertId;
                    resolve(carro);
                }
            });
            connection.end();
        });
    }

    //Atualiza um carro no banco de dados
    static update(carro) {
        return new Promise(function(resolve, reject) {
            let connection = CarroDB.connect()
            let sql = "update "+ table +" set ? where id = ?";
            let id = carro.id;
            let query = connection.query(sql, [carro, id], function(error, results, fields) {
                if(error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
            connection.end();
        });
    }

    //Deleta um carro no banco de dados
    static delete(carro) {
        return new Promise(function(resolve, reject) {
            let connection = CarroDB.connect();
            let sql = "delete from "+ table +" where id = ?";
            let id = carro.id;
            let query = connection.query(sql, id, function(error, results, fields) {
                if(error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
            connection.end();
        });
    }

    //Deleta um carro por id
    static deleteById(id) {
        return new Promise(function(resolve, reject) {
            let connection = CarroDB.connect();
            let sql = "delete from "+ table +" where id = ?";
            let query = connection.query(sql, id, function(error, results, fields) {
                if(error) {
                    reject(error);
                } else {
                    resolve(results.affectedRows);
                }
            });
            connection.end();
        });
    }

};

module.exports = CarroDB;