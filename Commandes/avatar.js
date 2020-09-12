const Discord = require("discord.js");
const path = require('path');
 
module.exports.run = async (bot, message, args) => {

    let langues = require(path.resolve(path.join('..', 'suwo/database/langues.json')));
    let langue = langues[message.guild.id].langues;

    if(langue === 'fr'){
        let waiting = await message.channel.send("j'attend de recevoir l'image.").catch(console.error);
 
        let mentionedUser = message.mentions.users.first() || message.author;
        
    
        waiting.delete();
        message.channel.send(
            new Discord.MessageEmbed()
                .setImage(mentionedUser.displayAvatarURL())
                .setTitle("Avatar")
                .setFooter("Demandé par " + message.author.tag)
                .setDescription("[Lien de l'avatar](" + mentionedUser.displayAvatarURL() + ")")
        );
    } else if(langue === 'en'){
        let waiting = await message.channel.send("I'm waiting for the avatar.").catch(console.error);
 
        let mentionedUser = message.mentions.users.first() || message.author;
        
    
        waiting.delete();
        message.channel.send(
            new Discord.MessageEmbed()
                .setImage(mentionedUser.displayAvatarURL())
                .setTitle("Avatar")
                .setFooter("Asked by " + message.author.tag)
                .setDescription("[Avatar's link](" + mentionedUser.displayAvatarURL() + ")")
        );
    }
    
}
 
module.exports.help = {
    name: "avatar"
}