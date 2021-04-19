module.exports = {
    name: 'clean',
    descripion: "This command cleans -bot commands in chat" +
        "Requires you specify how many messages you want deleted at the time.",

    async execute(message, args){
        if(!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("Oyy, Zoomer! You Gen Z's don't have any rights here!").then(msg => msg.delete({timeout: 5000}));

        if(!args[0])
            return message.channel.send("Gotta specify how much you wanna delete like so: -clean 10").then(msg => msg.delete({timeout: 5000}));

        if(args[0] < 1)
            return message.reply("No point deleting 0 messages is it ?!").then(msg => msg.delete({timeout: 5000}));


        /*await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages);
        });

         */

        await message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`Cleared out ${args[0]} messages.`).then(msg => msg.delete({timeout: 5000}));
        });
    }
}