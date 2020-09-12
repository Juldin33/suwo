const discord = require("discord.js");
const fs = require('fs');
const path = require('path');

module.exports.run = async(client, message, args, prefix) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Vous n'avez pas la permission de faire cette commande !**")

    if(!args[0]) return message.channel.send("**Veuillez spécifier des paramètres.**")

    
    let langues = require(path.resolve(path.join('..', 'suwo/database/langues.json')));
    let langue = langues[message.guild.id].langues;

    if(langue === 'fr'){
        if(args[0] === "prefix"){
            let prefixes = require(path.resolve(path.join('..', 'suwo/database/prefixes.json')));
            if(!args[1]){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Prefix')
                        .setDescription('Le prefix actuel est ``' + prefixes[message.guild.id].prefixes + '``.')
                        .setTimestamp()
                )
            }

            prefixes[message.guild.id] = {
                prefixes: args[1]
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/prefixes.json')), JSON.stringify(prefixes, null, 2), (err) => {
                if(err) console.log(err)
            });

            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('Prefix')
                    .setDescription('Le nouveau prefix est ``' + prefixes[message.guild.id].prefixes + '``.')
                    .setTimestamp()
            )
        } else if(args[0] === 'join'){
            let joins = require(path.resolve(path.join('..', 'suwo/database/join.json')));
            if(!args[1]){
                if(joins[message.guild.id].joins === 'true'){
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Join')
                            .setDescription('Le statut du join est actuellement activé.')
                            .setTimestamp()
                        )
                } else{
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Join')
                            .setDescription('Le statut du join est actuellement désactivé.')
                            .setTimestamp()
                        )
                }
                
            }

            joins[message.guild.id] = {
                joins: args[1]
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/join.json')), JSON.stringify(joins, null, 2), (err) => {
                if(err) console.log(err)
            });

            if(args[1] === 'true'){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Joins')
                        .setDescription('Vous avez activé le message de join.')
                        .setTimestamp()
                )
            } else{
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Joins')
                        .setDescription('Vous avez désactivé le message de join.')
                        .setTimestamp()
                )
            }
            
        } else if(args[0] === 'joinimage'){
            let joinsImg = require(path.resolve(path.join('..', 'suwo/database/joinImg.json')));
            if(!args[1]){
                if(joinsImg[message.guild.id].joinsImg === 'true'){
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Join Image')
                            .setDescription('Le statut de l\'image join est actuellement activé.')
                            .setTimestamp()
                        )
                } else{
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Join Image')
                            .setDescription('Le statut de l\'image join est actuellement désactivé.')
                            .setTimestamp()
                        )
                }
                
            }

            joinsImg[message.guild.id] = {
                joinsImg: args[1]
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/joinImg.json')), JSON.stringify(joinsImg, null, 2), (err) => {
                if(err) console.log(err)
            });

            if(args[1] === 'true'){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Joins Image')
                        .setDescription('Vous avez activé l\'image de join.')
                        .setTimestamp()
                )
            } else{
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Joins Image')
                        .setDescription('Vous avez désactivé l\'image de join.')
                        .setTimestamp()
                )
            }
            
        } else if(args[0] === 'joinchannel'){
            let joinsChannel = require(path.resolve(path.join('..', 'suwo/database/joinChannel.json')));
            if(!args[1]){
                if(joinsChannel[message.guild.id].joinsChannel === 'Non défini'){
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Join Channel')
                            .setDescription('Le salon de join est actuellement non défini.')
                            .setTimestamp()
                        )
                } else{
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Join Channel')
                            .setDescription(`Le salon de join est actuellement <#${joinsChannel[message.guild.id].joinsChannel}>.`)
                            .setTimestamp()
                        )
                }
                
            }

            let ch = message.mentions.channels.first();

            joinsChannel[message.guild.id] = {
                joinsChannel: ch.id
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/joinChannel.json')), JSON.stringify(joinsChannel, null, 2), (err) => {
                if(err) console.log(err)
            });

            if(args[1]){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Joins Channel')
                        .setDescription(`Le salon de join est désormais <#${joinsChannel[message.guild.id].joinsChannel}>.`)
                        .setTimestamp()
                )
            }
            
        } else if(args[0] === 'joinrole'){
            let joinsRoleId = require(path.resolve(path.join('..', 'suwo/database/joinRoleId.json')));
            if(!args[1]){
                if(joinsRoleId[message.guild.id].joinsRoleId === 'Non défini'){
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Join Role')
                            .setDescription('Le role de join est actuellement non défini.')
                            .setTimestamp()
                        )
                } else{
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Join Role')
                            .setDescription(`Le salon de join est actuellement ${joinsRoleId[message.guild.id].joinsRoleId}.`)
                            .setTimestamp()
                        )
                }
                
            }

            joinsRoleId[message.guild.id] = {
                joinsRoleId: args[1]
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/joinRoleId.json')), JSON.stringify(joinsRoleId, null, 2), (err) => {
                if(err) console.log(err)
            });

            if(args[1]){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Joins Role')
                        .setDescription(`Le rôle de join est désormais ${joinsRoleId[message.guild.id].joinsRoleId}.`)
                        .setTimestamp()
                )
            }
            
        } else if(args[0] === 'joinmessage'){
            let joinsMsg = require(path.resolve(path.join('..', 'suwo/database/joinMsg.json')));
            if(!args[1]){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Join Message')
                        .setDescription(`Le message de join est actuellement : **${joinsMsg[message.guild.id].joinsMsg}**`)
                        .setTimestamp()
                    )
                
            }

            joinsMsg[message.guild.id] = {
                joinsMsg: args.slice(1).join(' ')
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/joinMsg.json')), JSON.stringify(joinsMsg, null, 2), (err) => {
                if(err) console.log(err)
            });
            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('Joins Role')
                    .setDescription(`Le rôle de join est désormais **${args.slice(1).join(' ')}**`)
                    .setTimestamp()
            )
            
        } else if(args[0] === 'membercount'){
            let counts = require(path.resolve(path.join('..', 'suwo/database/membersCount.json')));
            if(!args[1]){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Member Count System')
                        .setDescription(`Le système de comptage de membres est actuellement: **${counts[message.guild.id].counts}**`)
                        .setTimestamp()
                    )
                
            }

            counts[message.guild.id] = {
                counts: args[1]
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/membersCount.json')), JSON.stringify(counts, null, 2), (err) => {
                if(err) console.log(err)
            });

            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('Member Count System')
                    .setDescription(`Le système de comptage de membres est désormais: **${args.slice(1).join(' ')}**`)
                    .setTimestamp()
            )
        } else if(args[0] === 'membercountchannel'){
            let channelCountMemberJoin = require(path.resolve(path.join('..', 'suwo/database/channelCountMemberJoin.json')));
            if(!args[1]){
                if(channelCountMemberJoin[message.guild.id].channelCountMemberJoin === 'Non défini'){
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Member Count System')
                            .setDescription('Le salon de comptage est actuellement non défini.')
                            .setTimestamp()
                        )
                } else{
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Member Count System')
                            .setDescription(`Le salon de comptage est actuellement <#${channelCountMemberJoin[message.guild.id].channelCountMemberJoin}>.`)
                            .setTimestamp()
                        )
                }
                
            }

            let ch = message.mentions.channels.first();

            channelCountMemberJoin[message.guild.id] = {
                channelCountMemberJoin: ch.id
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/channelCountMemberJoin.json')), JSON.stringify(channelCountMemberJoin, null, 2), (err) => {
                if(err) console.log(err)
            });

            if(args[1]){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Member Count System')
                        .setDescription(`Le salon de comptage est désormais <#${channelCountMemberJoin[message.guild.id].channelCountMemberJoin}>.`)
                        .setTimestamp()
                )
            }
        } else if(args[0] === 'membercountchannelname'){
            let customChannelCountNames = require(path.resolve(path.join('..', 'suwo/database/customChannelCountNames.json')));
            if(!args[1]){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Join Message')
                        .setDescription(`Le nom du salon de comptage est actuellement : **${customChannelCountNames[message.guild.id].customChannelCountNames}**`)
                        .setTimestamp()
                    )
                
            }

            customChannelCountNames[message.guild.id] = {
                customChannelCountNames: args.slice(1).join(' ')
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/customChannelCountNames.json')), JSON.stringify(customChannelCountNames, null, 2), (err) => {
                if(err) console.log(err)
            });

            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('Joins Role')
                    .setDescription(`Le nom du salon de comptage est désormais **${args.slice(1).join(' ')}**. Il sera modifié dès qu'une modification du nombre de membres sera a effectuer.`)
                    .setTimestamp()
            )
        } else if(args[0] === 'lang'){
            if(!args[1]){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Language')
                        .setDescription(`Le language actuel est \`\`${langue}\`\`. Pour le changer, faites la même commande en ajoutant le paramètre \`\`fr\`\` pour mettre le bot en Français, et le paramètre \`\`en\`\` pour mettre le bot en anglais.`)
                        .setTimestamp()
                )
            }

            if(args[1] != 'en' && args[1] != 'fr'){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Language')
                        .setDescription('Veuillez séléctionner un language. Mettez `en` pour anglais et `fr` pour le français.')
                        .setDescription()
                )
            }

            langues[message.guild.id] = {
                langues: args[1]
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/langues.json')), JSON.stringify(langues, null, 2), (err) => {
                if(err) console.log(err)
            });

            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('Language')
                    .setDescription(`Le language est désormais \`${args[1]}\``)
                    .setTimestamp()
            )

        }
    } else if(langue === 'en'){
        if(args[0] === "prefix"){
            let prefixes = require(path.resolve(path.join('..', 'suwo/database/prefixes.json')));
            if(!args[1]){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Prefix')
                        .setDescription('The current prefix for your server is : ``' + prefixes[message.guild.id].prefixes + '``.')
                        .setTimestamp()
                )
            }

            prefixes[message.guild.id] = {
                prefixes: args[1]
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/prefixes.json')), JSON.stringify(prefixes, null, 2), (err) => {
                if(err) console.log(err)
            });

            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('Prefix')
                    .setDescription('The new bot prefix is ``' + prefixes[message.guild.id].prefixes + '``.')
                    .setTimestamp()
            )
        } else if(args[0] === 'join'){
            let joins = require(path.resolve(path.join('..', 'suwo/database/join.json')));
            if(!args[1]){
                if(joins[message.guild.id].joins === 'true'){
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Join')
                            .setDescription('The join event is currently enable.')
                            .setTimestamp()
                        )
                } else{
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Join')
                            .setDescription('The join event is currently disable.')
                            .setTimestamp()
                        )
                }
                
            }

            joins[message.guild.id] = {
                joins: args[1]
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/join.json')), JSON.stringify(joins, null, 2), (err) => {
                if(err) console.log(err)
            });

            if(args[1] === 'true'){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Joins')
                        .setDescription('You just enabled the join event.')
                        .setTimestamp()
                )
            } else{
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Joins')
                        .setDescription('You just disabled the join event.')
                        .setTimestamp()
                )
            }
            
        } else if(args[0] === 'joinimage'){
            let joinsImg = require(path.resolve(path.join('..', 'suwo/database/joinImg.json')));
            if(!args[1]){
                if(joinsImg[message.guild.id].joinsImg === 'true'){
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Join Image')
                            .setDescription('The join image is currently enable.')
                            .setTimestamp()
                        )
                } else{
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Join Image')
                            .setDescription('The join image is currently disable.')
                            .setTimestamp()
                        )
                }
                
            }

            joinsImg[message.guild.id] = {
                joinsImg: args[1]
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/joinImg.json')), JSON.stringify(joinsImg, null, 2), (err) => {
                if(err) console.log(err)
            });

            if(args[1] === 'true'){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Joins Image')
                        .setDescription('You just enabled the join image')
                        .setTimestamp()
                )
            } else{
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Joins Image')
                        .setDescription('You just disabled the join image.')
                        .setTimestamp()
                )
            }
            
        } else if(args[0] === 'joinchannel'){
            let joinsChannel = require(path.resolve(path.join('..', 'suwo/database/joinChannel.json')));
            if(!args[1]){
                if(joinsChannel[message.guild.id].joinsChannel === 'Non défini'){
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Join Channel')
                            .setDescription('There is currently no join channel.')
                            .setTimestamp()
                        )
                } else{
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Join Channel')
                            .setDescription(`The join channel is currently : <#${joinsChannel[message.guild.id].joinsChannel}>.`)
                            .setTimestamp()
                        )
                }
                
            }

            let ch = message.mentions.channels.first();

            joinsChannel[message.guild.id] = {
                joinsChannel: ch.id
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/joinChannel.json')), JSON.stringify(joinsChannel, null, 2), (err) => {
                if(err) console.log(err)
            });

            if(args[1]){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Joins Channel')
                        .setDescription(`The join channel is now : <#${joinsChannel[message.guild.id].joinsChannel}>.`)
                        .setTimestamp()
                )
            }
            
        } else if(args[0] === 'joinrole'){
            let joinsRoleId = require(path.resolve(path.join('..', 'suwo/database/joinRoleId.json')));
            if(!args[1]){
                if(joinsRoleId[message.guild.id].joinsRoleId === 'Non défini'){
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Join Role')
                            .setDescription('There is currently no join role.')
                            .setTimestamp()
                        )
                } else{
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Join Role')
                            .setDescription(`The join role's name is currently ${joinsRoleId[message.guild.id].joinsRoleId}.`)
                            .setTimestamp()
                        )
                }
                
            }

            joinsRoleId[message.guild.id] = {
                joinsRoleId: args[1]
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/joinRoleId.json')), JSON.stringify(joinsRoleId, null, 2), (err) => {
                if(err) console.log(err)
            });

            if(args[1]){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Joins Role')
                        .setDescription(`The join role's name is now ${joinsRoleId[message.guild.id].joinsRoleId}.`)
                        .setTimestamp()
                )
            }
            
        } else if(args[0] === 'joinmessage'){
            let joinsMsg = require(path.resolve(path.join('..', 'suwo/database/joinMsg.json')));
            if(!args[1]){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Join Message')
                        .setDescription(`The join message is : **${joinsMsg[message.guild.id].joinsMsg}**`)
                        .setTimestamp()
                    )
                
            }

            joinsMsg[message.guild.id] = {
                joinsMsg: args.slice(1).join(' ')
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/joinMsg.json')), JSON.stringify(joinsMsg, null, 2), (err) => {
                if(err) console.log(err)
            });
            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('Joins Message')
                    .setDescription(`The message is now : **${args.slice(1).join(' ')}**`)
                    .setTimestamp()
            )
            
        } else if(args[0] === 'membercount'){
            let counts = require(path.resolve(path.join('..', 'suwo/database/membersCount.json')));
            if(!args[1]){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Member Count System')
                        .setDescription(`The member count system is currently : **${counts[message.guild.id].counts}**`)
                        .setTimestamp()
                    )
                
            }

            counts[message.guild.id] = {
                counts: args[1]
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/membersCount.json')), JSON.stringify(counts, null, 2), (err) => {
                if(err) console.log(err)
            });

            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('Member Count System')
                    .setDescription(`The member count system is now : **${args.slice(1).join(' ')}**`)
                    .setTimestamp()
            )
        } else if(args[0] === 'membercountchannel'){
            let channelCountMemberJoin = require(path.resolve(path.join('..', 'suwo/database/channelCountMemberJoin.json')));
            if(!args[1]){
                if(channelCountMemberJoin[message.guild.id].channelCountMemberJoin === 'Non défini'){
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Member Count System')
                            .setDescription('There is no member count channel.')
                            .setTimestamp()
                        )
                } else{
                    return message.channel.send(
                        new discord.MessageEmbed()
                            .setTitle('Member Count System')
                            .setDescription(`The member count channel is currently <#${channelCountMemberJoin[message.guild.id].channelCountMemberJoin}>.`)
                            .setTimestamp()
                        )
                }
                
            }

            let ch = message.mentions.channels.first();

            channelCountMemberJoin[message.guild.id] = {
                channelCountMemberJoin: ch.id
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/channelCountMemberJoin.json')), JSON.stringify(channelCountMemberJoin, null, 2), (err) => {
                if(err) console.log(err)
            });

            if(args[1]){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Member Count System')
                        .setDescription(`The member count channel is <#${channelCountMemberJoin[message.guild.id].channelCountMemberJoin}>.`)
                        .setTimestamp()
                )
            }
        } else if(args[0] === 'membercountchannelname'){
            let customChannelCountNames = require(path.resolve(path.join('..', 'suwo/database/customChannelCountNames.json')));
            if(!args[1]){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Join Message')
                        .setDescription(`The current member count channel's name is : **${customChannelCountNames[message.guild.id].customChannelCountNames}**`)
                        .setTimestamp()
                    )
                
            }

            customChannelCountNames[message.guild.id] = {
                customChannelCountNames: args.slice(1).join(' ')
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/customChannelCountNames.json')), JSON.stringify(customChannelCountNames, null, 2), (err) => {
                if(err) console.log(err)
            });

            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('Joins Role')
                    .setDescription(`The member count channel's name is now **${args.slice(1).join(' ')}**. It will be change at the next update.`)
                    .setTimestamp()
            )
        } else if(args[0] === 'lang'){
            if(!args[1]){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Language')
                        .setDescription(`The current language is \`\`${langue}\`\`. To change it write the same command with paramaters. Put \`en\` for English and \`fr\` for French.`)
                        .setTimestamp()
                )
            }

            if(args[1] != 'en' && args[1] != 'fr'){
                return message.channel.send(
                    new discord.MessageEmbed()
                        .setTitle('Language')
                        .setDescription('Please select a language. Put `en` for English and `fr` for French.')
                        .setDescription()
                )
            }

            langues[message.guild.id] = {
                langues: args[1]
            }

            fs.writeFile(path.resolve(path.join('..', 'suwo/database/langues.json')), JSON.stringify(langues, null, 2), (err) => {
                if(err) console.log(err)
            });

            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('Language')
                    .setDescription(`The new language is \`${args[1]}\``)
                    .setTimestamp()
            )

        }
    }
    
}

module.exports.help = {
    name: "config"
}