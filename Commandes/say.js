const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'est pas autorisé(e) a utiliser cette commande !");
    let botmessage = args.join(" ").replace("emoji-non", "<a:non:723442618255671408>").replace("emoji-oui", "<a:yes:723442074640449556>").replace("emoji-loading", "<a:loading:723470152393424908>");
    message.delete().catch();
    message.channel.send(botmessage)
}
module.exports.help = {
    name: "say"
}