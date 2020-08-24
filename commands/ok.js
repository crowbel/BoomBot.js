    module.exports = {
        name: 'ok',
        description: "This is a ping command",
        execute(message){
            message.channel.send('Boomer!').delete;
        }
}