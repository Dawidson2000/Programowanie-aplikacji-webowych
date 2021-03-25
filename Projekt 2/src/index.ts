let activeChannel: number;

let timeClick: number;

const numberOfChannels: number = 4;
let channels: any[][] = [[]];
const audioTags: HTMLAudioElement[] = [];

appStart();

function appStart() {
    document.addEventListener('keypress', onKeyPress);
    
    getAudioTags();
    renderButtons();
    renderChannels();
}

function getAudioTags(): void{
    const audio = document.querySelectorAll('audio');
    audio.forEach((element) => {
        audioTags.push(element);
    });  
}

function renderButtons(): void{
    const buttonsDiv = document.getElementById('buttons');

    audioTags.forEach((element) => {
        let button = document.createElement('button');
        button.className = 'soundButton';
        button.innerText = element.dataset.key.toUpperCase();
        button.id = element.dataset.key;
        buttonsDiv.appendChild(button);
    })
}

function renderChannels(): void{
    const channelsDiv = document.getElementById('channels');

    for(let i=0; i<numberOfChannels; i++)
    {
        let channel = document.createElement('div');
        channel.className = "channel";
        
        let startButton = document.createElement('button');
            startButton.className = 'startBtn';
            startButton.id = 'start-' + i;
            startButton.dataset.channel = "" + i;
            let iconRecord = document.createElement('i');
            iconRecord.className = "icon-record";
            startButton.appendChild(iconRecord);
            startButton.addEventListener('click', (ev) => this.startRecord(ev, i));
            channel.appendChild(startButton);

        let stopButton = document.createElement('button');
            stopButton.className = 'stopBtn';
            stopButton.dataset.channel = "" + i;
            let iconStop = document.createElement('i');
            iconStop.className = "icon-stop";
            stopButton.appendChild(iconStop);
            stopButton.id = 'stop-' + i;
            stopButton.addEventListener('click', (ev) => this.stopRecord(ev, i));
            stopButton.classList.toggle('hidden');
            channel.appendChild(stopButton);

        let playButton = document.createElement('button');
            playButton.className = 'playBtn';
            playButton.dataset.channel = "" + i;
            let iconPlay = document.createElement('i');
            iconPlay.className = "icon-play";
            playButton.appendChild(iconPlay);
            playButton.addEventListener('click', (ev) => this.playRecord(ev, i));
            channel.appendChild(playButton);

        channelsDiv.appendChild(channel);
        channels.push([]);    
    }

    let playAllButton = document.createElement('button');
        playAllButton.id = "playAllBtn";
        playAllButton.innerText = "PLAY ALL";
        playAllButton.addEventListener('click', (ev) => this.playAll(ev));
        channelsDiv.appendChild(playAllButton);

}

function startRecord(ev: MouseEvent, numberOfChannel: number): void{
    timeClick = ev.timeStamp;
    activeChannel = numberOfChannel;
    channels[activeChannel]=[];
    console.log(activeChannel);

    hiddenButton(numberOfChannel);
    disableOrEnableCButton();    
}

function stopRecord(ev: MouseEvent, numberOfChannel: number): void {
    activeChannel = null;

    hiddenButton(numberOfChannel);
    disableOrEnableCButton();
}

function playRecord(ev: MouseEvent, numberOfChannel: number): void {
    console.log(channels);
    console.log(activeChannel);
    
    if(activeChannel===null){
        channels[numberOfChannel].forEach(sound => {
            setTimeout(() => playSound(sound.key), sound.time)
        });
    }
}

function playAll(ev: MouseEvent): void{
    for(let i=0; i<numberOfChannels; i++)
        playRecord(ev,i);
}

function hiddenButton(id: number): void{
    const startBtn = document.getElementById("start-" + id);
    const stoptBtn = document.getElementById("stop-" + id);
    stoptBtn.classList.toggle('hidden');
    startBtn.classList.toggle('hidden');
}

function disableOrEnableCButton(): void{
    document.querySelectorAll('.startBtn').forEach((element) => {
        element.classList.toggle('noClick');
    });
}

function onKeyPress(ev: KeyboardEvent): void {
    console.log(ev);
    const key = ev.key;
    const time = ev.timeStamp - timeClick;

    console.log(channels);
    if(activeChannel != null)
        channels[activeChannel].push({ key, time });

    playSound(key);
}

function playSound(key: string): void {
    try{
        const sound: HTMLAudioElement = document.querySelector("[data-key=" + "'" + key + "']");
        sound.currentTime = 0;
        sound.play();
        playAnimation(key);
    }
        catch(Error){
    }
}

function playAnimation(key: string): void{
    document.getElementById(key).classList.toggle('onClick');

    setTimeout( () => {
        document.getElementById(key).classList.toggle('onClick');
    }, 300);
}