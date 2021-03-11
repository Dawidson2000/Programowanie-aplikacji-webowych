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
    Project1App.prototype.makeInput = function (id) {
        var _this = this;
        var input = document.createElement('input');
        input.type = 'number';
        input.id = "input-" + id;
        input.value = '0';
        input.addEventListener('input', function () { return _this.displayStats(); });
        return input;
    };
    Project1App.prototype.makeButton = function (id) {
        var _this = this;
        var button = document.createElement('button');
        button.innerHTML = "X";
        button.id = "button-" + id;
        button.addEventListener('click', function () { return _this.deleteInput(button); });
        return button;
    };
    Project1App.prototype.deleteInput = function (button) {
        button.parentElement.remove();
        this.numberOfInputs.value = document.getElementById('input-data').childElementCount.toString();
        this.displayStats();
    };
    Project1App.prototype.createInputContainer = function () {
        var container = document.getElementById('input-data');
        container.innerHTML = null;
        this.setDefaultValuesToStats();
        var amount = this.getNumberOfInputs();
        for (var i = 0; i < amount; i++) {
            var inputContainer = document.createElement("div");
            inputContainer.className = "inputContainer";
            container.appendChild(inputContainer);
            inputContainer.appendChild(this.makeInput(i));
            inputContainer.appendChild(this.makeButton(i));
        }
    };
    Project1App.prototype.displayStats = function () {
        this.getValuefromInputs();
        if (document.getElementById('input-data').childElementCount > 0) {
            this.sumInput.value = this.sum().toString();
            this.avgInput.value = this.avg().toString();
            this.maxInput.value = this.max().toString();
            this.minInput.value = this.min().toString();
        }
        else {
            this.sumInput.value = "0";
            this.avgInput.value = "0";
            this.maxInput.value = "0";
            this.minInput.value = "0";
        }
    };
    Project1App.prototype.getNumberOfInputs = function () {
        this.numberOfInputs = document.querySelector("#numberOfInputs");
        var amount = +this.numberOfInputs.value;
        return amount;
    };
    Project1App.prototype.setCreateInputEvent = function () {
        var _this = this;
        this.numberOfInputs = document.querySelector("#numberOfInputs");
        this.numberOfInputs.addEventListener('input', function () { return _this.createInputContainer(); });
    };
    Project1App.prototype.getValuefromInputs = function () {
        var amount = this.getNumberOfInputs();
        this.inputsValueArray = [];
        var inputsList = document.getElementsByClassName('inputContainer');
        for (var i = 0; i < document.getElementById('input-data').childElementCount; i++) {
            this.inputsValueArray.push(+inputsList.item(i).getElementsByTagName('input')[0].value);
        }
    };
    Project1App.prototype.sum = function () {
        var sum = this.inputsValueArray.reduce(function (a, b) { return a + b; }, 0);
        return sum;
    };
    Project1App.prototype.avg = function () {
        var avg = this.sum() / this.getNumberOfInputs();
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
