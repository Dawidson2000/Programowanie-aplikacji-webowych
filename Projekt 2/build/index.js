var activeChannel;
var timeClick;
var numberOfChannels = 4;
var channels = [[]];
var audioTags = [];
appStart();
function appStart() {
    document.addEventListener('keypress', onKeyPress);
    getAudioTags();
    renderButtons();
    renderChannels();
}
function getAudioTags() {
    var audio = document.querySelectorAll('audio');
    audio.forEach(function (element) {
        audioTags.push(element);
    });
}
function renderButtons() {
    var buttonsDiv = document.getElementById('buttons');
    audioTags.forEach(function (element) {
        var button = document.createElement('button');
        button.className = 'soundButton';
        button.innerText = element.dataset.key.toUpperCase();
        button.id = element.dataset.key;
        buttonsDiv.appendChild(button);
    });
}
function renderChannels() {
    var _this = this;
    var channelsDiv = document.getElementById('channels');
    var _loop_1 = function (i) {
        var channel = document.createElement('div');
        channel.className = "channel";
        var startButton = document.createElement('button');
        startButton.className = 'startBtn';
        startButton.id = 'start-' + i;
        startButton.dataset.channel = "" + i;
        var iconRecord = document.createElement('i');
        iconRecord.className = "icon-record";
        startButton.appendChild(iconRecord);
        startButton.addEventListener('click', function (ev) { return _this.startRecord(ev, i); });
        channel.appendChild(startButton);
        var stopButton = document.createElement('button');
        stopButton.className = 'stopBtn';
        stopButton.dataset.channel = "" + i;
        var iconStop = document.createElement('i');
        iconStop.className = "icon-stop";
        stopButton.appendChild(iconStop);
        stopButton.id = 'stop-' + i;
        stopButton.addEventListener('click', function (ev) { return _this.stopRecord(ev, i); });
        stopButton.classList.toggle('hidden');
        channel.appendChild(stopButton);
        var playButton = document.createElement('button');
        playButton.className = 'playBtn';
        playButton.dataset.channel = "" + i;
        var iconPlay = document.createElement('i');
        iconPlay.className = "icon-play";
        playButton.appendChild(iconPlay);
        playButton.id = 'play-' + i;
        playButton.addEventListener('click', function (ev) { return _this.playRecord(ev, i); });
        channel.appendChild(playButton);
        channelsDiv.appendChild(channel);
        channels.push([]);
    };
    for (var i = 0; i < numberOfChannels; i++) {
        _loop_1(i);
    }
    var playAllButton = document.createElement('button');
    playAllButton.id = "playAllBtn";
    playAllButton.innerText = "PLAY ALL";
    playAllButton.addEventListener('click', function (ev) { return _this.playAll(ev); });
    channelsDiv.appendChild(playAllButton);
}
function startRecord(ev, numberOfChannel) {
    timeClick = ev.timeStamp;
    activeChannel = numberOfChannel;
    channels[activeChannel] = [];
    console.log(activeChannel);
    hiddenButton(numberOfChannel);
    disableOrEnableCButton();
}
function stopRecord(ev, numberOfChannel) {
    activeChannel = null;
    hiddenButton(numberOfChannel);
    disableOrEnableCButton();
}
function playRecord(ev, numberOfChannel) {
    console.log(channels);
    console.log(activeChannel);
    //document.getElementById("play-" + numberOfChannel).classList.toggle('noClick');
    if (activeChannel === null) {
        switchPlayButton(numberOfChannel);
        channels[numberOfChannel].forEach(function (sound) {
            setTimeout(function () { return playSound(sound.key); }, sound.time);
        });
    }
}
function playAll(ev) {
    for (var i = 0; i < numberOfChannels; i++)
        playRecord(ev, i);
}
function switchPlayButton(numberOfChannel) {
    var time;
    document.getElementById("play-" + numberOfChannel).classList.toggle('noClickPlay');
    //document.getElementById("playAllBtn").classList.toggle('noClick');
    if (channels[numberOfChannel].length - 1 >= 0) {
        time = channels[numberOfChannel][channels[numberOfChannel].length - 1].time;
        setTimeout(function () {
            document.getElementById("play-" + numberOfChannel).classList.toggle('noClickPlay');
            //document.getElementById("playAllBtn").classList.toggle('noClick');
        }, time + 200);
    }
    else
        document.getElementById("play-" + numberOfChannel).classList.toggle('noClickPlay');
}
function hiddenButton(id) {
    var startBtn = document.getElementById("start-" + id);
    var stoptBtn = document.getElementById("stop-" + id);
    stoptBtn.classList.toggle('hidden');
    startBtn.classList.toggle('hidden');
}
function disableOrEnableCButton() {
    document.querySelectorAll('.startBtn').forEach(function (element) {
        element.classList.toggle('noClick');
    });
}
function onKeyPress(ev) {
    console.log(ev);
    var key = ev.key;
    var time = ev.timeStamp - timeClick;
    console.log(channels);
    if (activeChannel != null)
        channels[activeChannel].push({ key: key, time: time });
    playSound(key);
}
function playSound(key) {
    try {
        var sound = document.querySelector("[data-key=" + "'" + key + "']");
        sound.currentTime = 0;
        sound.play();
        playAnimation(key);
    }
    catch (Error) {
    }
}
function playAnimation(key) {
    document.getElementById(key).classList.toggle('onClick');
    setTimeout(function () {
        document.getElementById(key).classList.toggle('onClick');
    }, 300);
}
