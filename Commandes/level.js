const Discord = require("discord.js");
const path = require('path');
const xpfile = require(path.resolve(path.join('..', 'suwo/database/xp.json')));
const canvacord = require('canvacord');

module.exports.run = async(client, message, args) => {

    let langues = require(path.resolve(path.join('..', 'suwo/database/langues.json')));
    let langue = langues[message.guild.id].langues;

    if(langue === 'fr'){
        let user = message.mentions.users.first() || message.author;
        let level = xpfile[message.guild.id][user.id].level;

        const rank = new canvacord.Rank()
            .setAvatar(user.displayAvatarURL({format : 'gif'}))
            .setCurrentXP(xpfile[message.guild.id][user.id].xp)
            .setRequiredXP(xpfile[message.guild.id][user.id].reqxp)
            .setStatus(user.presence.status)
            .setProgressBar("#bf5922", "COLOR")
            .setUsername(user.username)
            .setDiscriminator(user.discriminator)
            .setLevel(level);
 
        rank.build()
            .then(data => {
                const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                message.channel.send(attachment);
        });
        
    } else if(langue === 'en'){
        let user = message.mentions.users.first() || message.author;
        let level = xpfile[message.guild.id][user.id].level;

        const rank = new canvacord.Rank()
            .setAvatar(user.displayAvatarURL({format : 'gif'}))
            .setCurrentXP(xpfile[message.guild.id][user.id].xp)
            .setRequiredXP(xpfile[message.guild.id][user.id].reqxp)
            .setStatus(user.presence.status)
            .setProgressBar("#bf5922", "COLOR")
            .setUsername(user.username)
            .setDiscriminator(user.discriminator)
            .setLevel(level);
 
        rank.build()
            .then(data => {
                const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                message.channel.send(attachment);
        });
    }

}
module.exports.help = {
    name: "level"
}