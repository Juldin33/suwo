const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');
const get = require("get");
const Canvas = require("canvas");
const path = require('path');

fs.readdir('./Commandes/', (error, f) => {
    if (error) { return console.error(error); }
        const commandes = f.filter(f => f.split('.').pop() === 'js');
        if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

        commandes.forEach((f) => {
            const commande = require(`./Commandes/${f}`);
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
        });
});

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
        console.log(`${f.length} events chargés`);

        f.forEach((f) => {
            const events = require(`./Events/${f}`);
            const event = f.split('.')[0];
            client.on(event, events.bind(null, client));
        });
});

client.on('guildCreate', guild => {
    client.users.cache.get("661525561394462730").send("J'ai été ajouté à un serveur !");
});

const activities_list = [
    `Huummm...`,
    `s!help | By Cancelled__`
  ];
  
  client.on("ready", () => {
    setInterval(() => {
      const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
      client.user.setActivity(activities_list[index], {
        status: "online",
        type: "STREAMING",
        url: "https://twitch.tv/dubrin"
      });
    }, 2000);
    console.log(
      `${client.user.username} connecté ${client.users.cache.size} utilisateurs !`
    );

    let guild = client.guilds.cache.find(g => g.id === '755087764382548168')
    setInterval(() => {
      guild.setName(`Discord.js - BOTMAKER`)
      console.log(`Nom changé:` + guild.name)
      setTimeout(() => {
        guild.setName(`FREE - BotMaker`)
        console.log(`Nom changé:` + guild.name)
        setTimeout(() => {
          guild.setName(`BotMakers - Only FREE`)
          console.log(`Nom changé:` + guild.name)
        }, 1200000)
      }, 1200000)
    }, 3600000)

  });

  const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');
  
    const fontSize = 70;
  
    do {
      ctx.font = `${fontSize -= 10}px Roboto`;
    } while (ctx.measureText(text).width > canvas.width - 300);
  
    return ctx.font;
  };
  
  client.on('guildMemberAdd', async member => {

    const joins = require(path.resolve(path.join('..', 'suwo/database/join.json')));
    const joinsImg = require(path.resolve(path.join('..', 'suwo/database/joinImg.json')));
    const joinsMsg = require(path.resolve(path.join('..', 'suwo/database/joinMsg.json')));
    const joinsRoleId = require(path.resolve(path.join('..', 'suwo/database/joinRoleId.json')));
    const joinsChannel = require(path.resolve(path.join('..', 'suwo/database/joinChannel.json')));
    const counts = require(path.resolve(path.join('..', 'suwo/database/membersCount.json')));
    const channelCountMemberJoin = require(path.resolve(path.join('..', 'suwo/database/channelCountMemberJoin.json')));
    const customChannelCountNames = require(path.resolve(path.join('..', 'suwo/database/customChannelCountNames.json')));

    const join = joins[member.guild.id].joins;
    const joinImg = joinsImg[member.guild.id].joinsImg;
    const joinMsg = joinsMsg[member.guild.id].joinsMsg;
    const joinRoleId = joinsRoleId[member.guild.id].joinsRoleId;
    const joinChannel = joinsChannel[member.guild.id].joinsChannel;
    const count = counts[member.guild.id].counts;
    const countChannel = channelCountMemberJoin[member.guild.id].channelCountMemberJoin;
    const customChannelCountName = customChannelCountNames[member.guild.id].customChannelCountNames;


    if(count){
      if(countChannel != 'Non défini'){
        let c = member.guild.channels.cache.find(ch => ch.id === countChannel)
        if(!c) {
          c = await member.guild.channels.create(customChannelCountName.replace('{count}', member.guild.memberCount), {
            type: 'voice'
          });
          channelCountMemberJoin[member.guild.id] = {
            channelCountMemberJoin: c.id
          }
           
          fs.writeFile(path.resolve(path.join('..', 'suwo/database/channelCountMemberJoin.json')), JSON.stringify(channelCountMemberJoin, null, 2), (err) => {
            if(err) console.log(err)
          });
        } else {
          c.setName(customChannelCountName.replace('{count}', member.guild.memberCount))
        }
      } else{
        const c = await member.guild.channels.create(customChannelCountName.replace('{count}', member.guild.memberCount), {
          type: 'voice'
        });

        channelCountMemberJoin[member.guild.id] = {
          channelCountMemberJoin: c.id
        }
         
        fs.writeFile(path.resolve(path.join('..', 'suwo/database/channelCountMemberJoin.json')), JSON.stringify(channelCountMemberJoin, null, 2), (err) => {
          if(err) console.log(err)
        });

      }
    }

    if(join === 'false'){
      return;
    }

    if(joinChannel === 'Non défini'){
      return;
    }

    if(joinRoleId != 'Non défini'){
      const r = member.guild.roles.cache.find(role => role.id === joinRoleId);
      member.roles.add(r.id)
    }

    if(joinImg === 'false'){
      const ch = member.guild.channels.cache.find(c => c.id === joinChannel)
      ch.send(joinMsg.replace('{user.mention}', member.mention).replace('{server}', member.guild.name).replace('{user}', member.displayName));
    } else {
      const canvas = Canvas.createCanvas(700, 250);
      const ctx = canvas.getContext('2d');
    
      const background = await Canvas.loadImage('wallpaper.jpg');
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
      ctx.strokeStyle = '#74037b';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
      ctx.font = '28px Roboto';
      ctx.fillStyle = '#353535';
      ctx.fillText(`${member.displayName}`, canvas.width / 2.9, canvas.height / 2.2);
    
      ctx.font = '28px Roboto';
      ctx.fillStyle = '#353535';
      ctx.fillText(`${member.user.discriminator}`, canvas.width / 2.6, canvas.height / 1.6);
    
      ctx.font = '24px Roboto';
      ctx.fillStyle = '#353535';
      ctx.fillText(`Bienvenue sur ${member.guild.name}`, canvas.width / 3.0, canvas.height / 1.15);
    
      ctx.beginPath();
      ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
    
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png'}));
      ctx.drawImage(avatar, 25, 25, 200, 200);
    
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
      
      const buffer = canvas.toBuffer('image/png')
      fs.writeFileSync('./image.png', buffer)

      
      const ch = member.guild.channels.cache.find(c => c.id === joinChannel)
      ch.send({files: ["./image.png"]})
    }

  });

  client.on('guildMemberRemove', async member => {
    
    const counts = require(path.resolve(path.join('..', 'suwo/database/membersCount.json')));
    const channelCountMemberJoin = require(path.resolve(path.join('..', 'suwo/database/channelCountMemberJoin.json')));
    const customChannelCountNames = require(path.resolve(path.join('..', 'suwo/database/customChannelCountNames.json')));

    const count = counts[member.guild.id].counts;
    const countChannel = channelCountMemberJoin[member.guild.id].channelCountMemberJoin;
    const customChannelCountName = customChannelCountNames[member.guild.id].customChannelCountNames;
    
    if(count){
      if(countChannel != 'Non défini'){
        let c = member.guild.channels.cache.find(ch => ch.id === countChannel)
        if(!c) {
          c = await member.guild.channels.create(customChannelCountName.replace('{count}', member.guild.memberCount), {
            type: 'voice'
          });
          channelCountMemberJoin[member.guild.id] = {
            channelCountMemberJoin: c.id
          }
           
          fs.writeFile(path.resolve(path.join('..', 'suwo/database/channelCountMemberJoin.json')), JSON.stringify(channelCountMemberJoin, null, 2), (err) => {
            if(err) console.log(err)
          });
        } else {
          c.setName(customChannelCountName.replace('{count}', member.guild.memberCount))
        }
      }
    }
  })

