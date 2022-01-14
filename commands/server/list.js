const { NodeactylClient } = require('nodeactyl')
const { CommandInteraction, MessageEmbed, Message } = require('discord.js')

module.exports = {
    name: 'list',
    description: 'Lista de los servidores de la api',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     * @param {NodeactylClient} danbothost
     */
    run: async(client, interaction, danbothost) => {
        const embed1 = new MessageEmbed()
        .setDescription('⏳ | Obteniendo la lista de los servidores...')
        .setColor('YELLOW')

        
        await interaction.followUp({ embeds: [embed1] }).then(async(msg) => {
            const servers = danbothost.getAllServers()
            servers
                .catch(err => {
                    const embed2 = new MessageEmbed()
                    .setDescription(`⛔ | El servidor retorno la respuesta \`${err}\``)
                    .setColor('RED')

                    msg.edit({ embeds: [embed2] })

                     console.error(err)
                    })
                .then(x => {
                    
                    const embed2 = new MessageEmbed()
                    .setTitle('Servers List')
                    .addField('ServersID:', `\`\`\`1-. ${(x.data[0].attributes.identifier).toString()}\n2-. ${(x.data[1].attributes.identifier).toString()}\n3-. ${(x.data[2].attributes.identifier).toString()}\n4-. ${(x.data[3].attributes.identifier).toString()}\n5-. ${(x.data[4].attributes.identifier).toString()}\`\`\``, true)
                    .addField('ServersID:', `\`\`\`1-. ${(x.data[0].attributes.name).toString()}\n2-. ${(x.data[1].attributes.name).toString()}\n3-. ${(x.data[2].attributes.name).toString()}\n4-. ${(x.data[3].attributes.name).toString()}\n5-. ${(x.data[4].attributes.name).toString()}\`\`\``, true)
                    .setColor('GREEN')
                    .setTimestamp()
                    msg.edit({ embeds: [embed2] })
                    console.log(x.data)
                    console.log(x.data.join(' '))
                })
        })
    }
}