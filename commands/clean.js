    module.exports = {
        name: 'clean',
        descripion: "This command cleans all commands in chat" +
            " and results of them to keep chat clean. " +
            "Requires you specify how many messages you want deleted at the time. " +
            "Will insult you if you fuck it up or don't have permissions.",

        execute(message, args){
            if(!message.member.hasPermission("MANAGE_MESSAGES"))
                return message.reply("Oyy, Zoomer! You Gen Z's don't have any rights here!");
            if(!args[0])
                return message.reply("Not how it works man! \n" +
                    "Gotta specify how much you wanna delete like so: -clean 10").then(msg => msg.delete({timeout: 10000}));

            message.channel.bulkDelete(args[0]).then(() => {
                message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete({timeout: 10000}));
            });
        }
    }