const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    message.delete();
    if(!message.member.hasPermission("BAN_MEMBERS")){
        return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('ERREUR')
                .setColor('DARK_RED')
                .setDescription('Il vous faut la permission `BAN_MEMBERS` pour faire cette commande.')
                .setTimestamp()
        )
    }

    if(!args[0]){
        return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('ERREUR')
                .setColor('DARK_RED')
                .setDescription('Veuillez mettre l\'identifiant de l\'utilisateur à unban.')
                .setTimestamp()
        )
    }

    if(!args[1]){
        return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('ERREUR')
                .setColor('DARK_RED')
                .setDescription('Veuillez entrer la raison du débannissement.')
                .setTimestamp()
        )
    }

    let user = args[0];
    let reason = args.slice(1).join(' ');

    try {
        message.guild.members.unban(user, {reason: reason})
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('SUCCÈS')
                .setColor('GREEN')
                .setDescription(`L'utilisateur avec pour identifiant \`\`${user}\`\` à correctement été débannis du serveur.`)
                .setTimestamp()
        )
    } catch(e){
        console.log(e.message)
    }
    
}
module.exports.help = {
    name: "unban"
}