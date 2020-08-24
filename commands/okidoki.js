    module.exports = {
        name: 'okidoki',
        description: "This is a ping command returning a set link",
        execute(message, args){
            message.channel.send('https://youtube.com/watch?v=dWNvlyycWzQ');
    }
}