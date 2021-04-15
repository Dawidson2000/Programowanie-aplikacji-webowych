export class App {
    opwApiKey = 'aeb41085d1ec0c2e19555ebec96e8f97';

    cityTab: string[] = [];

    constructor() {
        this.setButtonEvent();
        this.getData();
    }

    async getWeather(city: string): Promise<any> {
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.opwApiKey}`;
        const weatherResponse = await fetch(openWeatherUrl);
        const weatherData = await weatherResponse.json();
        //console.log(weatherData);
        return weatherData;
    }

    setButtonEvent() {
        document.getElementById('cityButton').addEventListener('click', () => this.addCity(this.getCityInputValue()));
    }
    
    getCityInputValue(): string{
        const cityInput: HTMLInputElement = document.querySelector('#cityInput'); 
        
        if(cityInput.value)
            return cityInput.value;
        else 
            return '';    
    }

    checkInputValue(city: string): boolean {
        if(city && (this.cityTab.find(el => el === city.toLowerCase()) === undefined))
            return true;
        else
            return false;
    }

    async addCity(city: string) {
        const weather = await this.getWeather(city);
        
        if(weather.name){
        
            if(this.checkInputValue(city)){                      
                this.renderCityContainer(weather);
                
                this.cityTab.push(city.toLowerCase());
                console.log(this.cityTab);

                this.saveData(this.cityTab);
            }
        }
    }

    renderCityContainer(cityWeather: any) {
        const container = document.getElementById('cities');
        console.log(cityWeather);

        const cityContainer = document.createElement('div');
            cityContainer.className = 'card';
        
        const cityName = document.createElement('div');
            cityName.innerText = `${cityWeather.name}`;
            cityName.className = 'cityName';
            cityContainer.appendChild(cityName);

        const temp = document.createElement('div');
            temp.innerText = `${(cityWeather.main.temp- 273.15).toFixed(1)}°C`;
            temp.className = 'temp';
            cityContainer.appendChild(temp);
            
        const description = document.createElement('div');
            description.innerText = `${cityWeather.weather[0].main}`;
            description.className = 'description';
            cityContainer.appendChild(description);

        const line = document.createElement('div');
            line.className = 'line';
            cityContainer.appendChild(line);

        const mainWeather = document.createElement('div');
            mainWeather.innerText = `Wilgotność: ${cityWeather.main.humidity}%`;
            mainWeather.className = 'mainWeather';
            cityContainer.appendChild(mainWeather);

        const humidity = document.createElement('div');
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
        
        const windSpeed = document.createElement('div');
            windSpeed.innerText = `Prędkość: ${cityWeather.wind.speed} m/s`;
            windSpeed.className = 'windDescription';
            cityContainer.appendChild(windSpeed);
            
        const windDirection = document.createElement('div');
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
    
        if(data){
            if(data.length > 0 && data){
                data.forEach((city: string) => {
                    this.addCity(city);
                })
            }
        }
    }
}