const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {

    name: 'play',
    descripion: "This is a play music command",

    async execute(message, args) {
        const connection = await voiceChannel.join();
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send("Really?!!! Can\'t play no music in a textchannel ehh duhh...")
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if (!permissions.has('CONNECT')) return message.channel.send("Yeahh, no can do kiddo. I ain\'t got permission to join that channel... ");
        if (!permissions.has('SPEAK')) return message.channel.send("Im not even allowed to talk in there man...");
        if (!args.length) return message.channel.send('What do you want me to play?');

        /*
        try {
        } catch (error) {
            console.log('Error! When trying to connect to the voice channel: ${error}')
            await message.channel.send('I could not connect to the voice channel: ${error}')
        }
        const dispatcher = connection.play(ytdl(args[1]))
            .on('finish', () => {
                voiceChannel.leave()
            })
            .on('error', error => {
                console.log(error)
            })
        dispatcher.setVolumeLogarithmic(5 / 5)

         */


        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        if (video) {
            const stream = ytdl(video.url, {filter: 'audio'});
            connection.play(stream, {seek: 0, volume: 1})
                .on('finish', () => {
                    voiceChannel.leave();
                });

            await message.reply(`:thumbsup: Now Playing ***${video.title}***`)
        } else {
            await message.channel.send('No video results found');
        }
    }
}