const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', async () => {
    const APIKey = '18658ef1196149c24d0d30a102469138';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
        const json = await response.json();

        if (json.cod == '404') {
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.humidity span');
        const wind = document.querySelector('.wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'img/clear.png';
                break;

            case 'Rain':
                image.src = 'img/rain.png';
                break;

            case 'Snow':
                image.src = 'img/snow.png';
                break;

            case 'Clouds':
                image.src = 'img/cloud.png';
                break;

            case 'Mist':
                image.src = 'img/mist.png';
                break;

            default:
                image.src = 'img/cloud.png';
                break;
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}<span>km/h</span>`;
    } catch (error) {
        console.error('Error al obtener los datos del clima:', error);
    }
});
