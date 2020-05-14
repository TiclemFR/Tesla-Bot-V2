const Discord = require("discord.js");
const errors = require("../modules/errors.js");
const moment = require('moment');

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");
    if(args[0] == "help"){
      message.reply("Usage: t!ban <user> <reason>");
      return;
    }
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return errors.cantfindUser(message.channel);
    if(bUser.id === bot.user.id) return errors.botuser(message); 
    let bReason = args.join(" ").slice(22);
    if(!bReason) return errors.noReason(message.channel);
    if(bUser.hasPermission("BAN_MEMBERS")) return errors.equalPerms(message, bUser, "BAN_MEMBERS");

    let banEmbed = new Discord.MessageEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addFields(
            {name: 'Banned User', value: `${bUser} with ID ${bUser.id}`},
            {name: 'Banned By', value: `<@${message.author.id}> with ID ${message.author.id}`},
            {name: 'Banned In', value: message.channel},
            {name: 'Time', value: moment.utc(message.createdAt).format('LLL')},
            {name: 'Reason', value: bReason},
        );

    message.guild.member(bUser).ban(bReason);
    message.channel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}