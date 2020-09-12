const Discord = require("discord.js");
const path = require('path');
var guilds = [];

module.exports.run = async(client, message, args) => {

    let langues = require(path.resolve(path.join('..', 'suwo/database/langues.json')));
    let langue = langues[message.guild.id].langues;

    if(langue === 'fr'){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'est pas autorisé(e) a utiliser cette commande !");
    } else if(langue === 'en'){
        client.guilds.cache.forEach(g => {
            guilds.push(g.name)
        });
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle("Server list")
                .setDescription(`\n__Servers__ :\n\n${guilds.join(",\n")}`)
        )
        guilds = [];
    }
}
module.exports.help = {
    name: "servers"
}