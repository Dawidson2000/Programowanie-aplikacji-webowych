export class App {
    opwApiKey = '97e3198fe1d705d4cd61ff117b4231b2';
    //50d53005c0fd5f556bb4ef15224c4209
    //97e3198fe1d705d4cd61ff117b4231b2

    cityTab: string[] = [];

    constructor() {
        this.setButtonEvent();
        this.getData();
        
        setInterval( () => {
            this.refreshWeather();
        }, 100000);
    }

    refreshWeather(){
        document.getElementById('cities').innerText = null;
        this.cityTab = [];
        this.getData()
    }
    
    showErrorMessage(message: string){
        const errorContainer = document.getElementById("errorContainer");
        errorContainer.classList.add('visible');
        errorContainer.innerText = message;
        
        setTimeout(() => errorContainer.classList.remove('visible'), 3500);
    }

    async getWeather(city: string): Promise<any> {
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.opwApiKey}`;
        const weatherResponse = await fetch(openWeatherUrl);
        if(!weatherResponse.ok){
            this.showErrorMessage("Nie znaleziono miasta!");
        }
        const weatherData = await weatherResponse.json();
        return weatherData;
    }

    setButtonEvent() {
        document.getElementById('cityButton').addEventListener('click', () => this.addCity(this.getCityInputValue()));
    }
    
    getCityInputValue(): string{
        const cityInput: HTMLInputElement = document.querySelector('#cityInput'); 
             
        return cityInput.value;       
    }
    
    showExistedCity(container: HTMLElement){
        container.classList.add('existedCity');
        setTimeout(() => container.classList.remove('existedCity'), 1000);
    }

    checkInputValue(city: string): boolean {
        if(city && (this.cityTab.find(el => el === city.toLowerCase()) === undefined))
            return true;
        else{
            this.showExistedCity(document.getElementById(city.toLowerCase()));
            this.showErrorMessage("Podane miasto zostało już dodane!");
            return false;
        }
    }

    async addCity(city: string) {
        if(city){
            const weather = await this.getWeather(city);
            if(weather.name){
                if(this.checkInputValue(city)){   
                    this.renderCityContainer(weather, city.toLowerCase());
                    
                    this.cityTab.push(city.toLowerCase());
                    console.log(this.cityTab);

                    this.saveData(this.cityTab);
                }
            }
        }
    }

    removeCity(btn: HTMLButtonElement){
        btn.parentElement.remove();
        this.cityTab.splice(this.cityTab.indexOf(btn.parentElement.id), 1);
        console.log(this.cityTab);
        this.saveData(this.cityTab);
    }

    renderCityContainer(cityWeather: any, city: string) {
        const container = document.getElementById('cities');
        console.log(cityWeather);

        const cityContainer = document.createElement('div');
            cityContainer.className = 'card';
            cityContainer.id = `${city}`;

        const deleteBtn = document.createElement('button')
            deleteBtn.className = 'deleteBtn';
            deleteBtn.addEventListener('click', () => this.removeCity(deleteBtn))
            deleteBtn.innerText = "X";
            cityContainer.appendChild(deleteBtn);
        
        const cityName = document.createElement('h1');
            cityName.innerText = `${cityWeather.name}`;
            cityName.className = 'cityName';
            cityContainer.appendChild(cityName);

        const temp = document.createElement('span');
            temp.innerText = `${(cityWeather.main.temp- 273.15).toFixed(1)}°C`;
            temp.className = 'temp';
            cityContainer.appendChild(temp);
            
        const description = document.createElement('span');
            description.innerText = `${cityWeather.weather[0].main}`;
            description.className = 'description';
            cityContainer.appendChild(description);

        const line = document.createElement('div');
            line.className = 'line';
            cityContainer.appendChild(line);

        const mainWeather = document.createElement('span');
            mainWeather.innerText = `Wilgotność: ${cityWeather.main.humidity}%`;
            mainWeather.className = 'mainWeather';
            cityContainer.appendChild(mainWeather);

        const humidity = document.createElement('span');
            humidity.innerText = `Ciśnienie: ${cityWeather.main.pressure} hPA`;
            humidity.className = 'mainWeather';
            cityContainer.appendChild(humidity);

        const line2 = document.createElement('div');
            line2.className = 'line';
            cityContainer.appendChild(line2);
  
        const windIcon = document.createElement('div');
            const iconWind = document.createElement('i');
                iconWind.className = "icon-wind";
                windIcon.appendChild(iconWind);
            windIcon.className = 'wind';
            cityContainer.appendChild(windIcon);
        
        const windSpeed = document.createElement('span');
            windSpeed.innerText = `Prędkość: ${cityWeather.wind.speed} m/s`;
            windSpeed.className = 'windDescription';
            cityContainer.appendChild(windSpeed);
            
        const windDirection = document.createElement('span');
            windDirection.innerText = `Kierunek: ${cityWeather.wind.deg}°`;
            windDirection.className = 'windDescription2';
            cityContainer.appendChild(windDirection);

        container.prepend(cityContainer);
              
    }
        
    saveData(data: any) {
        localStorage.setItem('cityTab', JSON.stringify(data));
    }
    
    getData() {
        const data = JSON.parse(localStorage.getItem('cityTab'));
        
        if(data.length > 0 && data){
            data.forEach((city: string) => {
                this.addCity(city);
            })
        }        
    }
}