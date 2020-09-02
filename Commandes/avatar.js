const Discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
    let waiting = await message.channel.send("j'attend de recevoir l'image.").catch(console.error);
 
    let mentionedUser = message.mentions.users.first() || message.author;
 
    waiting.delete();
    message.channel.send(
        new Discord.MessageEmbed()
            .setImage(mentionedUser.displayAvatarURL())
            .setColor("RANDOM")
            .setTitle("Avatar")
            .setFooter("Demandé par " + message.author.tag)
            .setDescription("[Lien de l'avatar](" + mentionedUser.displayAvatarURL() + ")")
    );
}
 
module.exports.help = {
    name: "avatar"
}