const Discord = require("discord.js");
const path = require('path');

module.exports.run = async(client, message, args) => {

    let langues = require(path.resolve(path.join('..', 'suwo/database/langues.json')));
    let langue = langues[message.guild.id].langues;

    if(langue === 'fr'){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'est pas autorisé(e) a utiliser cette commande !");
    } else if(langue === 'en'){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You are not allowed to use that command !");
    }

    let botmessage = args.join(" ")
    message.delete().catch();
    message.channel.send(botmessage)
}
module.exports.help = {
    name: "say"
}