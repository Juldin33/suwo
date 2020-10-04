const Discord = require("discord.js");
const usersIdea = new Map();
const path = require('path');

module.exports.run = async(client, message, args) => {

    let langues = require(path.resolve(path.join('..', 'suwo/database/langues.json')));
    let langue = langues[message.guild.id].langues;

    if(langue === 'fr'){
        const Discord = require('discord.js');
        const messages = require(path.resolve(path.join('..', 'suwo/database/langues.json')));

        var messagesArray = Object.entries(messages)
            .map(v => `${v[1].level} - ${v[1].xp}`)
            .sort((a, b) => b.split(" - ")[0] - a.split(" - ")[0])
            .slice(0, 10);

        const embed = new Discord.MessageEmbed()
            .setTitle('Leaderboard')
            .setDescription('Message Leaderboard')
            .setAuthor(message.member.displayName)
            .setColor('BLURPLE')
            .addField('Messages:', messagesArray)
            .setTimestamp()
            .setThumbnail(message.author.avatarURL())
            .setFooter('Sub to Ferotiq on YouTube!');

        message.delete();
        message.reply(embed);
    } else if(langue === 'en'){
        
    }

}
module.exports.help = {
    name: "leaderboard",
    aliases: ['lb', 'xplb', 'leader']
}