const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Muestra los comandos del bot'),
	async execute(interaction) {

        const descripcion = '/help - Muestra los comandos del bot\n \
        /ping - Muestra la salud del bot\n \
        /kick - No sólo censura el n*a, sino que también expulsa al usuario que puso tal abominación. (Sólo moderadores, WIP)'
        
        const embed = new MessageEmbed()
            .setColor("000000")
            .setTitle("Comandos")
            .setDescription(descripcion)
            .setImage('https://i.imgur.com/0MkKjea.png')
            .setFooter('Errores: Wisp#4537','https://i.imgur.com/w0hMzhR.png');

		interaction.reply({embeds: [embed], ethereal: true});
	},
};