
class Project1App{

    numberOfInputs: HTMLInputElement;
    input: HTMLInputElement;

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
    
    createInputs(){
        const container = document.getElementById('input-data');
        container.innerHTML=null;
        this.setDefaultValuesToStats();

        const amount = this.getNumberOfInputs();

        for(let i=0; i<amount; i++)
        {
            this.input = document.createElement('input');
            this.input.type = 'number';
            this.input.id="input-" + i;
            this.input.value = '0';
            this.input.addEventListener('input', () => this.displayStats());
            container.appendChild(this.input);
        }
    }

    displayStats(){
        this.getValuefromInputs()

        this.sumInput.value = this.sum().toString();
        this.avgInput.value = this.avg().toString();
        this.maxInput.value = this.max().toString();
        this.minInput.value = this.min().toString();
    }

    getNumberOfInputs(){
        this.numberOfInputs = document.querySelector("#numberOfInputs");
        let amount = +this.numberOfInputs.value;
        
        return amount;
    }

    setCreateInputEvent(){
        this.numberOfInputs = document.querySelector("#numberOfInputs");
        this.numberOfInputs.addEventListener('input', () => this.createInputs());
    }

    getValuefromInputs(){
        const amount = this.getNumberOfInputs();
        this.inputsValueArray = [];  

        for(let i=0; i<amount; i++)
        {
            let tempId = "input-" + i;
            let inputValue = +(document.getElementById(tempId) as HTMLInputElement).value;
            this.inputsValueArray.push(inputValue);
        }
    }

    sum(){
        const sum = this.inputsValueArray.reduce(function (a, b) { return a + b; }, 0);
        return sum;
    }
    avg(){
        const avg = this.getNumberOfInputs()/this.sum();
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