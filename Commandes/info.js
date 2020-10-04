const Discord = module.require('discord.js');
const moment = require('moment');
const path = require('path');
var os = require('os');

module.exports.run = async(client, message, args) => {
    
    var usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();

    var  getpercentage = ((usedMemory/totalMemory) * 100).toFixed(2) + '%'

    usedMemory = (usedMemory/ Math.pow(1024, 3)).toFixed(2);
    totalMemory = (totalMemory/ Math.pow(1024, 3)).toFixed(2);
    

    let langues = require(path.resolve(path.join('..', 'suwo/database/langues.json')));
    let langue = langues[message.guild.id].langues;

    if(langue === 'fr'){
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle("Informations")
                .setDescription(`Voici les informations correspondant <@${client.user.id}>.
                
                ⚙️ **__Informations Système__:**
                
                > 💽 **Os:** Linux
                > 💿 **RAM Totale:** ${totalMemory} GB
                > 🗑️ **RAM Utilisée:** ${usedMemory} GB *(${getpercentage})*

                🤖 **__Informations sur le bot__:**

                > 👑 **Créateur:** <@661525561394462730>
                > 🏙️ **Serveurs:** ${client.guilds.cache.size}
                > 👤 **Utilisateurs:** ${client.users.cache.size}

                🔗 **__Liens__:**
                
                > \🔗 **Invitation:** [Clique ici](https://discord.com/oauth2/authorize?client_id=729365843888046150&permissions=8&scope=bot)
                > \💡 **Serveur support:** [Clique pour rejoindre](https://discord.gg/TnqWGGu)
                > <:github:753997514612539422> **Github:** [Mon github](https://github.com/refreesh/suwo)`)
        );
    } else if(langue === 'en'){
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle("Informations")
                .setDescription(`Here is all the <@${client.user.id}>'s informations.
                
                ⚙️ **__System Informations__:**
                
                > \💽 **Os:** Linux
                > \💿 **Total RAM:** ${totalMemory} GB
                > \🗑️ **Used RAM:** ${usedMemory} GB *(${getpercentage})*

                🤖 **__Bot informations__:**

                > 👑 **Creator:** <@661525561394462730>
                > 🏙️ **Guilds:** ${client.guilds.cache.size}
                > 👤 **Users:** ${client.users.cache.size}
                
                🔗 **__Links__:**
                
                > \🔗 **Invite:** [Click here](https://discord.com/oauth2/authorize?client_id=729365843888046150&permissions=8&scope=bot)
                > \💡 **Support Server:** [Click to join](https://discord.gg/TnqWGGu)
                > <:github:753997514612539422> **Github:** [My github repository](https://github.com/refreesh/suwo)`)
        );
    }
}

module.exports.help = {
    name: 'info'
}