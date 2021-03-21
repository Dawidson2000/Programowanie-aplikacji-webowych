var clapSound;
appStart();
function appStart() {
    document.body.addEventListener('keypress', onKeyDown);
}
function onKeyDown(event) {
    var key = event.key;
    var time = event.timeStamp;
    getAudioTags();
    clapSound.play();
}
function getAudioTags() {
    clapSound = document.querySelector('[data-sound="clap"]');
}
