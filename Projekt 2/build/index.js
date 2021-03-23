var channel1 = [];
var activeChannel = false;
var timeClick;
var audioTags = [];
appStart();
function appStart() {
    var _this = this;
    document.addEventListener('keypress', onKeyPress);
    var startChannel1 = document.querySelector('#startRecord1');
    var stopChannel1 = document.querySelector('#stopRecord1');
    var playChannel1 = document.querySelector('#playRecord1');
    startChannel1.addEventListener('click', function (ev) { return _this.startRecord(ev); });
    stopChannel1.addEventListener('click', stopRecord);
    playChannel1.addEventListener('click', playRecord);
    getAudioTags();
    renderButtons();
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
        button.innerText = element.dataset.key;
        button.id = element.dataset.key;
        buttonsDiv.appendChild(button);
    });
}
function startRecord(ev) {
    timeClick = ev.timeStamp;
    console.log(timeClick);
    activeChannel = true;
    channel1 = [];
}
function stopRecord() {
    activeChannel = false;
}
function playRecord() {
    channel1.forEach(function (sound) {
        setTimeout(function () { return playSound(sound.key); }, sound.time);
    });
}
function onKeyPress(ev) {
    console.log(ev);
    var key = ev.key;
    var time = ev.timeStamp - timeClick;
    console.log(time + "XD");
    if (activeChannel)
        channel1.push({ key: key, time: time });
    playSound(key);
    //console.log(channel1);
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
    }, 150);
}
