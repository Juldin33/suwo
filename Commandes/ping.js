const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    let msg = await message.channel.send('〽️ Vérification de la latence du bot...')

    msg.edit(
        new Discord.MessageEmbed()
            .setTitle('__PING__')
            .setColor('GREEN')
            .addField('Latence CLIENT', Math.round(client.ws.ping) + 'ms') // Ici, ça envoie la latence du client.
            .addField('En ligne depuis', msToTime(client.uptime)) // Ici, ça vas envoyer depuis quand le bot est en ligne.
    )

    function msToTime(ms){
        days = Math.floor(ms / 86400000); // 24*60*60*1000
        daysms = ms % 86400000; // 24*60*60*1000
        hours = Math.floor(daysms / 3600000); // 60*60*1000
        hoursms = ms % 3600000; // 60*60*1000
        minutes = Math.floor(hoursms / 60000); // 60*1000
        minutesms = ms % 60000; // 60*1000
        sec = Math.floor(minutesms / 1000);
      
        let str = "";
        if (days) str = str + days + "d";
        if (hours) str = str + hours + "h";
        if (minutes) str = str + minutes + "m";
        if (sec) str = str + sec + "s";
      
        return str;
    } // Ici, c'est une fonction pour convertir les milisecondes en h, m, d etc...
}

module.exports.help = {
    name: 'ping', // Nom de la commande, nécessaire pour que ça marche
    description: `Envoie la latence du bot.` // Déscription de la commande.
}