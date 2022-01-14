const { Client, MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'ready',

    /**
     * @param {Client} client
     */
    async execute(client) {
        const Guild  = client.guilds.cache.get('')
        const { channels } = Guild
        const channel = channels.cache.get('')
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
                await fetch('https://api.mcsrvstat.us/bedrock/2/149.56.243.216:19194', options).then(async(req, statusCode) => {
                    console.log(data, statusCode)
                })  
            }, 30 * 1000)
        })
    }
}