client.on('message', message => {

  if(message.channel.type === "dm") return;

  const prefixes = require(path.resolve(path.join('..', 'suwo/database/prefixes.json')));
  const joins = require(path.resolve(path.join('..', 'suwo/database/join.json')));
  const joinsImg = require(path.resolve(path.join('..', 'suwo/database/joinImg.json')));
  const joinsMsg = require(path.resolve(path.join('..', 'suwo/database/joinMsg.json')));
  const joinsRoleId = require(path.resolve(path.join('..', 'suwo/database/joinRoleId.json')));
  const joinsChannel = require(path.resolve(path.join('..', 'suwo/database/joinChannel.json')));
  const counts = require(path.resolve(path.join('..', 'suwo/database/membersCount.json')));
  const channelCountMemberJoin = require(path.resolve(path.join('..', 'suwo/database/channelCountMemberJoin.json')));
  const customChannelCountNames = require(path.resolve(path.join('..', 'suwo/database/customChannelCountNames.json')));
  const langues = require(path.resolve(path.join('..', 'suwo/database/langues.json')));

  if(!counts[message.guild.id]){
    counts[message.guild.id] = {
      counts: 'false'
    }
  }
  
  if(!langues[message.guild.id]){
    langues[message.guild.id] = {
      langues: 'en'
    }
  }

  if(!channelCountMemberJoin[message.guild.id]){
    channelCountMemberJoin[message.guild.id] = {
      channelCountMemberJoin: 'Non défini'
    }
  }

  if(!customChannelCountNames[message.guild.id]){
    customChannelCountNames[message.guild.id] = {
      customChannelCountNames: 'Utilisateurs : {count}'
    }
  }

  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: 's!'
    }
  }

  if(!joins[message.guild.id]){
    joins[message.guild.id] = {
      joins: 'false'
    }
  }

  if(!joinsImg[message.guild.id]){
    joinsImg[message.guild.id] = {
      joinsImg: 'false'
    }
  }

  if(!joinsMsg[message.guild.id]){
    joinsMsg[message.guild.id] = {
      joinsMsg: '**Bienvenue {user.mention} sur le serveur.**'
    }
  }

  if(!joinsRoleId[message.guild.id]){
    joinsRoleId[message.guild.id] = {
      joinsRoleId: 'Non défini'
    }
  }

  if(!joinsChannel[message.guild.id]){
    joinsChannel[message.guild.id] = {
      joinsChannel: 'Non défini'
    }
  }

  fs.writeFile(path.resolve(path.join('..', 'suwo/database/membersCount.json')), JSON.stringify(counts, null, 2), (err) => {
    if(err) console.log(err)
  });
  fs.writeFile(path.resolve(path.join('..', 'suwo/database/channelCountMemberJoin.json')), JSON.stringify(channelCountMemberJoin, null, 2), (err) => {
    if(err) console.log(err)
  });
  fs.writeFile(path.resolve(path.join('..', 'suwo/database/customChannelCountNames.json')), JSON.stringify(customChannelCountNames, null, 2), (err) => {
    if(err) console.log(err)
  });
  fs.writeFile(path.resolve(path.join('..', 'suwo/database/prefixes.json')), JSON.stringify(prefixes, null, 2), (err) => {
    if(err) console.log(err)
  });
  fs.writeFile(path.resolve(path.join('..', 'suwo/database/join.json')), JSON.stringify(joins, null, 2), (err) => {
    if(err) console.log(err)
  });
  fs.writeFile(path.resolve(path.join('..', 'suwo/database/joinImg.json')), JSON.stringify(joinsImg, null, 2), (err) => {
    if(err) console.log(err)
  });
  fs.writeFile(path.resolve(path.join('..', 'suwo/database/joinMsg.json')), JSON.stringify(joinsMsg, null, 2), (err) => {
    if(err) console.log(err)
  });
  fs.writeFile(path.resolve(path.join('..', 'suwo/database/joinRoleId.json')), JSON.stringify(joinsRoleId, null, 2), (err) => {
    if(err) console.log(err)
  });
  fs.writeFile(path.resolve(path.join('..', 'suwo/database/joinChannel.json')), JSON.stringify(joinsChannel, null, 2), (err) => {
    if(err) console.log(err)
  });
  fs.writeFile(path.resolve(path.join('..', 'suwo/database/langues.json')), JSON.stringify(langues, null, 2), (err) => {
    if(err) console.log(err)
  });

})

