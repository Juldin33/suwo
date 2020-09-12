const Discord = require("discord.js");
const path = require('path');

module.exports.run = async(client, message, args) => {

    let langues = require(path.resolve(path.join('..', 'suwo/database/langues.json')));
    let langue = langues[message.guild.id].langues;

    if(langue === 'fr'){
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
        } catch(e){
            console.log(e.message)
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('ERREUR')
                    .setColor('DARK_RED')
                    .setDescription('Cet utilisateur n\'est pas bannis.')
                    .setTimestamp()
            )
        }

        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('SUCCÈS')
                .setColor('GREEN')
                .setDescription(`L'utilisateur avec pour identifiant \`\`${user}\`\` à correctement été débannis du serveur.`)
                .setTimestamp()
        )

    } else if(langue === 'en'){
        message.delete();
        if(!message.member.hasPermission("BAN_MEMBERS")){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('ERROR')
                    .setColor('DARK_RED')
                    .setDescription('You need `BAN_MEMBERS` permission to unban members.')
                    .setTimestamp()
            )
        }

        if(!args[0]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('ERROR')
                    .setColor('DARK_RED')
                    .setDescription('Please enter the user id.')
                    .setTimestamp()
            )
        }

        if(!args[1]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('ERROR')
                    .setColor('DARK_RED')
                    .setDescription('Please enter a reason.')
                    .setTimestamp()
            )
        }

        let user = args[0];
        let reason = args.slice(1).join(' ');

        try {
            message.guild.members.unban(user, {reason: reason})
        } catch(e){
            console.log(e.message)
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('ERROR')
                    .setColor('DARK_RED')
                    .setDescription('This user is not banned from the server.')
                    .setTimestamp()
            )
        }

        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('SUCCESS')
                .setColor('GREEN')
                .setDescription(`The user with id \`\`${user}\`\` has been successfully unbaned.`)
                .setTimestamp()
        )

    }

    
    
}
module.exports.help = {
    name: "unban"
}