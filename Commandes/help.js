const Discord = require("discord.js");
const path = require('path');

module.exports.run = async(client, message, args) => {

    let langues = require(path.resolve(path.join('..', 'suwo/database/langues.json')));
    let langue = langues[message.guild.id].langues;

    if(langue === 'fr'){
        const embed = await message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Système d\'aide')
                .setColor('ORANGE')
                .setDescription('Veuillez cochez les réactions en fonction du code ci-dessous :\n\n> 📪: ``Recevoir l\'aide en message privés``,\n> 📝: ``Recevoir l\'aide ici.``')
        )
        await embed.react('📪');
        await embed.react('📝');

        const filter = (reaction, user) => {
            return ['📪', '📝'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
    
        let bool = false;
        let prefixes = require(path.resolve(path.join('..', 'suwo/database/prefixes.json')));
        let prefix = prefixes[message.guild.id].prefixes;
        
        client.on('messageReactionAdd', (reaction, user) => {
            if (reaction.emoji.name === '📪' || reaction.emoji.name === '📝' && user.id === message.author.id && user.id != client.user.id) {
    
                if(bool == true){
                    return;
                }
                switch(reaction.emoji.name){
                    case '📪':
                        if(bool === true) return;
                        bool = true;
                        embed.delete();
                        if(langue === 'fr'){
                            message.channel.send(
                                new Discord.MessageEmbed()
                                    .setTitle("Menu Aide")
                                    .setColor('DARK_GREEN')
                                    .setDescription("Je vous ai envoyé le menu d'aide en messages privés.")
                            );
                            message.author.send(
                                new Discord.MessageEmbed()
                                    .setTitle('Menu Aide => Modération')
                                    .setColor('RED')
                                    .setDescription(`**Voici la liste des commandes disponnible aux modérateurs :**\n\n\`\`${prefix}ban\`\`: Permet de bannir une personne définitivement du serveur.\n\`\`${prefix}tempban\`\`: Permet de bannir ue personne du serveur **temporairement**. Il lui faudra une invitation pour rejoindre le serveur de nouveau.\n\`\`${prefix}unban\`\`: Permet de débannir une personne du serveur. Si elle n'est pas bannie, rien ne se passera.\n\`\`${prefix}kick\`\`: Permet d'exclure une personne du serveur. Pour rejoindre de nouveau, il lui faudra une invitation.\n\`\`${prefix}mute\`\`: Permet de rendre une personne muette sur le serveur  vie. *(En développement)*\n\`\`${prefix}say\`\`: Permet d'evnoyer un message sous la forme du bot. Vôtre message sera remplacé par celui du bot exactement pareil.\n\n\`\`${prefix}config\`\`: Cette commande permet de configuer le bot pour vôtre serveur. **ATTENTION** : \`\`ELLE N'EST ACCESSIBLE QUE AUX PERSONNES AVEC LES PERMISSIONS ADMINISTRATEUR.\`\`.`)
                            )
                            message.author.send(
                                new Discord.MessageEmbed()
                                    .setTitle('Menu Aide => Utile')
                                    .setColor('YELLOW')
                                    .setDescription(`**Voici la liste des commandes utiles aux utilisateurs :**\n\n\`\`${prefix}userinfo\`\`: Permet d'avoir des informations sur l'utilisateur mentionné ou sur sois même.\n\`\`${prefix}serverinfo\`\`: Permet d'avoir des informations sur le serveur où a été effectuée la commande.\n\`\`${prefix}avatar\`\`: Permet d'avoir son propre avatar où celui de l'utilisateur mentionné.\n\`\`${prefix}idee\`\`: Permet d'envoyer une idée de commande au créateur du bot.\n\`\`${prefix}help\`\`: Permet d'afficher ce message d'aide avec la liste de toutes les commandes.`)
                            )
                        }
                    case '📝':
                        if(bool === true) return;
                        bool = true;
                        embed.delete();
                        if(langue === 'fr'){
                            message.channel.send(
                                new Discord.MessageEmbed()
                                    .setTitle('Menu Aide => Modération')
                                    .setColor('RED')
                                    .setDescription(`**Voici la liste des commandes disponnible aux modérateurs :**\n\n\`\`${prefix}ban\`\`: Permet de bannir une personne définitivement du serveur.\n\`\`${prefix}tempban\`\`: Permet de bannir ue personne du serveur **temporairement**. Il lui faudra une invitation pour rejoindre le serveur de nouveau.\n\`\`${prefix}unban\`\`: Permet de débannir une personne du serveur. Si elle n'est pas bannie, rien ne se passera.\n\`\`${prefix}kick\`\`: Permet d'exclure une personne du serveur. Pour rejoindre de nouveau, il lui faudra une invitation.\n\`\`${prefix}mute\`\`: Permet de rendre une personne muette sur le serveur  vie. *(En développement)*\n\`\`${prefix}say\`\`: Permet d'evnoyer un message sous la forme du bot. Vôtre message sera remplacé par celui du bot exactement pareil.\n\n\`\`${prefix}config\`\`: Cette commande permet de configuer le bot pour vôtre serveur. **ATTENTION** : \`\`ELLE N'EST ACCESSIBLE QUE AUX PERSONNES AVEC LES PERMISSIONS ADMINISTRATEUR.\`\`.`)
                            )
                            message.channel.send(
                                new Discord.MessageEmbed()
                                    .setTitle('Menu Aide => Utile')
                                    .setColor('YELLOW')
                                    .setDescription(`**Voici la liste des commandes utiles aux utilisateurs :**\n\n\`\`${prefix}userinfo\`\`: Permet d'avoir des informations sur l'utilisateur mentionné ou sur sois même.\n\`\`${prefix}serverinfo\`\`: Permet d'avoir des informations sur le serveur où a été effectuée la commande.\n\`\`${prefix}avatar\`\`: Permet d'avoir son propre avatar où celui de l'utilisateur mentionné.\n\`\`${prefix}idee\`\`: Permet d'envoyer une idée de commande au créateur du bot.\n\`\`${prefix}help\`\`: Permet d'afficher ce message d'aide avec la liste de toutes les commandes.`)
                            )
                        }
                }
    
            }
        })

    } else if(langue === 'en'){
        const embed = await message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Help System')
                .setColor('ORANGE')
                .setDescription('Please check the reactions based on the code below :\n\n> 📪: ``Get help in dm\'s``,\n> 📝: ``Get help here``')
        )
        await embed.react('📪');
        await embed.react('📝');

        const filter = (reaction, user) => {
            return ['📪', '📝'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
    
        let bool = false;
        let prefixes = require(path.resolve(path.join('..', 'suwo/database/prefixes.json')));
        let prefix = prefixes[message.guild.id].prefixes;
        
        client.on('messageReactionAdd', (reaction, user) => {
            if (reaction.emoji.name === '📪' || reaction.emoji.name === '📝' && user.id === message.author.id && user.id != client.user.id) {
    
                if(bool == true){
                    return;
                }
                switch(reaction.emoji.name){
                    case '📪':
                        if(bool === true) return;
                        bool = true;
                        embed.delete();
                        if(langue === 'en'){
                            message.channel.send(
                                new Discord.MessageEmbed()
                                    .setTitle("Help System")
                                    .setColor('DARK_GREEN')
                                    .setDescription("I sent you the help menu in your dms.")
                            );
                            message.author.send(
                                new Discord.MessageEmbed()
                                    .setTitle('Help System => Mods')
                                    .setColor('RED')
                                    .setDescription(`**Here is the mod commands :**\n\n\`\`${prefix}ban\`\`: To ban someone from the guild.\n\`\`${prefix}tempban\`\`: To temporary ban someone from the guild.\n\`\`${prefix}unban\`\`: To unban someone from the guild. \n\`\`${prefix}kick\`\`: To kick someone from the guild.\n\`\`${prefix}mute\`\`: To mute a user in the guild. *(I'm still developping it)*\n\`\`${prefix}say\`\`: To make the bot send a message.\n\n\`\`${prefix}config\`\`: To configure the bot. **WARNING** : \`\`You need **ADMINISTRATOR** permissions to use this command\`\`.`)
                            )
                            message.author.send(
                                new Discord.MessageEmbed()
                                    .setTitle('Help System => Utils')
                                    .setColor('YELLOW')
                                    .setDescription(`**Now the utils commands :**\n\n\`\`${prefix}userinfo\`\`: To have informations about a user.\n\`\`${prefix}serverinfo\`\`: To have informations about the guild.\n\`\`${prefix}avatar\`\`: To have someone's avatar.\n\`\`${prefix}idee\`\`: To send an idea to the bot creator.\n\`\`${prefix}help\`\`: To send this message.`)
                            )
                        }
                    case '📝':
                        if(bool === true) return;
                        bool = true;
                        embed.delete();
                        if(langue === 'en'){
                            message.channel.send(
                                new Discord.MessageEmbed()
                                    .setTitle('Help System => Mods')
                                    .setColor('RED')
                                    .setDescription(`**Here is the mod commands :**\n\n\`\`${prefix}ban\`\`: To ban someone from the guild.\n\`\`${prefix}tempban\`\`: To temporary ban someone from the guild.\n\`\`${prefix}unban\`\`: To unban someone from the guild. \n\`\`${prefix}kick\`\`: To kick someone from the guild.\n\`\`${prefix}mute\`\`: To mute a user in the guild. *(I'm still developping it)*\n\`\`${prefix}say\`\`: To make the bot send a message.\n\n\`\`${prefix}config\`\`: To configure the bot. **WARNING** : \`\`You need **ADMINISTRATOR** permissions to use this command\`\`.`)
                            )
                            message.channel.send(
                                new Discord.MessageEmbed()
                                    .setTitle('Help System => Utils')
                                    .setColor('YELLOW')
                                    .setDescription(`**Now the utils commands :**\n\n\`\`${prefix}userinfo\`\`: To have informations about a user.\n\`\`${prefix}serverinfo\`\`: To have informations about the guild.\n\`\`${prefix}avatar\`\`: To have someone's avatar.\n\`\`${prefix}idee\`\`: To send an idea to the bot creator.\n\`\`${prefix}help\`\`: To send this message.`)
                            )
                        }
                }
    
            }
        })

    }

}
module.exports.help = {
    name: "help"
}