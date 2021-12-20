const { MessageEmbed} = require('discord.js');
const { ServerSettings } = require('../utils/serverSettings')

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.author.bot) return;

        const { SETTINGS } = require('../nyant.js');
        let serverSETTINGS = SETTINGS.get(message.guildId);

        if(!serverSETTINGS){
            serverSETTINGS = new ServerSettings(true,true);
            SETTINGS.set(message.guildId, serverSETTINGS);
        }

        var texto = message.content
        //Remueve diacríticos
        texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

        //No lo cuestiones, sólo gózalo (Quien sabe como jala, pero jala)
        const regNYA = /\bn+[yi\p{P}]+?a+[nrsz]*?\b/giu
        const regOWVU= /\b[tou07]+[vw\p{P}]+?[tou07]+[nrsz]*\b/giu
        
        

        const test1 = (serverSETTINGS.nya) ? regNYA.test(texto) : false;
        const test2 = (serverSETTINGS.uwu) ? regOWVU.test(texto) : false;

        if (test1 || test2){
            let censura= texto.replaceAll(regOWVU, 'uw*');
            censura = censura.replaceAll(regNYA, 'n*a');
            
            message.delete()
                .then(msg => console.log(`Deleted message from ${msg.author.username}`))
                .catch(console.error);
                
            const embed = new MessageEmbed()
                .setColor("000000")
                .setDescription(`${message.author} dijo: ||${censura}||`);

            message.channel.send({embeds: [embed]})
        }
    }
}
