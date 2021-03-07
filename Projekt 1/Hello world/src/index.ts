class Project1App{
    number1Input: HTMLInputElement;
    number2Input: HTMLInputElement;
    number3Input: HTMLInputElement;
    number4Input: HTMLInputElement;

    sumInput: HTMLInputElement;
    avgInput: HTMLInputElement;
    minInput: HTMLInputElement;
    maxInput: HTMLInputElement;

    num1: number;
    num2: number;
    num3: number;
    num4: number;

    constructor(){
        this.getNumberInputsValue();
    }

    setInputs(){
        this.number1Input = document.querySelector('number1');
        this.number2Input = document.querySelector('number2');
        this.number1Input = document.querySelector('number3');
        this.number2Input = document.querySelector('number4');

        this.sumInput = document.querySelector('sum');
        this.avgInput = document.querySelector('avg');
        this.minInput = document.querySelector('min');
        this.maxInput = document.querySelector('max');
    }

    getNumberInputsValue(){
        this.num1 = +this.number1Input.value;
        this.num2 = +this.number2Input.value;
        this.num3 = +this.number3Input.value;
        this.num4 = +this.number4Input.value; 
    }
    
    setStatsInputsValue(){
        this.sumInput.value = (this.num1 + this.num2 + this.num3 + this.num4).toString();
        this.avgInput.value = ((this.num1 + this.num2 + this.num3 + this.num4)/4).toString();
        this.maxInput.value = (Math.max(this.num1, this.num2, this.num3, this.num4)).toString();
        this.minInput.value = (Math.min(this.num1, this.num2, this.num3, this.num4)).toString(); 
    }

    setEventsToNumbersInput(){
        this.number1Input.addEventListener('input', () => this.setStatsInputsValue());
        this.number2Input.addEventListener('input', () => this.setStatsInputsValue());
        this.number3Input.addEventListener('input', () => this.setStatsInputsValue());
        this.number4Input.addEventListener('input', () => this.setStatsInputsValue());
    }
}

let project = new Project1App();