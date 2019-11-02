#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

// abrimos conexion al servidor de RabbitMQ
amqp.connect('amqp://localhost', function(error0, connection){
    if (error0){
        throw error0;
    }

    // creamos el canal, donde reside la API
    connection.createChannel(function(error1,channel){
        if(error1)
            throw error1;

        var queue = 'hello';
        var msg = 'Hello world';

        // declarar una cola para enviar
        channel.assertQueue(queue, {
            durable: false
        });

        // publicar un mensaje en la cola
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s",msg);
    });

    // cerrar la conexión y salir
    setTimeout(function(){
        connection.close();
        process.exit(0);
    }, 500);
});

