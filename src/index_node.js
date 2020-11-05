//console.log("--INDEX JS NODE--");
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { mongoose } = require('./database');

const app = express();

// Settings / Configuracion
app.set('port', process.env.PORT || 3000);

// Middlewares / funciones que se ejecutan antes de que lleguen a las rutas
app.use( morgan('dev') );
app.use( express.json() );

// Routes / Rutas-URL
app.use('/api/tasks', require('./route/task.routers') );

// Static files / Archivos estaticos
app.use( express.static(path.join(__dirname, '../dist')) );
console.log( path.join(__dirname, '../dist') );

// Starting server / Iniciar el servidor
app.listen( app.get('port'), () =>{
    //console.log("Servidor en puerto 3000");
    console.log(`Servidor en puerto ${app.get('port')}`);
});