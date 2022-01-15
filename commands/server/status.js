const { NodeactylClient } = require('nodeactyl')
const s = require('pterodactyl.js')
const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, Client } = require('discord.js') 
const { memory } = require('../../Utils')
const ap = new NodeactylClient('https://panel.danbot.host/', process.env.APIKEY)
const { curly } = require('node-libcurl')
const { header } = require('express/lib/response')
const ms = require('ms')
const cloudflare = require('cloudflare-scraper')
module.exports = {
    name: 'status-bot',
    description: 'Estado de alguno de los servidores de los bots',
    options: [
        {
            name: 'server-id',
            description: 'ServerID',
            type: 'STRING',
            required: true,
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     * @param {NodeactylClient} danbothost
     */
    run: async(client, interaction, danbothost) => {

        //https://panel.danbot.host/api/client/servers/da12f51f/utilization
        console.log(process.env.APIKEY)
        const serverId = interaction.options.getString('server-id', true)
        const FirstEmbed = new MessageEmbed()
        .setDescription("Obteniendo el estado del servidor "+serverId+" ")
        .setColor('YELLOW')

        interaction.followUp({ embeds: [FirstEmbed] }).then(async(msg) => {
        console.log(serverId)
            const api = process.env.TOKEN
            
            const { statusCode, data } = await curly.get(`https://panel.danbot.host/api/client/servers/${serverId}/resources`, {
                httpHeader: [
                        `Authorization: Bearer ${process.env.APIKEY}`,
                        'Content-Type: application/json',
                        'Accept: application/json'
                    ],
                SSL_VERIFYPEER: false    
            })
            console.log(statusCode)
            const ErrorEmbed = new MessageEmbed()
            .setDescription(`⛔ | No se puede mostrar el estado del servidor porque retorno el error: \`${statusCode}\``)
            .setColor('RED')

            const ButtonsErr = new MessageActionRow()
            ButtonsErr.addComponents(
                new MessageButton()
                .setCustomId('start')
                .setLabel('Iniciar')
                .setEmoji('🟢')
                .setStyle('SUCCESS')
                .setDisabled(true),
                new MessageButton()
                .setCustomId('restart')
                .setLabel('Reiniciar')
                .setEmoji('🔄')
                .setStyle('PRIMARY')
                .setDisabled(true),
                new MessageButton()
                .setCustomId('stop')
                .setLabel('Detener')
                .setEmoji('🛑')
                .setStyle('DANGER')
                .setDisabled(true),
            )
            const saw = await curly.get(`https://panel.danbot.host/api/client/servers/${serverId}/resources`, {
                httpHeader: [
                    `Authorization: Bearer ${process.env.TOKEN}`,
                    'Content-Type: application/json',
                    'Accept: application/json'
                ],
                keyPasswd: api,
                SSL_VERIFYPEER: false
                
            })
            const saws = saw.data
            const sad = saw.statusCode
            console.log(sad)
            if(statusCode == 400) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(statusCode == 401) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(statusCode == 403) {
                const options = {
                    headers: {
                        'Authorization': `Bearer ${process.env.APIKEY}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
                try {
                    const response = await cloudflare.get(`https://panel.danbot.host/api/client/servers/${serverId}/resources`, options)
                    const response2 = await cloudflare.get(`https://panel.danbot.host/api/client/servers/${serverId}`, options)
//                    if(response.statusCode == 403) {
 //                       try {
   //                         const response = await cloudflare.get(`https://panel.danbot.host/api/client/servers/${serverId}/resources`, options)
    //                    } catch {
      //                      console.error(err)
        //                }
                    //          }
                    const Embed = new MessageEmbed()
                    .addField('**Estado:**', response.attributes.current_state)
                    .addField('**Nombre:**', response2.attributes.name)
                    .addField('**Tiempo en linea:**', ms(response.attributes.resources.uptime))
                    .addField('**CPU:**', response.attributes.resources.cpu_absolute + '%')
                    .addField('**NED:**', `↗️ ${memory(response.attributes.resources.network_rx_bytes)} / ↘️ ${memory(data.attributes.resources.network_tx_bytes)}`)
                    .addField('**RAM:**', memory(response.attributes.resources.memory_bytes))

                    
                    const Buttons = new MessageActionRow()
                    Buttons.addComponents(
                        new MessageButton()
                        .setCustomId('start')
                        .setLabel('Iniciar')
                        .setEmoji('🟢')
                        .setStyle('SUCCESS'),
                        new MessageButton()
                        .setCustomId('restart')
                        .setLabel('Reiniciar')
                        .setEmoji('🔄')
                        .setStyle('PRIMARY'),
                        new MessageButton()
                        .setCustomId('stop')
                        .setLabel('Detener')
                        .setEmoji('🛑')
                        .setStyle('DANGER'),
                    )

                    return msg.edit({ embeds: [Embed], components: [Buttons] })
                } catch (err) {
                    try {
                        const response = await cloudflare.get(`https://panel.danbot.host/api/client/servers/${serverId}/resources`, options)
                        const response2 = await cloudflare.get(`https://panel.danbot.host/api/client/servers/${serverId}`, options)
    //                    if(response.statusCode == 403) {
     //                       try {
       //                         const response = await cloudflare.get(`https://panel.danbot.host/api/client/servers/${serverId}/resources`, options)
        //                    } catch {
          //                      console.error(err)
            //                }
                        //          }
                        const Embed = new MessageEmbed()
                        .addField('**Estado:**', response.attributes.current_state)
                        .addField('**Nombre:**', response2.attributes.name)
                        .addField('**Tiempo en linea:**', ms(response.attributes.resources.uptime))
                        .addField('**CPU:**', response.attributes.resources.cpu_absolute + '%')
                        .addField('**NED:**', `↗️ ${memory(response.attributes.resources.network_rx_bytes)} / ↘️ ${memory(data.attributes.resources.network_tx_bytes)}`)
                        .addField('**RAM:**', memory(response.attributes.resources.memory_bytes))
    
                        
                        const Buttons = new MessageActionRow()
                        Buttons.addComponents(
                            new MessageButton()
                            .setCustomId('start')
                            .setLabel('Iniciar')
                            .setEmoji('🟢')
                            .setStyle('SUCCESS'),
                            new MessageButton()
                            .setCustomId('restart')
                            .setLabel('Reiniciar')
                            .setEmoji('🔄')
                            .setStyle('PRIMARY'),
                            new MessageButton()
                            .setCustomId('stop')
                            .setLabel('Detener')
                            .setEmoji('🛑')
                            .setStyle('DANGER'),
                        )
    
                        return msg.edit({ embeds: [Embed], components: [Buttons] })
                    } catch (err) {
                        try {
                            const response = await cloudflare.get(`https://panel.danbot.host/api/client/servers/${serverId}/resources`, options)
                            const response2 = await cloudflare.get(`https://panel.danbot.host/api/client/servers/${serverId}`, options)
        //                    if(response.statusCode == 403) {
         //                       try {
           //                         const response = await cloudflare.get(`https://panel.danbot.host/api/client/servers/${serverId}/resources`, options)
            //                    } catch {
              //                      console.error(err)
                //                }
                            //          }
                            const Embed = new MessageEmbed()
                            .addField('**Estado:**', response.attributes.current_state)
                            .addField('**Nombre:**', response2.attributes.name)
                            .addField('**Tiempo en linea:**', ms(response.attributes.resources.uptime))
                            .addField('**CPU:**', response.attributes.resources.cpu_absolute + '%')
                            .addField('**NED:**', `↗️ ${memory(response.attributes.resources.network_rx_bytes)} / ↘️ ${memory(data.attributes.resources.network_tx_bytes)}`)
                            .addField('**RAM:**', memory(response.attributes.resources.memory_bytes))
        
                            
                            const Buttons = new MessageActionRow()
                            Buttons.addComponents(
                                new MessageButton()
                                .setCustomId('start')
                                .setLabel('Iniciar')
                                .setEmoji('🟢')
                                .setStyle('SUCCESS'),
                                new MessageButton()
                                .setCustomId('restart')
                                .setLabel('Reiniciar')
                                .setEmoji('🔄')
                                .setStyle('PRIMARY'),
                                new MessageButton()
                                .setCustomId('stop')
                                .setLabel('Detener')
                                .setEmoji('🛑')
                                .setStyle('DANGER'),
                            )
        
                            return msg.edit({ embeds: [Embed], components: [Buttons] })
                        } catch (err) {
                            console.log(err)
                        }
                    }
                }
                return;
            }
            if(statusCode == 404) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(statusCode == 405) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(statusCode == 406) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(statusCode == 410) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(statusCode == 412) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(statusCode == 418) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(statusCode == 429) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(statusCode == 500) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})
            if(statusCode == 503) return msg.edit({ embeds: [ErrorEmbed], components: [ButtonsErr]})

            console.log(data.attributes)

            const Embed = new MessageEmbed()
            .addField('**Estado:**', data.attributes.current_state)
            .addField('**Nombre:**', saws.attributes.name)
            .addField('**Tiempo en linea:**', ms(data.attributes.resources.uptime))
            .addField('**CPU:**', data.attributes.resources.cpu_absolute + '%')
            .addField('**NED:**', `↗️ ${memory(data.attributes.resources.network_rx_bytes)} / ↘️ ${memory(data.attributes.resources.network_tx_bytes)}`)
            .addField('**RAM:**', memory(data.attributes.resources.memory_bytes))

            
            const Buttons = new MessageActionRow()
            Buttons.addComponents(
                new MessageButton()
                .setCustomId('start')
                .setLabel('Iniciar')
                .setEmoji('🟢')
                .setStyle('SUCCESS'),
                new MessageButton()
                .setCustomId('restart')
                .setLabel('Reiniciar')
                .setEmoji('🔄')
                .setStyle('PRIMARY'),
                new MessageButton()
                .setCustomId('stop')
                .setLabel('Detener')
                .setEmoji('🛑')
                .setStyle('DANGER'),
            )

            msg.edit({ embeds: [Embed], components: [Buttons] })

        })
  
    }
}
