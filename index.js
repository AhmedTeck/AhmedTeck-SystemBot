///////////////////////////////
require("events").EventEmitter.defaultMaxListeners = 200;
const Discord = require('discord.js');
const client = new Discord.Client();
const cmd = require("node-cmd");
const { get }  = require('node-superfetch');
const ms = require("ms");
const fs = require('fs');
const ytdl = require("ytdl-core");
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const simpleytapi = require('simple-youtube-api')
const util = require("util")
const gif = require("gif-search");
const jimp = require("jimp");
const guild = require('guild');
const hastebins = require('hastebin-gen');
const getYoutubeID = require('get-youtube-id');
const pretty = require("pretty-ms");
const moment = require('moment');
const request = require('request');
const db = require('quick.db');
const dateFormat = require('dateformat');
///////////////////////////////
///لا تعدل شيء من الي فوق !!

const prefix = process.env.prefix;
const developers = process.env.developer

/*
- [ All rights reserved Ahmed Teck  in Youtube ] -
*/

/// حالة البوت

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setActivity(`${prefix}help | Ahmed Teck `, { type: "PLAYING" });
});


///help code
client.on('message', message => {
    if(message.content.startsWith(prefix + "help")){
    var helplist = new Discord.MessageEmbed()
        .setTitle(`help`)
        .setColor(`RANDOM`)
        .setDescription(`
         \`\`\`Main Commands  :\`\`\`         
         
         - ${prefix}bot : لاظهار معلومات البوت
         
         - ${prefix}avatar : لاظهار صورتك
		 
         - ${prefix}avatar server : لاظهار صوره السيرفر
                  
         - ${prefix}user : لاظهار معلومات حسابك
         
         - ${prefix}server : لاظهار معلومات السيرفر

         - ${prefix}ping : لمعرفه سرعه اتصال البوت

         - ${prefix}roles : لاظهار جميع رولات السيرفر

         \`\`\`Admin Commands :\`\`\` 
         
         \`Text Commands : \`
         
         - ${prefix}ban : لتبنيد شخص
         
         - ${prefix}kick : لطرد شخص
                  
         - ${prefix}mute : أسكات
         
         - ${prefix}unmute : تكلم
         
         - ${prefix}lock : قفل الشات
         
         - ${prefix}unlock : لفتح الشات

         - ${prefix}hide : لاخفاء الشات
         
         - ${prefix}show : لاظهار الشات
         
         - ${prefix}role : اعظاء رتبه لشخص
         
         - ${prefix}say : البوت يكرر كلامك
         
         - ${prefix}embed : كلام بامبد جميل
         
         \`Voice Commands : \`
         
        - ${prefix}Move all : سحب الجميع الى رومك الصوتي 

`)
        return message.channel.send(helplist);
 }
});
  



///أوامر الإدارة 



///kick

client.on('message', async (message) => {
    if(message.author.bot) return undefined;
    if (message.content.startsWith(prefix + 'kick') || message.content.startsWith(prefix + 'طرد')) {
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`>>> \`\`\`You Don't have the permission : \`\`\` \n\n **\`KICK_MEMBERS\`**`);
        let user = message.mentions.members.first();
        let args = message.content.split(' ');
        if(!user || !args[1]) return message.channel.send(`**True Use CMD: ${prefix}kick \`<@MentionUser>\` \`<Reason>\`**`);
        if(message.mentions.users.size < 1) return message.channel.send(`**Not Found This Member**`);
        if(!message.guild.member(user).bannable) return message.channel.send(`**This Member Have Role highst Me Can't Kick**`);
        message.channel.send(`Done Has Been Kicked This User <@${user}>`);
        user.kick();
    }
});

//ban

client.on('message', async (message) => {
    if(message.author.bot) return undefined;
    if (message.content.startsWith(prefix + 'ban') || message.content.startsWith(prefix + 'بان')) {
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`>>> \`\`\`You Don't have the permission : \`\`\` \n\n **\`BAN_MEMBERS\`**`);
        let user = message.mentions.members.first();
        let args = message.content.split(' ');
        if(!user || !args[1]) return message.channel.send(`**True Use CMD: ${prefix}ban \`<@MentionUser>\` \`<Reason>\`**`);
        if(message.mentions.users.size < 1) return message.channel.send(`**Not Found This Member**`);
        if(!message.guild.member(user).bannable) return message.channel.send(`**This Member Have Role highst Me Can't Ban**`);
        message.channel.send(`Done Has Been Banned This User <@${user}>`);
        user.ban({ reason: args[1] });
    }
});

