const Discord = require('discord.js');
const path = require('path');
const fs = require('fs')
const Canvas = require('canvas');

module.exports.run = async (bot, message, args) => {

    let langues = require(path.resolve(path.join('..', 'suwo/database/langues.json')));
    let langue = langues[message.guild.id].langues;

    if(langue === 'fr'){
        const joins = require(path.resolve(path.join('..', 'suwo/database/join.json')));
        const joinsImg = require(path.resolve(path.join('..', 'suwo/database/joinImg.json')));
        const joinsMsg = require(path.resolve(path.join('..', 'suwo/database/joinMsg.json')));
        const joinsChannel = require(path.resolve(path.join('..', 'suwo/database/joinChannel.json')));
    
        const join = joins[message.guild.id].joins;
        const joinImg = joinsImg[message.guild.id].joinsImg;
        const joinMsg = joinsMsg[message.guild.id].joinsMsg;
        const joinChannel = joinsChannel[message.guild.id].joinsChannel;
        if(join === 'false'){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__ERREUR__')
                    .setColor('RED')
                    .setDescription(`Vous n'avez pas défini le statut du message de join. Je ne peut donc pas envoyer le message.\n\n__Commande__ : \`<prefix>config join <true/false>\``)
                    .setTimestamp()
            )
          }
      
          if(joinChannel === 'Non défini'){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__ERREUR__')
                    .setColor('RED')
                    .setDescription(`Vous n'avez pas défini le salon de join. Je ne peut donc pas envoyer le message.\n\n__Commande__ : \`<prefix>config joinchannel <mentionDuSalon>\``)
                    .setTimestamp()
            )
          }
      
          if(joinImg === 'false'){
            const ch = message.author.guild.channels.cache.find(c => c.id === joinChannel)
            ch.send(joinMsg.replace('{user.mention}', message.author.mention).replace('{server}', message.author.guild.name).replace('{user}', message.author.displayName));
          } else {
            const canvas = Canvas.createCanvas(700, 250);
            const ctx = canvas.getContext('2d');
          
            const background = await Canvas.loadImage('wallpaper.jpg');
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
          
            ctx.strokeStyle = '#74037b';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
          
            ctx.font = '28px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${message.author.username}`, canvas.width / 2.9, canvas.height / 2.2);
          
            ctx.font = '28px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${message.author.discriminator}`, canvas.width / 2.6, canvas.height / 1.6);
          
            ctx.font = '24px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`Bienvenue sur ${message.guild.name}`, canvas.width / 3.0, canvas.height / 1.15);
          
            ctx.beginPath();
            ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
          
            const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png'}));
            ctx.drawImage(avatar, 25, 25, 200, 200);
          
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
            
            const buffer = canvas.toBuffer('image/png')
            fs.writeFileSync('./image.png', buffer)
      
            
            const ch = message.guild.channels.cache.find(c => c.id === joinChannel)
            ch.send({files: ["./image.png"]})
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__SUCCÈS__')
                    .setColor('GREEN')
                    .setDescription(`Le message a bien été envoyé dans <#${ch.id}>`)
                    .setTimestamp()
            )
          }
    } else if(langue === 'en'){
        
    }
    
}
 
module.exports.help = {
    name: "testjoin"
}