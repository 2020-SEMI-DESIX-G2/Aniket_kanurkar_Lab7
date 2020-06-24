const express=require('express');
const app=express();

const bodyparser=require('body-parser');

const connectmongo=require('./db');
const Estudiantes=require('./modelo/estudiante');
app.use(bodyparser.json())

const PORT=3000;


app.get('/estudiantes/', async (req, res) => {
    const estudiantes = await Estudiantes.find().select('nombre edad');
    res.json({
        estudiantes,
        cantidad: estudiantes.length
    });
});
app.post('/estudiantes/', async (req, res) => {
    const { nombre, edad } = req.body;
    await Estudiantes.create({ nombre, edad });
    res.json({ nombre, edad });
});
app.get('/estudiantes/:id', async (req, res) => {
    try {
        const estudiante = await Estudiantes.findById(req.params.id).select('nombre edad');
        res.json(estudiante);
    } catch (error) {
        console.log(error);
        res.json({});
    }
});

app.put('/estudiantes/:id', async (req, res) => {
    try {
        const estudiante = await (await Estudiantes.findById(req.params.id)).updateOne({nombre:req.params.nombre,edad:req.params.edad})
        res.json(estudiante);
    } catch (error) {
        console.log(error);
        res.json({});
    }
});

app.delete('/estudiantes/:id', async (req, res) => {
    try {
        const estudiante = await Estudiantes.findById(req.params.id).deleteOne();
        res.json(estudiante);
    } catch (error) {
        console.log(error);
        res.json({});
    }
});

connectmongo().then(() => {
    app.listen(PORT, () => {
      console.log(`Ejecutando en el puerto ${PORT}`);
    });
});