///clear

client.on("message",async message =>{
let command = message.content.toLowerCase().split(" ")[0];
    command = command.slice(prefix.length);
if (command == "clear") { 
message.delete({timeout: 0})
    if(!message.channel.guild) return message.reply(`** This Command For Servers Only**`); 
     if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`> ** You don't have perms :x:**`);
     if(!message.guild.member(client.user).hasPermission('MANAGE_GUILD')) return message.channel.send(`> ** I don't have perms :x:**`);
 
    let args = message.content.split(" ").slice(1)
    let messagecount = parseInt(args);
    if (args > 100) return message.channel.send(`\`\`\`javascript
i cant delete more than 100 messages 
\`\`\``).then(messages => messages.delete(5000))
if(!messagecount) messagecount = '50';
    message.channel.messages.fetch({limit: 100 }).then(messages => message.channel.bulkDelete(messagecount)).then(msgs => {
    message.channel.send(`\`\`\`js
${msgs.size} messages cleared
\`\`\``).then(messages => 
messages.delete({timeout:5000}));
    })
  }    
});



///role


///mute unmute


client.on('message', async message => {
if(message.content.startsWith(prefix + 'mute')) {
if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send(`>>> \`\`\`You Don't have the permission : \`\`\` \n\n **\`MUTE_MEMBERS\`**`);
let mention = message.mentions.members.first();
let role = message.guild.roles.cache.find(ro => ro.name == 'Muted');
if(!role) {
    message.guild.roles.create({
        data: {
            name: 'Muted',
            permissions: [],
            color: 'random'
        }
    })
}
if(!mention) return message.channel.send(`**Usage: ${prefix}mute \`<@user>\`**`);
message.guild.channels.cache.forEach(c => {
c.updateOverwrite(role , {
SEND_MESSAGES: false, 
ADD_REACTIONS: false
});
});
mention.roles.add(role)
message.channel.send(`**✅ - Successfully Muted ${mention.user.tag}**`)
}
})

client.on('message', async message => {
if(message.content.startsWith(prefix + 'unmute')) {
if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send(`>>> \`\`\`You Don't have the permission : \`\`\` \n\n **\`MUTE_MEMBERS\`**`);
let mention = message.mentions.members.first();
if(!mention) return message.channel.send(`**Usage: ${prefix}unmute \`<@user>\`**`);
message.guild.channels.cache.forEach(c => {
c.updateOverwrite(role , {
SEND_MESSAGES: true, 
ADD_REACTIONS: true
});
});
message.channel.send(`**✅ - Successfully Unmuted ${mention.user.tag}**`)
}
})

///say embed



client.on('message' , message =>{
    let commands = message.content.split(" ");
    if(commands[0] == prefix+"say"){
    if(!message.guild) return;
if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("**You Dont Have `MANAGE_MESSAGES` Permission .**");
    if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.reply("Please Check My Role Permission To `MANAGE_MESSAGES`");
    var args = message.content.split(" ").slice(1).join(' ')
    if (!args){
        return message.channel.send("`Usage : "+prefix+"say <message>`");
    }
    message.delete()
    message.channel.send(`${args}`);
    }

});


client.on('message' , message =>{
    let commands = message.content.split(" ");
    if(commands[0] == prefix+"embed"){
    if(!message.guild) return;
if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("**You Dont Have `MANAGE_MESSAGES` Permission .**");
    if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.reply("Please Check My Role Permission To `MANAGE_MESSAGES`");
    var args = message.content.split(" ").slice(1).join(' ')
    if (!args){
        return message.channel.send("`Usage : "+prefix+"embed <message>`");
    }
    message.delete()
    var embed = new Discord.MessageEmbed()
    .setColor(`RANDOM`)
    .setDescription(`${args}`)
    .setFooter(`Send By ${message.author.tag}`)
    message.channel.send(embed);
    }

});




///lock


client.on('message', async message => {
    if(message.content.startsWith(prefix + 'lock')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`>>> \`\`\`You Don't have the permission : \`\`\` \n\n **\`MANAGE_CHANNELS\`**`);
   let channel = message.mentions.channels.first();
   let channel_find = message.guild.channels.cache.find(ch => ch.id == channel);
   if(!channel) return message.channel.send(`**True Use CMD: ${prefix}lock \`<MentionChannel>\`**`)
   if(!channel_find) return message.channel.send(`**:x: | Error, Not Found**`);
   channel_find.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: false
  });
  message.channel.send(`**Done Has Been Locked Channel**`);
    }
});

