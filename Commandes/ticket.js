const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    let user = message.author.username.toLowerCase();
    let c = message.guild.channels.cache.find(channel => channel.name === `${user}-${user.discriminator}`)
    if(c){
        message.delete();
        message.author.send({embed : {
            title: 'ERREUR',
            description: 'Vous avez déjà un ticket d\'ouvert !'
        }})
        return;
    } else {

        if(args.length < 1){
            message.delete();
            return message.author.send({embed : { 
                title: 'ERREUR',
                description: 'Veuillez entrer un sujet de ticket.',
                footer: {
                    text: 'Ticket System By Cancelled__#9978'
                }
            }})
        } else{
            message.delete();
            let mod = message.guild.roles.cache.find(r => r.name === "🚨・Modérateur");
            let ch = await message.guild.channels.create(`${user}-${message.author.discriminator}`, {
                type: 'text',
                topic: args.slice(0).join(' '),
                parent: '760210260274184192',
                permissionOverwrites: [{
                    id: message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                },
                {
                    id: message.member,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY']
                },
                {
                    id: mod,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY']
                }
                ]
            });
            ch.send({embed : {
                title: message.author.username,
                description: `\nBonjour, merci d'avoir contacter nôtre support.\n\n**Raison :** ${args.slice(0).join(' ')}\n**Rappel :** Tout abus de ticket pour des raisons inutiles sera sanctionné !\n\nUn membre de l'équipe vous répondra dès que possible.`,
                timestamp: new Date()
            }})

        }

    }

};

module.exports.help = {
    name: "ticket"
}