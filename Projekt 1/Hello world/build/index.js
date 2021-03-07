var Project1App = /** @class */ (function () {
    function Project1App() {
        this.setInputs();
        this.setEventsToNumbersInput();
    }
    Project1App.prototype.setInputs = function () {
        this.number1Input = document.querySelector('#number1');
        this.number2Input = document.querySelector('#number2');
        this.number3Input = document.querySelector('#number3');
        this.number4Input = document.querySelector('#number4');
        this.sumInput = document.querySelector('#sum');
        this.avgInput = document.querySelector('#avg');
        this.minInput = document.querySelector('#min');
        this.maxInput = document.querySelector('#max');
    };
    Project1App.prototype.getNumberInputsValue = function () {
        this.num1 = +this.number1Input.value;
        this.num2 = +this.number2Input.value;
        this.num3 = +this.number3Input.value;
        this.num4 = +this.number4Input.value;
    };
    Project1App.prototype.setStatsInputsValue = function () {
        this.getNumberInputsValue();
        this.sumInput.value = (this.num1 + this.num2 + this.num3 + this.num4).toString();
        this.avgInput.value = ((this.num1 + this.num2 + this.num3 + this.num4) / 4).toString();
        this.maxInput.value = (Math.max(this.num1, this.num2, this.num3, this.num4)).toString();
        this.minInput.value = (Math.min(this.num1, this.num2, this.num3, this.num4)).toString();
    };
    Project1App.prototype.setEventsToNumbersInput = function () {
        var _this = this;
        this.number1Input.addEventListener('input', function () { return _this.setStatsInputsValue(); });
        this.number2Input.addEventListener('input', function () { return _this.setStatsInputsValue(); });
        this.number3Input.addEventListener('input', function () { return _this.setStatsInputsValue(); });
        this.number4Input.addEventListener('input', function () { return _this.setStatsInputsValue(); });
    };
    return Project1App;
}());
var project = new Project1App();