///unlock


client.on('message', async message => {
    if(message.content.startsWith(prefix + 'unlock')) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`>>> \`\`\`You Don't have the permission : \`\`\` \n\n **\`MANAGE_CHANNELS\`**`);
   let channel = message.mentions.channels.first();
   let channel_find = message.guild.channels.cache.find(ch => ch.id == channel);
   if(!channel) return message.channel.send(`**True Use CMD: ${prefix}unlock \`<MentionChannel>\`**`)
   if(!channel_find) return message.channel.send(`**:x: | Error, Not Found**`);
   channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: true
  });
  message.channel.send(`**Done Has Been UnLocked Channel**`);
    }
});










///show hide


client.on('message', message => {
        if(message.content === prefix + "hide") {
        if(!message.channel.guild) return;
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You Dont Have Perms :x:');
               message.channel.createOverwrite(message.guild.id, {
               VIEW_CHANNEL: false
   })
                message.channel.send('**تـم أخفـاء الشـات**')
   }
  });
  
  
  client.on('message', message => {
        if(message.content === prefix + "show") {
        if(!message.channel.guild) return;
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You Dont Have Perms :x:');
               message.channel.createOverwrite(message.guild.id, {
               VIEW_CHANNEL: true
   })
                message.channel.send('**تـم أظهـار الشـات**')
   }
  });




/*
- [ أوامر عامة ]
*/



///Ping




client.on('message', message =>{
if(message.content === prefix + "ping"){
const ping = new Discord.MessageEmbed()
.setColor("RANDOM")
.addField("> **⇒ My Ping**",`[**__${Date.now() - message.createdTimestamp}MS__**]`,true)
.setFooter('This Bot By Ahmed Teck - <@541058217002663939>')
message.channel.send(ping)
}
});


///Avatar


client.on("message",message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;
    if(message.content.startsWith(prefix + "avatar")){
  const mention = message.mentions.users.first()
  
  if(!mention) return console.log("") 
  let embed = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setAuthor(`${mention.username}#${mention.discriminator}`,`${mention.avatarURL({dynamic : true})}`) 
  .setTitle("Avatar Link")
  .setURL(`${mention.avatarURL({dynamic : true})}`)
  .setImage(`${mention.avatarURL({dynamic : true})}`)
  .setFooter(`Requested By ${message.author.tag}`,`${message.author.avatarURL({dynamic : true})} | This Bot By Ahmed Teck`)    
      message.channel.send(embed)
  }
  })


///Avatar Server

  client.on("message", message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(message.content.startsWith(prefix + "avatar server")) {
      let doma = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setTitle("Avatar Link")
      .setURL(message.guild.iconURL({dynamic : true}))
      .setImage(message.guild.iconURL({dynamic : true}))
      .setFooter(`Requested By ${message.author.tag}`, message.author.avatarURL({dynamic : true}))
      message.channel.send(doma)
    } else if(message.content.startsWith(prefix + "avatar")) {
      let args = message.content.split(" ")[1]
  var avt = args || message.author.id;    
      client.users.fetch(avt).then(user => {
       avt = user;
    let embed = new Discord.MessageEmbed() 
    .setColor("BLACK")
    .setAuthor(`${avt.tag}`, avt.avatarURL({dynamic : true}))
    .setTitle("Avatar Link")
    .setURL(avt.avatarURL({dynamic : true}))
    .setImage(avt.avatarURL({dynamic : true}))
    .setFooter(`Requested By ${message.author.tag}`, message.author.avatarURL({dynamic : true}), `| This Bot By Ahmed Teck`)
    message.channel.send(embed) 
      })
    }
  });


/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/


client.on('message', message => {
  if (message.content.startsWith( prefix + "bot")) {
  message.channel.send({
  embed: new Discord.MessageEmbed()
     .setAuthor(client.user.username,client.user.avatarURL({dynamic : true}))
     .setThumbnail(client.user.avatarURL({dynamic : true}))
     .setColor('RANDOM')
     .setTitle(` ``Info ${client.user.name} Bot`` `)
     .addField('``My Ping``' , [`${Date.now() - message.createdTimestamp}` + 'MS'], true)
     .addField('``servers``', [client.guilds.cache.size], true)
     .addField('``Users``' ,`[ ${client.users.cache.size} ]` , true)
     .addField('``My Name``' , `[ ${client.user.tag} ]` , true)
     .addField('``My ID``' , `[ ${client.user.id} ]` , true)
           .addField('``My Prefix``' , `[ ${prefix} ]` , true)
           .setFooter('This Bot By Ahmed Teck | https://www.youtube.com/channel/UCnjzFqoBbrKUyvbDyVCuk0Q')
  })
  }
  });




