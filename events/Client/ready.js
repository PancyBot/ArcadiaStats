const { getCpu, getRam, getStatus } = require('../../Utils')
const { Client, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'ready',

    /**
     * @param {Client} client 
     */

    async execute(client) {
        console.log(0)
        let ArcadiaBot = ''
        let ArcadiaSecurity = ''
        let ArcadiaBotTickets = ''
        const guild = client.guilds.cache.get('873371564664574053')
        const channel = guild.channels.cache.get('930661431655936010')
        channel.bulkDelete('1')
            .catch(async(err) => {
                console.error(err)
            })
        client.user.setStatus('invisible')
    
        setInterval(() => {
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
        }, 30000)
    
        const Embed =  new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ dynamic: true}) })
        .setDescription('Estado actual de los bots de Arcadia')
        .addField('Arcadia Bot', ` > **ESTADO:** ${getStatus(ArcadiaBot)}\n > **RAM:** ${(await getRam('ArcadiaBot').then(x => x.RamUsage))} / ${(await getRam('ArcadiaBot').then(x => x.TotalRam))}\n > **CPU:** ${(await getCpu('ArcadiaBot').then(x => x.CpuUsage))} %`)
        .addField('Arcadia Security', ` > **ESTADO:** ${getStatus(ArcadiaSecurity)}\n > **RAM:** ${(await getRam('ArcadiaSecurity').then(x => x.RamUsage))} / ${(await getRam('ArcadiaSecurity').then(x => x.TotalRam))}\n > **CPU:** ${(await getCpu('ArcadiaSecurity').then(x => x.CpuUsage))} %`)
        .addField('Arcadia Tickets', ` > **ESTADO:** ${getStatus(ArcadiaBotTickets)}\n > **RAM:** ${(await getRam('ArcadiaTickets').then(x => x.RamUsage))} / ${(await getRam('ArcadiaTickets').then(x => x.TotalRam))}\n > **CPU:** ${(await getCpu('ArcadiaTickets').then(x => x.CpuUsage))} %`)
        .setFooter({ text: `Bots Status`, iconURL: guild.iconURL({ dynamic: true })})
        .setColor('GREEN')
        .setTimestamp()
    
        await channel.send({ embeds: [Embed] }).then(async (mgs) => {
                setInterval(async () => {
                    const EmbedEdit =  new MessageEmbed()
                    .setDescription('Estado actual de los bots de Arcadia')
                    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ dynamic: true}) })
                    .addField('Arcadia Bot', ` > **ESTADO:** ${getStatus(ArcadiaBot)}\n > **RAM:** ${(await getRam('ArcadiaBot').then(x => x.RamUsage))} / ${(await getRam('ArcadiaBot').then(x => x.TotalRam))}\n > **CPU:** ${(await getCpu('ArcadiaBot').then(x => x.CpuUsage))} %`)
                    .addField('Arcadia Security', ` > **ESTADO:** ${getStatus(ArcadiaSecurity)}\n > **RAM:** ${(await getRam('ArcadiaSecurity').then(x => x.RamUsage))} / ${(await getRam('ArcadiaSecurity').then(x => x.TotalRam))}\n > **CPU:** ${(await getCpu('ArcadiaSecurity').then(x => x.CpuUsage))} %`)
                    .addField('Arcadia Tickets', ` > **ESTADO:** ${getStatus(ArcadiaBotTickets)}\n > **RAM:** ${(await getRam('ArcadiaTickets').then(x => x.RamUsage))} / ${(await getRam('ArcadiaTickets').then(x => x.TotalRam))}\n > **CPU:** ${(await getCpu('ArcadiaTickets').then(x => x.CpuUsage))} %`)
                    .setFooter({ text: `Bots Status`, iconURL: guild.iconURL({ dynamic: true })})
                    .setColor('GREEN')
                    .setTimestamp()
    
                    await mgs.edit({ embeds: [EmbedEdit] })
                }, 60 * 1000)
        })
    
    
    }
}