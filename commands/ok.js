    module.exports = {
        name: 'ok',
        description: "This is a ping command",
        execute(message){
            message.react('ok')
                .then(console.log)
            message.channel.send('Boomer!').then(msg => msg.delete({timeout: 10000}));
        }
}