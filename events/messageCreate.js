const { MessageEmbed} = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.author.bot) return;

        const regNYA = new RegExp(/\bn+(\W|_){0,8}[y]+([y]|\1){0,16}[a4]+([a4]|\1){0,16}?[nrsz]*\b/, 'gi');
        const regOWVU= new RegExp(/\b[tou7]+(\W|_){0,8}[vw]+([vw]|\1){0,16}[tou7]+\1{0,8}?[nrsz]*\b/, 'gi');

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
