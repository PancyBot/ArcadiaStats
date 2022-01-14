const keepalive = require('./server')
const megadb = require('megadb');
const ram = new  megadb.crearDB('ram', 'Stats-for-Arcadia-Bots')
const cpud = new megadb.crearDB('cpu', 'Stats-for-Arcadia-Bots')

keepalive()
require('dotenv').config()
const { Client, Collection, MessageEmbed } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client;

client.slashCommands = new Collection();
client.login(process.env.TOKEN)
.catch(err => console.error(err))
.then(x => console.debug(x))
console.log(0)

 setInterval(async () => {
    await ram.establecer('ArcadiaBot', {
        UsageRam: 'null',
        TotalRam: 'null'
    })
    await ram.establecer('ArcadiaSecurity', {
        UsageRam: 'null',
        TotalRam: 'null'
    })
    await ram.establecer('ArcadiaTickets', {
        UsageRam: 'null',
        TotalRam: 'null'
    })
    await cpud.establecer('ArcadiaBot', {
        UsageCpu: 'null'
    })
    await cpud.establecer('ArcadiaSecurity', {
        UsageCpu: 'null'
    })
    await cpud.establecer('ArcadiaTickets', {
        UsageCpu: 'null'
    })
 }, 45979)


require('./handlers/commands')(client)
require('./handlers/events')(client)

