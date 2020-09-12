const Discord = module.require('discord.js');
const moment = require('moment');
const path = require('path');

module.exports.run = async(client, message, args) => {

    let langues = require(path.resolve(path.join('..', 'suwo/database/langues.json')));
    let langue = langues[message.guild.id].langues;

    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else {
        user = message.author;
    }

    const member = message.guild.member(user);

    if(langue === 'fr'){
        message.channel.send(
            new Discord.MessageEmbed()
                .setColor("#2919D2")
                .setThumbnail(message.author.avatarURL)
                .addField(`${user.tag}`, `${user}`, true)
                .addField("ID :", `${user.id}`, true)
                .addField("Surnom :", `${member.nickname !== null ? `${member.nickname}` : 'Aucun'}`, true)
                .addField("Status :", `${user.presence.status}`, true)
                .addField("Sur le serveur :", message.guild.name, true)
                .addField("Jeux :", `${user.presence.activities ? user.presence.activities : 'Aucun'}`, true)
                .addField("Bot :", `${user.bot}`, true)
                .addField("Rejoins le serveur le :", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
                .addField("Compte créé :", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 
                .addField("Roles:", member.roles.cache.map(roles => `${roles}`).join(', '), true)
                .setFooter(`Demande de ${message.author.username}#${message.author.discriminator}`)
        );
    } else if(langue === 'en'){
        message.channel.send(
            new Discord.MessageEmbed()
                .setColor("#2919D2")
                .setThumbnail(message.author.avatarURL)
                .addField(`${user.tag}`, `${user}`, true)
                .addField("ID :", `${user.id}`, true)
                .addField("Nickname :", `${member.nickname !== null ? `${member.nickname}` : 'Not set'}`, true)
                .addField("Status :", `${user.presence.status}`, true)
                .addField("In :", message.guild.name, true)
                .addField("Game :", `${user.presence.activities ? user.presence.activities : 'Not set'}`, true)
                .addField("Bot :", `${user.bot}`, true)
                .addField("Join at :", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
                .addField("Creation date :", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 
                .addField("Roles:", member.roles.cache.map(roles => `${roles}`).join(', '), true)
                .setFooter(`Asked by ${message.author.username}#${message.author.discriminator}`)
        );
    }
}

module.exports.help = {
    name: 'userinfo'
}