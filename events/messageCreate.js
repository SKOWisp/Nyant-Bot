const { MessageEmbed} = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.author.bot) return;

        const regNYA = new RegExp('\\b[A-Z]{0,8}[n]{1,16}[ -_]*[y]{1,16}[ -_]*[a]{1,16}[ -_]*[n]{0,16}[ -_]*[A-Z]{0,8}\\b', 'gi');
        const regOWVU= new RegExp('\\b[A-Z]{0,8}[tou7]{1,16}[ -_]*[uvw]{1,16}[ -_]*[tou7]{1,16}[ -_]*[A-Z]{0,8}\\b', 'gi');

        //No lo cuestiones, sólo gózalo (Quien sabe como jala, pero jala)
        const aberracionEnStr = (str) => {
            const test1 = regNYA.test(str)
            const test2 = regOWVU.test(str)
            return (test1 || test2) ? true : false;
        };
        var texto = message.content
        //Remueve diacríticos
        texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

        if (aberracionEnStr(texto)){
            message.delete()
                .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                .catch(console.error);

            var censura = texto.replaceAll(regNYA,'n*a');
            censura = censura.replaceAll(regOWVU, 'uw*');

            const embed = new MessageEmbed()
                .setColor("000000")
                .setDescription(`${message.author} dijo: ||${censura}||`);

            message.channel.send({embeds: [embed]})
        }
    }
}
