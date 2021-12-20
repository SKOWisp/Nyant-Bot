const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Muestra los comandos del bot'),
	async execute(interaction) {

        const descripcion = '/help - Muestra los comandos del bot\n \
        /ping - Muestra la salud del bot\n \
        ADMINS\n \
        /nya - Activa/Desactiva la censura de nya\n \
        /uwu - Activa/Desactiva la censura de uwu\n'
        
        const embed = new MessageEmbed()
            .setColor("000000")
            .setTitle("Comandos")
            .setDescription(descripcion)
            .setImage('https://i.imgur.com/0MkKjea.png')
            .setFooter('Errores: Wisp#4537','https://i.imgur.com/w0hMzhR.png');

		interaction.reply({embeds: [embed], ephemeral: true});
	},
};