const Discord = module.require('discord.js');
const moment = require('moment');

module.exports.run = async (bot, message, args) => {

    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else {
        user = message.author;
    }

    const member = message.guild.member(user);

    message.channel.send(
        new Discord.MessageEmbed()
            .setColor("#2919D2")
            .setThumbnail(message.author.avatarURL)
            .addField(`${user.tag}`, `${user}`, true)
            .addField("ID :", `${user.id}`, true)
            .addField("Surnom :", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
            .addField("Status :", `${user.presence.status}`, true)
            .addField("Sur le serveur :", message.guild.name, true)
            .addField("Jeux :", `${user.presence.activities ? user.presence.activities : 'None'}`, true)
            .addField("Bot :", `${user.bot}`, true)
            .addField("Rejoins le serveur le :", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
            .addField("Compte créé :", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 
            .addField("Roles:", member.roles.cache.map(roles => `${roles}`).join(', '), true)
            .setFooter(`Demande de ${message.author.username}#${message.author.discriminator}`)
    );
}

module.exports.help = {
    name: 'userinfo'
}