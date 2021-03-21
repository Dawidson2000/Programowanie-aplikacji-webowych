let clapSound: HTMLAudioElement;

appStart();

function appStart(): void{
    document.body.addEventListener('keypress', onKeyDown);
}

function onKeyDown(event: KeyboardEvent): void{
    const key = event.key;
    const time = event.timeStamp;
    getAudioTags()
    clapSound.play();
}

function getAudioTags()
{
    clapSound = document.querySelector('[data-sound="clap"]');
}