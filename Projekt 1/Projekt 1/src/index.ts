
class Project1App{

    numberOfInputs: HTMLInputElement;
    
    //input: HTMLInputElement;
    //button: HTMLElement;

    inputsValueArray: number[]; //przechowuje wartości wpisane w inputy

    sumInput: HTMLInputElement;
    avgInput: HTMLInputElement;
    minInput: HTMLInputElement;
    maxInput: HTMLInputElement;

    constructor(){
        this.setCreateInputEvent();
        this.setStatsInputs();     
    }

    setStatsInputs(){
        this.sumInput = document.querySelector('#sum');
        this.avgInput = document.querySelector('#avg');
        this.minInput = document.querySelector('#min');
        this.maxInput = document.querySelector('#max');
    }

    //ustawia wartośc domyślną inputów
    setDefaultValuesToStats(){
        this.sumInput.value = '0';
        this.avgInput.value = '0';
        this.minInput.value = '0';
        this.maxInput.value = '0';
    }

    //generuje nowego inputa
    makeInput(id: number){
        const input = document.createElement('input');
        input.type = 'number';
        input.className='numbers-input';
        input.value = '0';
        input.addEventListener('input', () => this.checkInput(input));
        
        return input;
    }

    //tworzy przycisk usuwający input
    makeButton(id: number){
        const button = document.createElement('button');
        button.innerHTML = "X";
        button.className = "delete-button";
        button.addEventListener('click', () => this.deleteInput(button));

        return button;
    }

    //usuwa input
    deleteInput(button: HTMLElement){
        button.parentElement.remove();
        this.numberOfInputs.value = document.getElementById('input-data').childElementCount.toString();

        this.displayStats();
    }
    
    //Tworzy diva zawierającego input i przycisk, który go usuwa
    createInputContainer(){
        const container = document.getElementById('input-data');
        container.innerHTML=null;
        this.setDefaultValuesToStats();

        const amount = this.getNumberOfInputs();

        for(let i=0; i<amount; i++)
        {
            const inputContainer = document.createElement("div");
            inputContainer.className = "inputContainer";
            container.appendChild(inputContainer);
            inputContainer.appendChild(this.makeInput(i));
            inputContainer.appendChild(this.makeButton(i));
        }
    }

    //sprawdza czy input zawiera treść
    checkInput(input: HTMLInputElement){       
        if(input.value.length === 0){
            input.value = "0";
        }

        this.displayStats();
    }

    //wyswietla statystyki inputów
    displayStats(){ 
        this.getValuefromInputs();
        
        if(document.getElementById('input-data').childElementCount>0){
            this.sumInput.value = this.sum().toString();
            this.avgInput.value = this.avg().toString();
            this.maxInput.value = this.max().toString();
            this.minInput.value = this.min().toString();
        }
        else{
            this.sumInput.value = "0";
            this.avgInput.value = "0";
            this.maxInput.value = "0";
            this.minInput.value = "0";
        }
    }

    //zwraca ilość inputów
    getNumberOfInputs(){
        this.numberOfInputs = document.querySelector("#numberOfInputs");
        let amount = +this.numberOfInputs.value;
        
        return amount;
    }

    //dodaje event do inputa wyznaczającego ilość dalszych inputów(z liczbami)
    setCreateInputEvent(){
        this.numberOfInputs = document.querySelector("#numberOfInputs");
        this.numberOfInputs.addEventListener('input', () => this.createInputContainer());
    }

    //pobiera wartości z inputów i zapisuje je do tablicy
    getValuefromInputs(){
        const amount = this.getNumberOfInputs();
        this.inputsValueArray = []; 
        
        let inputsList = document.getElementsByClassName('inputContainer');

        for(let i=0; i<document.getElementById('input-data').childElementCount; i++)
        {            
            this.inputsValueArray.push(+inputsList.item(i).getElementsByTagName('input')[0].value);
        }
    }

    //wyznacza sumę danych z inputów
    sum(){
        const sum = this.inputsValueArray.reduce(function (a, b) { return a + b; }, 0);
        return sum;
    }
    //wyznacza średnią danych z inputów
    avg(){
        const avg = this.sum()/this.getNumberOfInputs();
        return avg;
    }
    //wyznacza największą wartość z inputów
    max(){
        return Math.max.apply(Math, this.inputsValueArray);
    }
    //wyznacza minimalną wartość z inputów
    min(){
        return Math.min.apply(Math, this.inputsValueArray);
    }
}


const project = new Project1App();