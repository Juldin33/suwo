const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const path = require('path');

module.exports.run = async(client, message, args) => {

    let langues = require(path.resolve(path.join('..', 'suwo/database/langues.json')));
    let langue = langues[message.guild.id].langues;

    if(langue === 'fr'){
        message.channel.send(
            new Discord.MessageEmbed()
                .setColor("#12DFC5")
                .addField("Propriétaire :", message.guild.owner.user.tag, true)
                .addField("ID :", message.guild.id, true)
                .addField("Utilisateur(s) :", message.guild.memberCount, true)
                .addField("Bot(s) :", message.guild.members.cache.filter(mem => mem.user.bot === true).size, true)
                .addField("Hors ligne :", message.guild.members.cache.filter(mem => mem.presence.status === "offline").size, true)
                .addField("En ligne :", message.guild.members.cache.filter(mem => mem.presence.status === "online").size, true)
                .addField("Inactifs :", message.guild.members.cache.filter(mem => mem.presence.status === "idle").size, true)
                .addField("Ne pas déranger :", message.guild.members.cache.filter(mem => mem.presence.status === "dnd").size, true)
                .addField("Role(s) :", message.guild.roles.cache.size - 1, true)
                .addField("Niveau de vérification :", message.guild.verificationLevel) 
                .addField("Date de création :", moment.utc(message.guild.createdAt).format("dddd, MMMM Do, YYYY"), true)
                .addField(`Liste des rôles (${message.guild.roles.cache.size - 1})`, message.guild.roles.cache.map(roles => roles).join(" ").replace("@everyone", " "))
        );
    } else if(langue === 'en'){
        message.channel.send(
            new Discord.MessageEmbed()
                .setColor("#12DFC5")
                .addField("Owner :", message.guild.owner.user.tag, true)
                .addField("ID :", message.guild.id, true)
                .addField("Users :", message.guild.memberCount, true)
                .addField("Bots :", message.guild.members.cache.filter(mem => mem.user.bot === true).size, true)
                .addField("Offline :", message.guild.members.cache.filter(mem => mem.presence.status === "offline").size, true)
                .addField("Online :", message.guild.members.cache.filter(mem => mem.presence.status === "online").size, true)
                .addField("Idle :", message.guild.members.cache.filter(mem => mem.presence.status === "idle").size, true)
                .addField("DND :", message.guild.members.cache.filter(mem => mem.presence.status === "dnd").size, true)
                .addField("Role(s) :", message.guild.roles.cache.size - 1, true)
                .addField("Verification level :", message.guild.verificationLevel) 
                .addField("Creation date :", moment.utc(message.guild.createdAt).format("YYYY, MMMM Do, dddd"), true)
                .addField(`Roles list (${message.guild.roles.cache.size - 1})`, message.guild.roles.cache.map(roles => roles).join(" ").replace("@everyone", " "))
        );
    }
}

module.exports.help = {
    name: "serverinfo"
}