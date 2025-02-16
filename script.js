document.addEventListener('DOMContentLoaded', async () => {
    const videoElement = document.getElementById('video');
    const channelListElement = document.getElementById('channelList');
    const videoContainer = document.getElementById('videoContainer');

    const player = new shaka.Player(videoElement);
    const ui = new shaka.ui.Overlay(player, videoContainer, videoElement);

    ui.configure({
        'overflowMenuButtons': ['quality', 'language', 'captions', 'playback_rate', 'cast']
    });

    async function loadChannel(channel) {
        videoElement.style.display = "block";

        if (!shaka.Player.isBrowserSupported()) {
            alert("Your browser does not support Shaka Player.");
            return;
        }

        try {
            await player.attach(videoElement);
            player.configure({
                drm: {
                    clearKeys: {
                        [channel.key.split(":")[0]]: channel.key.split(":")[1]
                    }
                }
            });
	
