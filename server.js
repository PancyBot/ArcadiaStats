const express = require("express");
const megadb = require('megadb');
const ram = new  megadb.crearDB('ram', 'Stats-for-Arcadia-Bots')
const cpud = new megadb.crearDB('cpu', 'Stats-for-Arcadia-Bots')
const app = express();
app.all('/', (req, res) => {
    res.send('El bot sigue encendido.');
});         

app.post('/ram', async (req, res) => {
    const Body = req.body;
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
    cpu = Body.data.data.cpu.usage;

    await ram.establecer(Body.data.name, {
        UsageRam: ramusage,
        TotalRam: ramtotal
    })
    await cpud.establecer(Body.data.name, {
        UsageCpu: cpu
    })
})
 
module.exports = () => {
    app.listen(3000, () => {
        console.log(`Servidor listo, PUERTO: 3000`);
    });
    return true;
}