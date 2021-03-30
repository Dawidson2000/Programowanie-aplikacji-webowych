let activeChannel: number; //określa czy aktualnie trwa nagrywanie

let timeClick: number; //określa czas rozpoczęcia nagrania

const numberOfChannels: number = 4;
let channels: any[][] = [[]]; //zawiera poszczególne kanały i ich nagrania 
const audioTags: HTMLAudioElement[] = []; //przechowuje tagi audio 

appStart();

function appStart() {
    document.addEventListener('keypress', onKeyPress);
    
    getAudioTags();
    renderButtons();
    renderChannels();
}

//zapisuje tagi audio do tablicy
function getAudioTags(): void{
    const audio = document.querySelectorAll('audio');
    audio.forEach((element) => {
        audioTags.push(element);
    });  
}

//tworzy przyciski odpowiedzialne za poszczególne dźwięki perkusji
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

//tworzy przyciski obsługujące funkcjonalność nagrywania i odtwarzania kanałów
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
            playButton.id = 'play-' + i;
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

//aktywuje nagrywanie nowej ścieżki dźwiękowej na danym kanale
function startRecord(ev: MouseEvent, numberOfChannel: number): void{
    timeClick = ev.timeStamp;
    activeChannel = numberOfChannel;
    channels[activeChannel]=[];
    console.log(activeChannel);

    hiddenButton(numberOfChannel);
    disableOrEnableStartButton();    
}

//zatrzymuje nagrywanie na danym kanale
function stopRecord(ev: MouseEvent, numberOfChannel: number): void {
    activeChannel = null;

    hiddenButton(numberOfChannel);
    disableOrEnableStartButton();
}

//odtwarza nagranie na danym kanale
function playRecord(ev: MouseEvent, numberOfChannel: number): void {
    console.log(channels);
    console.log(activeChannel);

    if(activeChannel===null){
        switchPlayButton(numberOfChannel);

        channels[numberOfChannel].forEach(sound => {
            setTimeout(() => playSound(sound.key), sound.time)
        });
    }
}

//odwarza wszystkie kanały w tym samym momencie
function playAll(ev: MouseEvent): void{
    for(let i=0; i<numberOfChannels; i++)
        playRecord(ev,i);
}


//jeżeli trwa odtwarzanie nagrania na danym kanale wyłącza możliwość ponownego wciśnięcia przycisku play na kanale tego nagrania
function switchPlayButton(numberOfChannel: number): void{
    let time: number;
    document.getElementById("play-" + numberOfChannel).classList.toggle('noClickPlay');
    //document.getElementById("playAllBtn").classList.toggle('noClick');
    
    if(channels[numberOfChannel].length-1 >=0){
        time = channels[numberOfChannel][channels[numberOfChannel].length-1].time;   
        setTimeout(() => {
            document.getElementById("play-" + numberOfChannel).classList.toggle('noClickPlay')
            //document.getElementById("playAllBtn").classList.toggle('noClick');
        }, time+200);
    }
    else
        document.getElementById("play-" + numberOfChannel).classList.toggle('noClickPlay')
}

//zamienia przyciski start i stop
function hiddenButton(id: number): void{
    const startBtn = document.getElementById("start-" + id);
    const stoptBtn = document.getElementById("stop-" + id);
    stoptBtn.classList.toggle('hidden');
    startBtn.classList.toggle('hidden');
}

//wyłącza mozliwość kliknięcia pozostałych przycisków start podczas nagrywania
function disableOrEnableStartButton(): void{
    document.querySelectorAll('.startBtn').forEach((element) => {
        element.classList.toggle('noClick');
    });
}

//zapisuje dźwięk do tablicy i wywołuje funkcję, która ma go zagrać
function onKeyPress(ev: KeyboardEvent): void {
    console.log(ev);
    const key = ev.key;
    const time = ev.timeStamp - timeClick;

    console.log(channels);
    if(activeChannel != null)
        channels[activeChannel].push({ key, time });

    playSound(key);
}

//odtwarza przypisany do klawisza dźwięk
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

//Uruchamia animację naciśnięcia przycisku
function playAnimation(key: string): void{
    document.getElementById(key).classList.toggle('onClick');

    setTimeout( () => {
        document.getElementById(key).classList.toggle('onClick');
    }, 300);
}