///Server Code

client.on("message", ahmedteck =>{
if(!ahmedteck.guild) return;
 
if(ahmedteck.content.startsWith(prefix + "server")){
ahmedteck.channel.send(new Discord.MessageEmbed()
    .setTitle(`${ahmedteck.guild.name}`)
    .setThumbnail(ahmedteck.guild.iconURL())
    .addField("? ID Server", `${ahmedteck.guild.id}`)
    .addField("? Created At", `${moment.utc(ahmedteck.guild.createdAt).format("YYYY/MM/DD, HH:mm a")}\n${moment(ahmedteck.guild.createdAt, "YYYYMMDD").fromNow()}`)
    .addField(":crown: Owned By", `${ahmedteck.guild.owner.user.tag}`)
    .addField(`?** Members ${ahmedteck.guild.memberCount}**`)
    .addField(`:speech_balloon: Channels **(${ahmedteck.guild.channels.cache.size})**`, `**${ahmedteck.guild.channels.cache.filter(c =>c.type === "text").size}** Text | **${ahmedteck.guild.channels.cache.filter(c=>c.type === "voice").size}** Voice |** ${ahmedteck.guild.channels.cache.filter(c=> c.type === "category").size}** Cateogory`)
    .addField(`**:earth_africa: Others **`,`**Region : ** ${ahmedteck.guild.region} \n ** Verification Level : **${ahmedteck.guild.verificationLevel}`)
    .addField(":closed_lock_with_key: Roles ",`**(${ahmedteck.guild.roles.cache.size})**`,`To see a list with all roles use #roles`)
    );
      }
});
 
 

 ///Server Roles

 client.on('message', message => {
  if (message.content.startsWith(prefix + 'roles')) {

      const ahmedroles = message.guild.roles.cache.map(e => e.toString()).join(" ");

      const ahmedroles1 = new Discord.MessageEmbed()
          .setTitle('➠ Roles.')
          .setAuthor(message.guild.name, message.guild.iconURL())
          .setColor('RANDOM')
          .setDescription(ahmedroles)
          .setFooter(`${message.guild.name} | This Bot By Ahmed Teck`)
      message.channel.send(ahmedroles1)
  }
});








/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/






client.on("message", message => {
	let avt = `${message.author.avatarURL({dynamic : true})}`;
  let args = message.content.split(" ")
	if(message.guild.channel) return;
    if (message.content == prefix + "user"){
      let member = message.author || message.mentions.members.first() 
			let embed = new Discord.MessageEmbed() 
.addField(`**Username :**`,`${member.tag}`)

.addField('**User ID :**', `${member.id}`)

.addField('**User Created At :**', `${moment(member.createdTimestamp).fromNow()}`)

.addField(`**User AvatarURL :**`,`[Click Here](${avt})`)
.setImage(`${member.avatarURL({dynamic : true})}`)
.setTimestamp()
.setFooter(`Requested By ${member.tag}`,`${member.avatarURL({dynamic : true})}`,`This Bot By Ahmed Teck`)

return message.channel.send(embed);
}
});




/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/
console.log("- [ All rights reserved Ahmed Teck in Youtube ] -")

/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/

/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/
console.log("- [ All rights reserved Ahmed Teck in Youtube ] -")

/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/

/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/
console.log("- [ All rights reserved Ahmed Teck in Youtube ] -")

/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/


/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/
console.log("- [ All rights reserved Ahmed Teck in Youtube ] -")

/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/


/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/
console.log("- [ All rights reserved Ahmed Teck in Youtube ] -")

/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/


/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/
console.log("- [ All rights reserved Ahmed Teck in Youtube ] -")

/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/

/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/
console.log("- [ All rights reserved Ahmed Teck in Youtube ] -")

/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/



/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/
console.log("- [ All rights reserved Ahmed Teck in Youtube ] -")

/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/


/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/
console.log("- [ All rights reserved Ahmed Teck in Youtube ] -")

/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/

/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/
console.log("- [ All rights reserved Ahmed Teck in Youtube ] -")

/*
- [ All rights reserved Ahmed Teck in Youtube ] -
*/



require('./server')();
client.login(process.env.token);