const xpfile = require(path.resolve(path.join('..', 'suwo/database/xp.json')));


client.on("message" ,function(message) {
  if(message.author.bot) return;
  var addXP = Math.floor(Math.random() * 10); //when i type addXP it will randomly choose a number between 1-10   [  Math.floor(Math.random() * 10)  ]
// lvl 1 statics
  if(!xpfile[message.guild.id]){
    xpfile[message.guild.id] = {

    }
    fs.writeFile(path.resolve(path.join('..', 'suwo/database/warns.json')), JSON.stringify(xpfile, null, 2), (err) => {
        if(err) console.log(err)
    });
  }
  if(!xpfile[message.guild.id][message.author.id]) {
      xpfile[message.guild.id][message.author.id] = {
         xp: 0,
         level: 1,
         reqxp: 100
      }
// catch errors
    fs.writeFile(path.resolve(path.join('..', 'suwo/database/xp.json')), JSON.stringify(xpfile, null, 2), (err) => {
      if(err) console.log(err)
    });
  }

  xpfile[message.guild.id][message.author.id].xp += addXP

  if(xpfile[message.guild.id][message.author.id].xp > xpfile[message.guild.id][message.author.id].reqxp){
      xpfile[message.guild.id][message.author.id].xp -= xpfile[message.guild.id][message.author.id].reqxp // it will subtrsct xp whenever u pass a lvl
      xpfile[message.guild.id][message.author.id].reqxp *= 2 // XP you need to increase if level 1 is 100 xp so lvl 2 will 200 xp (multiplied by 2 [   .reqxp *= 2  ])
      xpfile[message.guild.id][message.author.id].reqxp = Math.floor(xpfile[message.guild.id][message.author.id].reqxp) // XP Round
      xpfile[message.guild.id][message.author.id].level += 1 // it add 1 level when u level up
      
      message.reply("vous ètes désormais niveau **"+xpfile[message.guild.id][message.author.id].level+"** !").then( 
          msg=>msg.delete({timeout: "10000"})
      )

  }
  fs.writeFile(path.resolve(path.join('..', 'suwo/database/xp.json')), JSON.stringify(xpfile, null, 2), (err) => {
    if(err) console.log(err)
  });
})



client.login("BOT TOKEN")
