const client = require('../../index')
const {NodeactylClient} = require('nodeactyl')
const { CommandInteraction } = require('discord.js')
const danbothost = new NodeactylClient('https://panel.danbot.host/', process.env.APIKEY)

module.exports = {
	name: 'interactionCreate',

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @returns 
     */

	async execute(interaction) {
		    // Slash Command Handling
   // Slash Command Handling
   if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: null }).catch(() => {});
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd)
        return interaction.followUp(
            
            
            
            
            { content: "An error has occured " });

    const args = [];

    for (let option of interaction.options.data) {
        if (option.type === "SUB_COMMAND") {
            if (option.name) args.push(option.name);
            option.options?.forEach((x) => {
                if (x.value) args.push(x.value);
            });
        } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(interaction.user.id);
    if(!interaction.user.id == '711329342193664012') return interaction.followUp({ ephemeral: true, content: 'Solo el dueño del bot puede usar los comandos'})
    cmd.run(client, interaction, danbothost, args);
}

// Context Menu Handling
if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.slashCommands.get(interaction.commandName);
    if (command) command.run(client, interaction);
}
	}
}