const { Client, MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'ready',

    /**
     * @param {Client} client
     */
    async execute(client) {
        const Guild  = client.guilds.cache.get('741489702963773501')
        const { channels } = Guild
        const channel = channels.cache.get('931375353782485032')
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
					console.log(json)
				})
            }, 1 * 1000)
        })
    }
}