const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    let user = message.mentions.users.first();
    if(!user){
        message.delete();
        return message.author.send(
            new Discord.MessageEmbed()
                .setTitle('**ERREUR**')
                .setColor('RED')
                .setDescription('Veuillez mentionner l\'utilisateur à qui appartient le ticket.')
                .setTimestamp()
        )
    }
    let c = message.guild.channels.cache.find(channel => channel.name === `${user.username.toLowerCase()}-${user.discriminator}`)
    if(!c){
        message.delete();
        message.author.send({embed : {
            title: 'ERREUR',
            description: 'Ce utilisateur n\'a aucun ticket d\'ouvert.',
            color: 'RED'
        }})
        return;
    }
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        message.delete();
        message.author.send({embed : {
            title: 'ERREUR',
            description: `Vous n'avez pas la permission de faire cette commande.`,
            color: 'RED'
        }})
    } else {
        c.delete();
        message.author.send({embed : {
            title: 'SUCCÈS',
            description: `Le ticket \`\`${message.channel.name}\`\` à bien été supprimé.`,
            color: 'GREEN'
        }})
    }

};

module.exports.help = {
    name: "close"
}