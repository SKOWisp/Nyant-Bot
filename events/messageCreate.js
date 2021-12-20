const { MessageEmbed } = require('discord.js');
const { ServerSettings } = require('../utils/serverSettings');

module.exports = {
	name: 'messageCreate',
	once: false,
	execute(message) {
		if (message.author.bot) return;

		const { SETTINGS } = require('../nyant.js');
		let serverSETTINGS = SETTINGS.get(message.guildId);

		if (!serverSETTINGS) {
			serverSETTINGS = new ServerSettings(true, true);
			SETTINGS.set(message.guildId, serverSETTINGS);
		}

		let texto = message.content;
		// Remueve diacríticos
		texto = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

		// No lo cuestiones, sólo gózalo (Quien sabe como jala, pero jala)
		const regNYA = /\bn+[ \p{P}]*[yi]+?[ \p{P}]*[a4]+[nyarsz]*?\b/giu;
		const regOWVU = /\b[ou0]+[ \p{P}]*[vw]+[ \p{P}]*[ou0]+[ou0vwnrsz]*?\b/giu;

		const test1 = regNYA.test(texto) && serverSETTINGS.nya;
		const test2 = regOWVU.test(texto) && serverSETTINGS.uwu;

		if (test1) texto = texto.replaceAll(regNYA, 'n*a');
		if (test2) texto = texto.replaceAll(regOWVU, 'uw*');

		if (test1 || test2) {
			message.delete()
				.then(msg => console.log(`Deleted message from ${msg.author.username}`))
				.catch(console.error);

			const embed = new MessageEmbed()
				.setColor('000000')
				.setDescription(`${message.author} dijo: ||${texto}||`);

			message.channel.send({ embeds: [embed] });
		}
	},
};