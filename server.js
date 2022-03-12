const express = require('express');
const app = express();
app.use(express.static('static'));
app.use(express.static('assets'));

const usuarios = ["Claudia", "Jorge", "Francisco", "Pablo", "Gabriel"];

//Regresamos los usuarios participantes
app.get('/abracadabra/usuarios', async(req, res) => {
    try {
        // res.send(JSON.stringify(usuarios));
        return res.send(usuarios);
    } catch (error) {
        console.log("Error al realizar la consulta: " + error);
    }
});

app.use('/abracadabra/juego/:usuario', async(req, res, next) => {
    const encontrado = usuarios.find(str => str == req.params.usuario)

    if (encontrado) {
        return next();
    } else {
        res.redirect("/who.jpeg");
    }

});

app.get("/abracadabra/conejo/:n", (req, res) => {

    const num_azar = Math.floor(Math.random() * 4);

    if (req.params.n == num_azar) {
        return res.redirect("/conejito.jpg");
    }

    res.redirect("/voldemort.jpg")

});

app.get("/abracadabra/juego/:usuario", (req, res) => {

    res.send("Bienvenido a la plataforma del juego del sombrero y el conejo")
        //${req.params.usuario};

});


app.get('*', (res, req) => {

    res.send("Esta ruta no existe");

})


app.listen(3000, () => console.log("Ejecutando en el puerto 3000"));