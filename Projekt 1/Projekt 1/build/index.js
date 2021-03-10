var Project1App = /** @class */ (function () {
    function Project1App() {
        this.setCreateInputEvent();
        this.setStatsInputs();
    }
    Project1App.prototype.setStatsInputs = function () {
        this.sumInput = document.querySelector('#sum');
        this.avgInput = document.querySelector('#avg');
        this.minInput = document.querySelector('#min');
        this.maxInput = document.querySelector('#max');
    };
    Project1App.prototype.setDefaultValuesToStats = function () {
        this.sumInput.value = '0';
        this.avgInput.value = '0';
        this.minInput.value = '0';
        this.maxInput.value = '0';
    };
    Project1App.prototype.createInputs = function () {
        var _this = this;
        var container = document.getElementById('input-data');
        container.innerHTML = null;
        this.setDefaultValuesToStats();
        var amount = this.getNumberOfInputs();
        for (var i = 0; i < amount; i++) {
            this.input = document.createElement('input');
            this.input.type = 'number';
            this.input.id = "input-" + i;
            this.input.value = '0';
            this.input.addEventListener('input', function () { return _this.displayStats(); });
            container.appendChild(this.input);
        }
    };
    Project1App.prototype.displayStats = function () {
        this.getValuefromInputs();
        this.sumInput.value = this.sum().toString();
        this.avgInput.value = this.avg().toString();
        this.maxInput.value = this.max().toString();
        this.minInput.value = this.min().toString();
    };
    Project1App.prototype.getNumberOfInputs = function () {
        this.numberOfInputs = document.querySelector("#numberOfInputs");
        var amount = +this.numberOfInputs.value;
        return amount;
    };
    Project1App.prototype.setCreateInputEvent = function () {
        var _this = this;
        this.numberOfInputs = document.querySelector("#numberOfInputs");
        this.numberOfInputs.addEventListener('input', function () { return _this.createInputs(); });
    };
    Project1App.prototype.getValuefromInputs = function () {
        var amount = this.getNumberOfInputs();
        this.inputsValueArray = [];
        for (var i = 0; i < amount; i++) {
            var tempId = "input-" + i;
            var inputValue = +document.getElementById(tempId).value;
            this.inputsValueArray.push(inputValue);
        }
    };
    Project1App.prototype.sum = function () {
        var sum = this.inputsValueArray.reduce(function (a, b) { return a + b; }, 0);
        return sum;
    };
    Project1App.prototype.avg = function () {
        var avg = this.getNumberOfInputs() / this.sum();
        return avg;
    };
    Project1App.prototype.max = function () {
        return Math.max.apply(Math, this.inputsValueArray);
    };
    Project1App.prototype.min = function () {
        return Math.min.apply(Math, this.inputsValueArray);
    };
    return Project1App;
}());
var project = new Project1App();
