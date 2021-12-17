module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
        if (!interaction.isCommand()) return;

	    const command = interaction.client.commands.get(interaction.commandName);

	    if (!command) return;

	    try {
		    await command.execute(interaction);
	    } catch (error) {
		    console.error(error);
		await interaction.reply({ content: '¡Hubo un error intentando ejecutar el comando!', ephemeral: true });
	    }
    }
}