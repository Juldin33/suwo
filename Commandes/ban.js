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
                    .setDescription('Veuillez mentionner un utilisateur ou mettre son identifiant.')
                    .setTimestamp()
            )
        }

        if(!args[1]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('ERREUR')
                    .setColor('DARK_RED')
                    .setDescription('Veuillez entrer la raison du bannissement.')
                    .setTimestamp()
            )
        }

        let user = message.mentions.members.first() || args[0];

        if(message.guild.member(user).hasPermission('ADMINISTRATOR')){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('ERREUR')
                    .setColor('DARK_RED')
                    .setDescription('Je ne peux pas bannir cette personne car elle a la permission `ADMINISTRATOR`.')
                    .setTimestamp()
            )
        }

        await user.send(
            new Discord.MessageEmbed()
                .setTitle('ATTENTION')
                .setColor('DARK_RED')
                .setDescription(`Vous avez été bannis du serveur \`\`${message.guild.name}\`\`.\n\n**Modérateur :** ${message.author}\n**Raison :** ${args.slice(1).join(' ')}`)
                .setTimestamp()
        )
        await user.ban()
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('SUCCÈS')
                .setColor('GREEN')
                .setDescription(`L'utilisateur avec pour identifiant \`\`${user.id}\`\` à correctement été bannis du serveur.\n\n**Raison :** ${args.slice(1).join(' ')}`)
                .setTimestamp()
        )
    } else if(langue === 'en'){
        message.delete();
        if(!message.member.hasPermission("BAN_MEMBERS")){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('ERROR')
                    .setColor('DARK_RED')
                    .setDescription('You need `BAN_MEMBERS` permission to ban members.')
                    .setTimestamp()
            )
        }

        if(!args[0]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('ERROR')
                    .setColor('DARK_RED')
                    .setDescription('Please mention someone.')
                    .setTimestamp()
            )
        }

        if(!args[1]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('ERROR')
                    .setColor('DARK_RED')
                    .setDescription('Please enter the ban reason.')
                    .setTimestamp()
            )
        }

        let user = message.mentions.members.first() || args[0];

        if(message.guild.member(user).hasPermission('ADMINISTRATOR')){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('ERROR')
                    .setColor('DARK_RED')
                    .setDescription('I can\'t banish this user beacause he have `ADMINISTRATOR` permissions.')
                    .setTimestamp()
            )
        }

        await user.send(
            new Discord.MessageEmbed()
                .setTitle('WARNING')
                .setColor('DARK_RED')
                .setDescription(`You've just been banished from \`\`${message.guild.name}\`\`.\n\n**Moderator :** ${message.author}\n**Reason :** ${args.slice(1).join(' ')}`)
                .setTimestamp()
        )
        await user.ban()
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('SUCCESS')
                .setColor('GREEN')
                .setDescription(`The user with id \`\`${user.id}\`\` has been successfully banned.\n\n**Reason :** ${args.slice(1).join(' ')}`)
                .setTimestamp()
        )
    }
    
}
module.exports.help = {
    name: "ban"
}