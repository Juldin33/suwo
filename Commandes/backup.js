const Discord = require("discord.js");
const path = require('path');
const backup = require("discord-backup");
 
module.exports.run = async (bot, message, args) => {

    if(args[0] === "create"){
        if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('ERREUR')
                    .setColor('RED')
                    .setDescription('Vous devez avoir la permission `ADMINISTRATOR` pour faire cette commande.')
                    .setTimestamp()
            );
        }
        backup.create(message.guild, {
            jsonBeautify: true
        }).then((backupData) => {
            message.author.send(
                new Discord.MessageEmbed()
                    .setTitle('BACKUP')
                    .setColor('GREEN')
                    .setDescription("Vôtre backup à bien été créée.")
                    .addField('Nom du serveur', message.guild.name)
                    .addField('Id de backup', backupData.id)
                    .setTimestamp()
            );
            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('BACKUP')
                    .setColor('GREEN')
                    .setDescription('Vôtre backup à bien été créée. Je viens de vous envoyer l\'identifiant de sauvegarde en mp.')
                    .setTimestamp()
            );
        });
    }

    if(args[0] === "list"){
        backup.list().then((backups) => {
            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('Liste des backups')
                    .setColor('YELLOW')
                    .setDescription(`__Liste de vos backups__ : \n\n${backups.join(',\n')}`)
                    .setTimestamp()
            )
        });
    }

    if(args[0] === "load"){
        if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('ERREUR')
                    .setColor('RED')
                    .setDescription('Vous devez avoir la permission `ADMINISTRATOR` pour faire cette commande.')
                    .setTimestamp()
            );
        }
        let backupID = args[1];
        if(!backupID){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('ERREUR')
                    .setColor('RED')
                    .setDescription('L\'ID de backup `' + backupID +'` est invalide.')
                    .setTimestamp()
            );
        }
        backup.fetch(backupID).then(async () => {
            let error = false;
            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('ATTENTION')
                    .setColor('ORANGE')
                    .setDescription("Lors du chargement d'une backup, vous n'avez plus aucun droits. Faites `s!confirm` pour confirmer.")
                    .setTimestamp()
            );
                await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "s!confirm"), {
                    max: 1,
                    time: 20000,
                    errors: ["time"]
                }).catch((err) => {
                    error = true;
                    message.channel.send(
                        new Discord.MessageEmbed()
                        .setTitle('ERREUR')
                        .setColor('RED')
                        .setDescription("Vous n'avez pas confirmer le chargement. Il a donc été annulé.")
                        .setTimestamp()
                    );
                    return;
                });
                if(error === true) return;
                message.author.send(
                    new Discord.MessageEmbed()
                        .setTitle('BACKUP')
                        .setColor('GREEN')
                        .setDescription('Le chargement de la backup `' + backupID + '` à commencé !')
                        .setTimestamp()
                );
                backup.load(backupID, message.guild).then(() => {
                    backup.remove(backupID);
                }).catch((err) => {
                    return message.author.send(
                        new Discord.MessageEmbed()
                            .setTitle('ERREUR')
                            .setColor('RED')
                            .setDescription("Veuillez vérifier que j'ai la permission `ADMINISTRATOR` et réessayé.")
                            .setTimestamp()
                    );
                });
        }).catch((err) => {
            console.log(err);
            return message.channel.send(":x: | Je n'ai pas trouvé de backup avec pour identifiant `"+backupID+"`!");
        });
    }
 
    if(args[0] === "infos"){
        let backupID = args[1];
        if(!backupID){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('ERREUR')
                    .setColor('RED')
                    .setDescription("Veuillez entrer un identifiant de backup.")
                    .setTimestamp()
            );
        }
        backup.fetch(backupID).then((backupInfos) => {
            const date = new Date(backupInfos.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
            const formatedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;
            let embed = new Discord.MessageEmbed()
                .setAuthor("Informations")
                .addField("Identifiant", backupInfos.id, true)
                .addField("Identifiant (serveur)", backupInfos.data.guildID, true)
                .addField("Taille", `${backupInfos.size} mb`, true)
                .addField("Date de création", formatedDate, true)
                .setColor("BLUE");
            message.channel.send(embed);
        }).catch((err) => {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('ERREUR')
                    .setColor('RED')
                    .setDescription('L\'ID de backup `' + backupID +'` est invalide.')
                    .setTimestamp()
            );
        });
    }
    
}
 
module.exports.help = {
    name: "backup"
}