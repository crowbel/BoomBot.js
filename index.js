const Discord = require('discord.js');

/*
Use "node ." in terminal to run or run index.js
Use "Ctrl + c" to turn application off.
 */

const client = new Discord.Client();

const prefix = '-';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}


client.once('ready', () => {
    console.log('BoomBot is online!');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).split(/ +/);

        const command = args.shift().toLowerCase();

    if(command === 'ok'){
        client.commands.get('ok').execute(message, args);

    } else if (command === 'okidoki'){
        client.commands.get('okidoki').execute(message, args);

    } else if (command === 'clean'){
        client.commands.get('clean').execute(message, args);

    } else if (command === 'help'){
        client.commands.get('help').execute(message, args);

    } else if (command === 'googleit') {
        client.commands.get('googleit').execute(message, args);
    }
});

client.login(process.env.token);