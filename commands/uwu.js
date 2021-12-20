const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
const { ServerSettings } = require('../utils/serverSettings');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uwu')
		.setDescription('Activa/Desactiva la censura de uwu'),
	async execute(interaction) {
		if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
			interaction.reply({
				content: 'No tienes los permisos para realizar esta acción. Contacta a un administrador.',
				ephemeral: true,
			});
			return;
		}

		const { SETTINGS } = require('../nyant.js');
		let serverSETTINGS = SETTINGS.get(interaction.guildId);

		if (!serverSETTINGS) {
			serverSETTINGS = new ServerSettings(true, true);
			SETTINGS.set(interaction.guildId, serverSETTINGS);
		}

		serverSETTINGS.uwu = !serverSETTINGS.uwu;

		let embed;
		if (serverSETTINGS.uwu) {
			embed = new MessageEmbed()
				.setColor('329632')
				.setDescription('UWU y sus variaciones ahora serán censuradas.');
		}
		else {
			embed = new MessageEmbed()
				.setColor('6496C8')
				.setDescription('UWU y sus variaciones ya no serán censuradas');
		}

		interaction.reply({ embeds: [embed] });
	},
};