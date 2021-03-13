
class Project1App{

    numberOfInputs: HTMLInputElement;
    
    //input: HTMLInputElement;
    //button: HTMLElement;

    inputsValueArray: number[];

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
    setDefaultValuesToStats(){
        this.sumInput.value = '0';
        this.avgInput.value = '0';
        this.minInput.value = '0';
        this.maxInput.value = '0';
    }

    makeInput(id: number){
        const input = document.createElement('input');
        input.type = 'number';
        input.id="input-" + id;
        input.value = '0';
        input.addEventListener('input', () => this.checkInput(input));
        
        return input;
    }

    makeButton(id: number){
        const button = document.createElement('button');
        button.innerHTML = "X";
        button.id = "button-" + id;
        button.addEventListener('click', () => this.deleteInput(button));

        return button;
    }

    deleteInput(button: HTMLElement){
        button.parentElement.remove();
        this.numberOfInputs.value = document.getElementById('input-data').childElementCount.toString();

        this.displayStats();
    }
    
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

    checkInput(input: HTMLInputElement){       
        if(input.value.length === 0){
            input.value = "0";
        }

        this.displayStats();
    }

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

    getNumberOfInputs(){
        this.numberOfInputs = document.querySelector("#numberOfInputs");
        let amount = +this.numberOfInputs.value;
        
        return amount;
    }

    setCreateInputEvent(){
        this.numberOfInputs = document.querySelector("#numberOfInputs");
        this.numberOfInputs.addEventListener('input', () => this.createInputContainer());
    }

    getValuefromInputs(){
        const amount = this.getNumberOfInputs();
        this.inputsValueArray = []; 
        
        let inputsList = document.getElementsByClassName('inputContainer');

        for(let i=0; i<document.getElementById('input-data').childElementCount; i++)
        {            
            this.inputsValueArray.push(+inputsList.item(i).getElementsByTagName('input')[0].value);
        }
    }

    sum(){
        const sum = this.inputsValueArray.reduce(function (a, b) { return a + b; }, 0);
        return sum;
    }
    avg(){
        const avg = this.sum()/this.getNumberOfInputs();
        return avg;
    }
    max(){
        return Math.max.apply(Math, this.inputsValueArray);
    }
    min(){
        return Math.min.apply(Math, this.inputsValueArray);
    }
}


const project = new Project1App();