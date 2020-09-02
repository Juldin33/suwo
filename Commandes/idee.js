const Discord = require("discord.js");
const usersIdea = new Map();

module.exports.run = async(client, message, args) => {

    if(usersIdea.has(message.author.id)) {
        message.delete();
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Idée')
                .setColor('DARK_RED')
                .setDescription('Vous devez attendre une heure entre chaque proposition de commande.')
        )
        return;
    }

    if(args.length < 10) {
        message.delete();
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Idée')
                .setColor('DARK_RED')
                .setDescription('Veuillez donner des informations concernant vôtre commande. ``Commande, utilité, aliase, etc...``')
        )
    }
    let botmessage = args.join(" ")
    message.delete().catch();
    message.channel.send(
        new Discord.MessageEmbed()
            .setTitle('Idée')
            .setColor('DARK_GREEN')
            .setDescription('Vôtre idée à bien été envoyée au créateur du bot !')
    )
    client.users.cache.get('661525561394462730').send(
        new Discord.MessageEmbed()
            .setTitle('Nouvelle Idée')
            .setColor('DARK_GREEN')
            .setDescription(`Vous avez réçu une nouvelle idée de commande de la part de ${message.author.displayName}.`)
            .addField('Idée :', botmessage)
    )

    usersIdea.set(message.author.id, message.guild.id)

    setTimeout(function () {
        usersIdea.delete(message.author.id);
    }, 60000 * 60)

}
module.exports.help = {
    name: "idee"
}