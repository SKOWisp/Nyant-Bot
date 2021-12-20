/*
    Run This file after adding or editing commands.
*/

const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId } = require('./config.json');
const args = process.argv.slice(2);
require('dotenv').config();

if (!(args[0] == 'g' || args[0] == 'l')) {
	console.log(args);
	console.error('Pass l or g as an argument');
	process.exit(1);
}


const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}


const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

(async () => {
	try {
		if (args[0] == 'g') {
			await rest.put(Routes.applicationCommands(clientId), { body: commands });
			console.log('Successfully registered global application commands.');
		}
		else if (args[0] == 'l') {
			await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
			console.log('Successfully registered local application commands.');
		}
	}
	catch (error) {
		console.error(error);
	}
})();