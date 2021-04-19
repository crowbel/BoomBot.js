const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {

    name: 'play',
    descripion: "This is a play music command",

    async execute(message, args) {
        const voiceChannel = message.member.voice.channel

        if (!voiceChannel) return message.channel.send("Really?!!! Can\'t play no music in a textchannel ehh duhh...")
        const permission = voiceChannel.permissionsFor(message.client.user)
        if (!permission.has('CONNECT')) return message.channel.send("Yeahh, no can do kiddo. I ain\'t got permission to join that channel... ")
        if (!permission.has('SPEAK')) return message.channel.send("Im not even allowed to talk in there man...")

        const connection = await voiceChannel.join()

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        if (video) {
            const stream = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () => {
                voiceChannel.leave();
            });

            await message.reply(`:thumbsup: Now Playing ***${video.title}***`)
        } else{
            await message.channel.send('No video results found');
        }
    }
}