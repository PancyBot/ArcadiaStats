const Discord = require('discord.js')
const { Client,  MessageEmbed } = require('discord.js')
const megadb = require('megadb');
const ram = new  megadb.crearDB('ram', 'Stats-for-Arcadia-Bots')
const cpud = new megadb.crearDB('cpu', 'Stats-for-Arcadia-Bots')
const keepalive = require('./server')
keepalive()
require('dotenv').config()
const client = new Client({
    intents: 32767
})
/**
 * 
 * @param {String} status 
 * @returns 
 */
function getStatus(status) {
    let statusExt = ''
    switch (status) {
        case 'offline':
        case null:
        statusExt = '🔴 | OFFLINE'
        break;
        case 'online':
        case 'dnd':
        case 'idle':
        statusExt = '🟢 | ONLINE'
        break;
    }
    return statusExt;
}
/**
 * 
 * @param {String} name 
 * @returns 
 */
async function getRam(name) {
    let ramusage = 0
    let totalram = 0
    switch (name) {
        case 'ArcadiaBot':
            if(!ram.obtener(name)) {
                ramusage = null
                totalram = null
            } else {
                ramusage = await ram.obtener('ArcadiaBot' + ".UsageRam")
                totalram = await ram.obtener('ArcadiaBot' + ".TotalRam")
            }
        break;
        case 'ArcadiaSecurity':
            if(!ram.obtener(name)) {
                ramusage = null
                totalram = null
            } else {
                ramusage = await ram.obtener('ArcadiaSecurity')
                totalram = await ram.obtener('ArcadiaSecurity')
            }
        break;        
        case 'ArcadiaTickets':
        if(!ram.obtener(name)) {
            ramusage = null
            totalram = null
        } else {
            ramusage = await ram.obtener('ArcadiaTickets')
            totalram = await ram.obtener('ArcadiaTickets')
        }
    break;
    }
    const stats = {
        RamUsage: ramusage,
        TotalRam: totalram
    }
    return stats;
}
console.log(getRam('ArcadiaBot').then(RamUsage => console.log(RamUsage)))


client.on('ready', async (client) => {
    let ArcadiaBot = ''
    let ArcadiaSecurity = ''
    let ArcadiaBotTickets = ''
    const guild = client.guilds.cache.get('741489702963773501')
    const channel = guild.channels.cache.get('929447998121971753')
    channel.bulkDelete('1')
        .catch(async(err) => {
            console.error(err)
        })
    client.user.setStatus('invisible')


    if(guild.members.cache.get('928105971883049010').presence) {
        ArcadiaBot = guild.members.cache.get('928105971883049010').presence.status;
    } else {
        ArcadiaBot = null        
    }
    if(guild.members.cache.get('927553317704458290').presence) {
        ArcadiaSecurity = guild.members.cache.get('927553317704458290').presence.status
    } else {
        ArcadiaSecurity = null
    }
    if(guild.members.cache.get('925939396534997002').presence) {
        ArcadiaBotTickets = guild.members.cache.get('925939396534997002').presence.status;
    } else {
        ArcadiaBotTickets = null
    }

    const Embed =  new MessageEmbed()
    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ dynamic: true}) })
    .addField('Arcadia Bot', `${getStatus(ArcadiaBot)}\nRam: ${(await getRam('ArcadiaBot').then(x => x.RamUsage)).toLocaleString()}mb/${(await getRam('ArcadiaBot').then(x => x.TotalRam)).toLocaleString()}mb`)
    .addField('Arcadia Security', `${getStatus(ArcadiaSecurity)}`)
    .addField('Arcadia Tickets', `${getStatus(ArcadiaBotTickets)}`)
    .setFooter({ text: `Bots Status`, iconURL: guild.iconURL({ dynamic: true })})
    .setColor('GREEN')
    .setTimestamp()

    await channel.send({ embeds: [Embed] }).then(async (mgs) => {
            setInterval(async () => {
                const EmbedEdit =  new MessageEmbed()
                .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ dynamic: true}) })
                .addField('Arcadia Bot', `${getStatus(ArcadiaBot)}`)
                .addField('Arcadia Security', `${getStatus(ArcadiaSecurity)}`)
                .addField('Arcadia Tickets', `${getStatus(ArcadiaBotTickets)}`)
                .setFooter({ text: `Bots Status`, iconURL: guild.iconURL({ dynamic: true })})
                .setColor('GREEN')
                .setTimestamp()

                await mgs.edit({ embeds: [EmbedEdit] })
            }, 60 * 1000)
    })


})


client.login(process.env.TOKEN)
