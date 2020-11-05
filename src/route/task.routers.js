const { request } = require('express');
const express = require('express');
const router = express.Router();

const Task = require('../models/task');

/* router.get('/', (req, res) => {
    Task.find( function(err, tasks){
        console.log( tasks );
    });
    res.json({
        status: 'API Funciona'
    });
}); */

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    //console.log( tasks );
    //res.json('Recibido !!');
    res.json( tasks );
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById( req.params.id );
    res.json( task );
});

router.post('/', async (req, res) => {
    //console.log( req.body );
    const { title, description } = req.body;
    const task = new Task({ title, description });
    //console.log( task );
    //res.json('Recibido POST !!');
    await task.save();
    res.json({ status: 'Tarea Guardada !!' });
});

router.put('/:id', async (req, res) => {
    //console.log( req.body );
    const { title, description } = req.body;
    const newTask = { title, description };
    //console.log( req.params.id );
    //res.json('Recibido PUT !!');
    await Task.findByIdAndUpdate( req.params.id, newTask );
    res.json({ status: 'Tarea Actualizada !!' });
});

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove( req.params.id );
    res.json({ status: 'Tarea Eliminada !!' });
});

module.exports = router;