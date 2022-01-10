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
 * @returns {String}
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
 * @returns {Promise}
 */
async function getRam(name) {
    let ramusage = 0
    let totalram = 0
    switch (name) {
        case 'ArcadiaBot':
            if(!ram.tiene(name)) {
                ramusage = "null"
                totalram = "null"
            } else {
                ramusage = await ram.obtener('ArcadiaBot' + ".UsageRam")
                totalram = await ram.obtener('ArcadiaBot' + ".TotalRam")
            }
        break;
        case 'ArcadiaSecurity':
            if(!ram.tiene(name)) {
                ramusage = "null"
                totalram = "null"
            } else {
                ramusage = await ram.obtener('ArcadiaSecurity' + ".UsageRam")
                totalram = await ram.obtener('ArcadiaSecurity' + ".TotalRam")
            }
        break;        
        case 'ArcadiaTickets':
        if(!ram.tiene(name)) {
            ramusage = "null"
            totalram = "null"
        } else {
            ramusage = await ram.obtener('ArcadiaTickets' + ".UsageRam")
            totalram = await ram.obtener('ArcadiaTickets' + ".TotalRam")
        }
    break;
    }
    const stats = {
        RamUsage: ramusage,
        TotalRam: totalram
    }
    return stats;
}


/**
 * 
 * @param {String} name 
 * @returns {Promise} CpuUsage
 */
async function getCpu(name) {
    let cpuusage = 0
    switch (name) {
        case 'ArcadiaBot':
            if(!cpud.tiene(name)) {
                cpuusage = "null"
            } else {
                cpuusage = await cpud.obtener('ArcadiaBot' + ".UsageCpu")
            }
        break;
        case 'ArcadiaSecurity':
            if(!ram.tiene(name)) {
                cpuusage = "null"
            } else {
                cpuusage = await ram.obtener('ArcadiaSecurity' + ".UsageCpu") 
            }
        break;        
        case 'ArcadiaTickets':
        if(!ram.tiene(name)) {
            cpuusage = "null" 
        } else {
            cpuusage = await ram.obtener('ArcadiaTickets' + ".UsageCpu") 
        }
    break;
    }
    const stats = {
        CpuUsage: cpuusage
    }
    return stats;
}
console.log(getRam('ArcadiaBot').then(RamUsage => console.log(RamUsage)))
console.log(getCpu('ArcadiaBot').then(CpuUsage => console.log(CpuUsage)))


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
    .addField('Arcadia Bot', `${getStatus(ArcadiaBot)}\n > **RAM:** ${(await getRam('ArcadiaBot').then(x => x.RamUsage))} / ${(await getRam('ArcadiaBot').then(x => x.TotalRam))}\n **CPU:** ${(await getCpu('ArcadiaBot').then(x => x.CpuUsage))} %`)
    .addField('Arcadia Security', `${getStatus(ArcadiaSecurity)}\n > **RAM:** ${(await getRam('ArcadiaSecurity').then(x => x.RamUsage))} / ${(await getRam('ArcadiaSecurity').then(x => x.TotalRam))}\n **CPU:** ${(await getCpu('ArcadiaSecurity').then(x => x.CpuUsage))} %`)
    .addField('Arcadia Tickets', `${getStatus(ArcadiaBotTickets)}\n > **RAM:** ${(await getRam('ArcadiaTickets').then(x => x.RamUsage))} / ${(await getRam('ArcadiaTickets').then(x => x.TotalRam))}\n **CPU:** ${(await getCpu('ArcadiaTickets').then(x => x.CpuUsage))} %`)
    .setFooter({ text: `Bots Status`, iconURL: guild.iconURL({ dynamic: true })})
    .setColor('GREEN')
    .setTimestamp()

    await channel.send({ embeds: [Embed] }).then(async (mgs) => {
            setInterval(async () => {
                const EmbedEdit =  new MessageEmbed()
                .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ dynamic: true}) })
                .addField('Arcadia Bot', `${getStatus(ArcadiaBot)}\n > **RAM:** ${(await getRam('ArcadiaBot').then(x => x.RamUsage))} / ${(await getRam('ArcadiaBot').then(x => x.TotalRam))}\n **CPU:** ${(await getCpu('ArcadiaBot').then(x => x.CpuUsage))} %`)
                .addField('Arcadia Security', `${getStatus(ArcadiaSecurity)}\n > **RAM:** ${(await getRam('ArcadiaSecurity').then(x => x.RamUsage))} / ${(await getRam('ArcadiaSecurity').then(x => x.TotalRam))}\n **CPU:** ${(await getCpu('ArcadiaSecurity').then(x => x.CpuUsage))} %`)
                .addField('Arcadia Tickets', `${getStatus(ArcadiaBotTickets)}\n > **RAM:** ${(await getRam('ArcadiaTickets').then(x => x.RamUsage))} / ${(await getRam('ArcadiaTickets').then(x => x.TotalRam))}\n **CPU:** ${(await getCpu('ArcadiaTickets').then(x => x.CpuUsage))} %`)
                .setFooter({ text: `Bots Status`, iconURL: guild.iconURL({ dynamic: true })})
                .setColor('GREEN')
                .setTimestamp()

                await mgs.edit({ embeds: [EmbedEdit] })
            }, 60 * 1000)
    })


})


client.login(process.env.TOKEN)
