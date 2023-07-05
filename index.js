const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
const { prefix, owner, token } = require("./config.js");
const { readdirSync } = require("fs")
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

client.commands = new Collection()

const rest = new REST({ version: '10' }).setToken(token);

const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };

//command-handler
const commands = [];
const commandFiles = readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

client.on("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );
        } catch (error) {
            console.error(error);
        }
    log(`${client.user.username} Aktif Edildi!`);
})

//event-handler
const eventFiles = readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
client.on('guildMemberAdd', async member => { 

    const kanal = "1125114012082909194"
    const log = client.channels.cache.get(kanal)
    let user = client.users.cache.get(member.id);
    if(log){
    log.send(`**<@${user.id}> Sunucuya Hoş Geldin Seninle Birlikte __${member.guild.memberCount}__ Kişiyiz!**`)
    } else {
      console.log("Belirtilen Kanalı Bulamadım!")
    }
    })

    ///////////////////////////////////////////////////////////////////////////////////////////////
  
    client.on('guildMemberRemove', async member => { 
  
        const kanal = "1125114012082909194"
        const log = client.channels.cache.get(kanal)
        let user = client.users.cache.get(member.id);
        if(log){
        log.send(`**\`${user.tag}\`  Sunucudan Ayrıldı! Geriye __${member.guild.memberCount}__ Kişi Kaldık!**`)
        } else {
          console.log("Belirtilen Kanalı Bulamadım!")
        }
        }) 
//

client.login("MTA0ODYxNjA5MzkzMTAxNjI5Mg.GvH47j.GKnyxhqOUYzyvCCnzGs8UasigroAy0OmZPoRYA")
