var API_KEY  = 'a5e12802056cc4ee1a2188bd9ef7e557';

function findCity(){
    let city = document.querySelector('#city').value;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`, true);
    xhr.onload = function(){
        
        switch(xhr.status){
            case 200:
            let data = JSON.parse(xhr.responseText);
            validateWeatherIcon(data);
            document.querySelector('header h1').innerHTML = `${data['name']} - ${data['sys']['country']}`;
            document.querySelector('figure figcaption').innerHTML = `${data['weather'][0]['description']}`;
            let temperature = kelvinToCelsius(data['main']['temp']);
            document.querySelector('#temperature').innerHTML = `${temperature.toFixed(2)}°C`;
            let tempMin = kelvinToCelsius(data['main']['temp_min']);
            document.querySelector('#temp_min').innerHTML = `${tempMin.toFixed(2)}°C`;
            let tempMax = kelvinToCelsius(data['main']['temp_max']);
            document.querySelector('#temp_max').innerHTML = `${tempMax.toFixed(2)}°C`;
            document.querySelector('#umidade').innerHTML = `${data['main']['humidity']}%`;
            let velVento = mpsToKmph(data['wind']['speed']);
            document.querySelector('#vento').innerHTML = `${velVento.toFixed(0)}Km/h`
            break;
            case 400:
                alert('Digite uma cidade para buscar');
            break;
            case 404:
                alert('Cidade não encontrada, tente novamente.');
            break;
        }
    }
    xhr.send();
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function mpsToKmph(mps) {
    return mps * 3.6;   
}
  
function validateWeatherIcon(data){

    switch(data['weather'][0]['main']){
        case 'Clouds':
            document.querySelector('img').src = '/img/clouds-fill.svg';
        break;
        case 'Clear':
            document.querySelector('img').src = '/img/brightness-high-fill.svg';
        break;
        case 'Rain':
            document.querySelector('img').src = '/img/cloud-drizzle-fill.svg';
        break;
        default:
            document.querySelector('img').src = '/img/back-ground.svg';
        break;
    }
}