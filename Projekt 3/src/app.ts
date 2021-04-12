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
        if(city && (this.cityTab.find(el => el === city) === undefined))
            return true;
        else
            return false;
    }

    async addCity(city: string) {
        
        if(this.checkInputValue(city)){           
            const weather = await this.getWeather(city);
            this.renderCityContainer(weather);
            
            this.cityTab.push(city);
            console.log(this.cityTab);

            this.saveData(this.cityTab);
        }
    }

    renderCityContainer(cityWeather: any) {
        const container = document.getElementById('cities');

        let cityContainer = document.createElement('div');
            cityContainer.innerText = `${cityWeather.name}: ${cityWeather.main.temp}`;
            container.appendChild(cityContainer);
    }
         
    saveData(data: any) {
        localStorage.setItem('cityTab', JSON.stringify(data));
    }
    
    getData() {
        const data = JSON.parse(localStorage.getItem('cityTab'));
    
        if(data.length > 0){
            data.forEach((city: string) => {
                this.addCity(city);
            })
        }
    }
}