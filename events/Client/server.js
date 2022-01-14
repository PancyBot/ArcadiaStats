const { Client, MessageEmbed, Channel } = require('discord.js')
const fetch = require('node-fetch')
const { getStatusMinecraft } = require('../../Utils')
module.exports = {
    name: 'ready',

    /**
     * @param {Client} client
     */
    async execute(client) {
        const Guild  = client.guilds.cache.get('741489702963773501')
        const { channels } = Guild
        const channel = channels.cache.get('931375353782485032')
        channel.bulkDelete('1')
            .catch(async(err) => {
                console.error(err)
            })
        const options = {
            headers: {
                'Method': 'GET',
                'Accept': 'application/json'
            }
        }

        const FirstEmbed = new MessageEmbed()
        .setDescription('⏳ | Obteniendo el estado del servidor')
        .setColor('YELLOW')
        await channel.send({ embeds: [FirstEmbed] }).then(async msg => {
            setTimeout(async() => {
                await fetch('https://api.mcsrvstat.us/2/149.56.243.216:19194', options).then(res => res.json()).then(json => {
                    getStatusMinecraft(json).then(status => {
                    if(status.StatusIf === true) {
                        let players = ['']
                        if(!json.players.list) return players = 'No hay jugadores'
                        players = json.players.list.join()
                        const FirstEmbedStatus = new MessageEmbed()
                        .setTitle('Estado del servidor')
                        .addFields([
                            {
                                name: '**Status:**',
                                value: status.Status,
                                inline: true
                            },
                            {
                                name: `**Version:**`,
                                value: json.version,
                                inline: true
                            },
                            {
                                name: '**Capacidad:**',
                                value: `${json.players.online} / ${json.players.max}`,
                                inline: true
                            },
                            {
                                name: '**Jugadores conectados**',
                                value: `\`${players}\``
                            }
                        ])
                        .setColor('GREEN')
                        .setThumbnail(Guild.iconURL({ dynamic: true }))
                        .setFooter({ text: 'Estado actualizado cada 5m', iconURL: Guild.iconURL({ dynamic: true })})
                        .setTimestamp()

                        msg.edit({ embeds: [FirstEmbedStatus] })
                    } else if(status.StatusIf === false) {
                        const FirstEmbedStatus = new MessageEmbed()
                        .setTitle('Estado del servidor')
                        .setFields([
                            {
                                name: '**Status:**',
                                value: status.Status,
                                inline: true
                            },
                            {
                                name: '**Version:**',
                                value: 'Unknown',
                                inline: true
                            },
                            {
                                name: '**Capacidad**',
                                value: '0 / 0',
                                inline: true
                            },
                        ])
                        .setColor('RED')
                        .setThumbnail(Guild.iconURL({ dynamic: true }))
                        .setFooter({ text: 'Estado actualizado cada 5m', iconURL: Guild.iconURL({ dynamic: true })})
                        .setTimestamp()
                        
                        msg.edit({ embeds: [FirstEmbedStatus] })
                    } else {
                        const FirstEmbedStatus = new MessageEmbed()
                        .setTitle('Estado del servidor')
                        .setFields([
                            {
                                name: '**Status:**',
                                value: 'null',
                                inline: true
                            },
                            {
                                name: '**Version:**',
                                value: 'Unknown',
                                inline: true
                            },
                            {
                                name: '**Capacidad**',
                                value: '0 / 0',
                                inline: true
                            },
                        ])
                        .setColor('RED')
                        .setThumbnail(Guild.iconURL({ dynamic: true }))
                        .setFooter({ text: 'Estado actualizado cada 5m', iconURL: Guild.iconURL({ dynamic: true })})
                        .setTimestamp()
                        
                        msg.edit({ embeds: [FirstEmbedStatus] })
                    }
					})
				})
            }, 5 * 1000)
            setInterval(async() => {
                await fetch('https://api.mcsrvstat.us/2/149.56.243.216:19194', options).then(res => res.json()).then(json => {
                    getStatusMinecraft(json).then(status => {
                    if(status.StatusIf === true) {
                        let players = ['']
                        if(!json.players.list) return players = 'No hay jugadores'
                        players = json.players.list.join()
                        const FirstEmbedStatus = new MessageEmbed()
                        .setTitle('Estado del servidor')
                        .addFields([
                            {
                                name: '**Status:**',
                                value: status.Status,
                                inline: true
                            },
                            {
                                name: `**Version:**`,
                                value: json.version,
                                inline: true
                            },
                            {
                                name: '**Capacidad:**',
                                value: `${json.players.online} / ${json.players.max}`,
                                inline: true
                            },
                            {
                                name: '**Jugadores conectados**',
                                value: `\`${players}\``
                            }
                        ])
                        .setColor('GREEN')
                        .setThumbnail(Guild.iconURL({ dynamic: true }))
                        .setFooter({ text: 'Estado actualizado cada 5m', iconURL: Guild.iconURL({ dynamic: true })})
                        .setTimestamp()

                        msg.edit({ embeds: [FirstEmbedStatus] })
                    } else if(status.StatusIf === false) {
                        const FirstEmbedStatus = new MessageEmbed()
                        .setTitle('Estado del servidor')
                        .setFields([
                            {
                                name: '**Status:**',
                                value: status.Status,
                                inline: true
                            },
                            {
                                name: '**Version:**',
                                value: 'Unknown',
                                inline: true
                            },
                            {
                                name: '**Capacidad**',
                                value: '0 / 0',
                                inline: true
                            },
                        ])
                        .setColor('RED')
                        .setThumbnail(Guild.iconURL({ dynamic: true }))
                        .setFooter({ text: 'Estado actualizado cada 5m', iconURL: Guild.iconURL({ dynamic: true })})
                        .setTimestamp()
                        
                        msg.edit({ embeds: [FirstEmbedStatus] })
                    } else {
                        const FirstEmbedStatus = new MessageEmbed()
                        .setTitle('Estado del servidor')
                        .setFields([
                            {
                                name: '**Status:**',
                                value: 'null',
                                inline: true
                            },
                            {
                                name: '**Version:**',
                                value: 'Unknown',
                                inline: true
                            },
                            {
                                name: '**Capacidad**',
                                value: '0 / 0',
                                inline: true
                            },
                        ])
                        .setColor('RED')
                        .setThumbnail(Guild.iconURL({ dynamic: true }))
                        .setFooter({ text: 'Estado actualizado cada 5m', iconURL: Guild.iconURL({ dynamic: true })})
                        .setTimestamp()
                        
                        msg.edit({ embeds: [FirstEmbedStatus] })
                    }
					})
				})
            }, 5 * 60 * 1000)
        })
    }
}