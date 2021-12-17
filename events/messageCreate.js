const { MessageEmbed} = require('discord.js');
const { aberracion } = require('../config.json')

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.author.bot) return;

        //No lo cuestiones, sólo gózalo (Quien sabe como jala, pero jala)
        const wordInString = (s, word) => {
            const test1 = new RegExp('\\s*\\b(?=\\w*' + word + '(\\w)\\1)\\w+\\b', 'i').test(s)
            const test2 = new RegExp('\\b' + word + '\\b', 'i').test(s);
            return (test1 || test2) ? true : false;
        };
        const texto = message.content

        if (wordInString(texto, aberracion)){
            message.delete()
                .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                .catch(console.error);

            var censura = texto.replaceAll(new RegExp('\\s*\\b(?=\\w*' + aberracion + '(\\w)\\1)\\w+\\b', 'gi'),'n*a');
            censura = censura.replaceAll(new RegExp('\\b' + aberracion + '\\b', 'gi'), 'n*a');

            const embed = new MessageEmbed()
                .setColor("000000")
                .setTitle("¡Amenaza Neutralizada!")
                .setDescription(`${message.author} dijo: ||${censura}||`);

            message.channel.send({embeds: [embed]})
        }
    }
}
