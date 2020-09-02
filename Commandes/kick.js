const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    message.delete();
    if(!message.member.hasPermission("KICK_MEMBERS")){
        return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('ERREUR')
                .setColor('DARK_RED')
                .setDescription('Il vous faut la permission `KICK_MEMBERS` pour faire cette commande.')
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
                .setDescription('Veuillez entrer la raison de l\'exclusion.')
                .setTimestamp()
        )
    }

    let user = message.mentions.members.first() || args[0];

    if(message.guild.member(user).hasPermission('ADMINISTRATOR')){
        return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('ERREUR')
                .setColor('DARK_RED')
                .setDescription('Je ne peux pas exclure cette personne car elle a la permission `ADMINISTRATOR`.')
                .setTimestamp()
        )
    }

    await user.send(
        new Discord.MessageEmbed()
            .setTitle('ATTENTION')
            .setColor('DARK_RED')
            .setDescription(`Vous avez été exclus du serveur \`\`${message.guild.name}\`\`.\n\n**Modérateur :** ${message.author}\n**Raison :** ${args.slice(1).join(' ')}`)
            .setTimestamp()
    )
    await user.kick()
    message.channel.send(
        new Discord.MessageEmbed()
            .setTitle('SUCCÈS')
            .setColor('GREEN')
            .setDescription(`L'utilisateur avec pour identifiant \`\`${user.id}\`\` à correctement été exclus du serveur.\n\n**Raison :** ${args.slice(1).join(' ')}`)
            .setTimestamp()
    )
    
}
module.exports.help = {
    name: "kick"
}