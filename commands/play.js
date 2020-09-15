    moduler.exports = {

        name: 'play',
        descripion: "This is a play music command",
        async execute(message) {
            const voiceChannel = message.member.voice.channel
            if (!voiceChannel) return message.channel.send("Really?!!! Can\'t play no music in a textchannel ehh duhh...")
            const permission = voiceChannel.permissionsFor(message.client.user)
            if (!permissions.has('CONNECT')) return message.channel.send("Yeahh, no can do. I ain\'t got permission to join that channel... ")
            if (!permissions.has('SPEAK')) return message.channel.send("Im not even allowed to talk in there man...")

            try {
                var connection = await voiceChannel.join()
            } catch (error) {
                console.log('There was an error connection to the voice channel: ${error}')
                return message.channel.send('There was an error connecting to the voice channel: ${error}')
            }

            const dispatcher = connection.play(ytdl(args[1]))
                .on('finish', () => {
                    voiceChannel.leave()
                })
                .on('error', error => {
                    console.log(error)
                })
            dispatcher.setVolumeLogarithmic(5 / 5)
        }
    }