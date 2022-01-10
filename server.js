const express = require("express");
const megadb = require('megadb');
const ram = new  megadb.crearDB('ram', 'Stats-for-Arcadia-Bots')
const cpud = new megadb.crearDB('cpu', 'Stats-for-Arcadia-Bots')
const app = express();

const request = require("request");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.all('/', (req, res) => {
    res.send('El bot sigue encendido.');
});         

app.post('/stats', async (req, res) => {
    const Body = req.body
    const headers = req.headers;
    if(!headers) {
        return res
        .sendStatus(401)
        .send({ error: JSON.stringify({ message: 'No se proporciono una api Key', status: '403' })});
    }
    if(!headers.keyapi) {
        return res
        .sendStatus(401)
        .send({ error: JSON.stringify({ message: 'No se proporciono una api Key', status: '403' })});
    }
    if(!headers.keyapi == process.env.APIKEYACEPT) {
        return res
        .sendStatus(401)
        .send({ error: JSON.stringify({ message: 'La api key que se proporciono no es valida', status: '403' })});
    }
    let ramusage = 0
    let ramtotal = 0
    let cpu = 0
    console.log(Body)
    if(!Body) return res.sendStatus(500)
    if(!Body.data) return res.sendStatus(500)
    if(!Body.data.name) return res.sendStatus(503)
    if(!Body.data.ram) {
        ramusage = null
        ramtotal = null
    }
    if(!Body.data.ram.usage ) {
        ramusage = null
    }
    if(!Body.data.ram.total) {
        ramusage = null
    }
    if(!Body.data.cpu) cpu = null
    if(!Body.data.cpu.usage) cpu = null

    ramusage = Body.data.ram.usage;
    ramtotal = Body.data.ram.total;
    cpu = Body.data.cpu.usage;

    await ram.establecer(Body.data.name, {
        UsageRam: ramusage,
        TotalRam: ramtotal
    })
    await cpud.establecer(Body.data.name, {
        UsageCpu: cpu
    })
    res
      .send({ message: 'Autorizado', status: 200 })
      .sendStatus(200)
})
 
module.exports = () => {
    app.listen(process.env.PORT, () => {
        console.log(`Servidor listo, PUERTO: ${process.env.PORT}`);
    });
    return true;
}