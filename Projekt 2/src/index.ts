let channel1: any[] = [];
let activeChannel: boolean = false;

const audioTags: HTMLAudioElement[] = [];
appStart();

function appStart() {
    document.addEventListener('keypress', onKeyPress);
    
    const startChannel1 = document.querySelector('#startRecord1');
    const stopChannel1 = document.querySelector('#stopRecord1');
    const playChannel1 = document.querySelector('#playRecord1');
    
    startChannel1.addEventListener('click', startRecord);
    stopChannel1.addEventListener('click', stopRecord);
    playChannel1.addEventListener('click', playRecord);


    getAudioTags();
    renderButtons();
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
        button.innerText = element.dataset.key;
        button.id = element.dataset.key;
        buttonsDiv.appendChild(button);
    })
}

function startRecord(): void {
    activeChannel = true;
    channel1 = [];
}

function stopRecord(): void {
    activeChannel = false;
}

function playRecord(): void {
    channel1.forEach(sound => {
        setTimeout(() => playSound(sound.key), sound.time)
    })

}

function onKeyPress(ev: KeyboardEvent): void {
    console.log(ev);
    const key = ev.key;
    const time = Date.now();
    console.log(time + "XD");

    if(activeChannel)
        channel1.push({ key, time });

    playSound(key);
    //console.log(channel1);
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
    }, 150);
}