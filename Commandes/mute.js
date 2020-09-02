const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    message.delete();
    if(!message.member.hasPermission("VIEW_LOGS")){
        return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('ERREUR')
                .setColor('DARK_RED')
                .setDescription('Il vous faut la permission `VIEW_LOGS` pour faire cette commande.')
                .setTimestamp()
        )
    }

    if(!args[0]){
        return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('ERREUR')
                .setColor('DARK_RED')
                .setDescription('Veuillez mentionner un utilisateur')
                .setTimestamp()
        )
    }

    if(!args[1]){
        return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('ERREUR')
                .setColor('DARK_RED')
                .setDescription('Veuillez entrer la raison du mute.')
                .setTimestamp()
        )
    }

    let user = message.mentions.members.first() || args[0];

    if(message.guild.member(user).hasPermission('ADMINISTRATOR')){
        return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('ERREUR')
                .setColor('DARK_RED')
                .setDescription('Je ne peux pas mute cette personne car elle a la permission `ADMINISTRATOR`.')
                .setTimestamp()
        )
    }

    await user.send(
        new Discord.MessageEmbed()
            .setTitle('ATTENTION')
            .setColor('DARK_RED')
            .setDescription(`Vous avez été rendu muet sur le serveur \`\`${message.guild.name}\`\`.\n\n**Modérateur :** ${message.author}\n**Raison :** ${args.slice(1).join(' ')}`)
            .setTimestamp()
    )

    let muteRole = message.guild.roles.cache.find(r => r.name === 'Mute');

    if(!muteRole){
        try{
            muteRole = await message.guild.roles.create({
                data: {
                    name: "Mute",
                    color: "#000000",
                    premissions: "NONE"
                }
            })
        } catch(e){
            console.log(e.stack);
        }
        
    }

    await user.roles.add(muteRole)
    message.channel.send(
        new Discord.MessageEmbed()
            .setTitle('SUCCÈS')
            .setColor('GREEN')
            .setDescription(`L'utilisateur <@${user.id}> à correctement été rendu muet.\n\n**Raison :** ${args.slice(1).join(' ')}`)
            .setTimestamp()
    )
    
}
module.exports.help = {
    name: "mute"
}