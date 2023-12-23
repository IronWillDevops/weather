
const inputCity = document.getElementById("cityInputLabel");
let  currentLanguage = loadData('selectedLanguage') || 'en';
let currentTempUnit = loadData('selectedTempUnit') || 'сelsius';
const temperatureSelector = document.getElementById('temperatureSelector');
changeTempUnit(currentTempUnit);
temperatureSelector.value= currentTempUnit;



loadImages();

// Функция для получения погоды
function getWeather(type, value) {

   clearInfo();

   let url;
    if (type === 'coordinates') {
        const { latitude, longitude } = value;
        url = `scripts/openweather/openweathermapAPI.php?lat=${latitude}&lon=${longitude}`;
    } else if (type === 'city') {
        if(!value)
        {
        showInfo("Error",  languages[currentLanguage].pleaseEnterCityLabel);
        return;
        }
        const city = encodeURIComponent(value);
        url = `scripts/openweather/openweathermapAPI.php?city=${city}`;

    } else {
        showInfo("Error", languages[currentLanguage].error.invalidTypeLabel);
        return;
    }



     fetch(url)
         .then(handleResponse)
         .then(displayWeatherInfo)
         .catch(handleError);
        inputCity.value = '';
}


function handleResponse(response) {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  }
  function handleError(error) {

        showInfo("Error", languages[currentLanguage].error.couldNotDetermineTheCity);

//showInfo("Error", languages[currentLanguage].error.couldNotDetermineTheCity);
    console.error('Error fetching weather data:', error);
    // Выводите содержимое ошибки, чтобы понять, что пришло с сервера

}




// Функция для определения местоположения
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, handleGeoLocationError);
    } else {
      showInfo("Error", languages[currentLanguage].error.geolocationIsNotSupportedLabel);
    }
  }

  function showPosition(position) {
    getWeather('coordinates', { latitude: position.coords.latitude, longitude: position.coords.longitude });
  }
  // Обработчик ошибки геолокации
function handleGeoLocationError(error) {
    showInfo("Error", languages[currentLanguage].error.unableRetrieveYourLocationLabel);
 }


 function displayWeatherInfo(data) {
  const { name: city, main, wind, weather, sys, coord} = data;
  const { temp: temperature, feels_like: feelslike, humidity, pressure } = main;
  const { speed: windSpeed } = wind;

  const { lat, lon } = coord;
  const { country } = sys;
  const { description, icon } = weather[0];
  const weatherIconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

  const weatherDescription = description.toLowerCase().replace(/ /g, '_');
  const translatedWeatherDescription = languages[currentLanguage].weatherDescriptions[weatherDescription] || weatherDescription;
  const cityName=`${city}, ${country}`;


  const temperatureSelector = document.getElementById('temperatureSelector');

  document.getElementById('weatherIcon').src=weatherIconUrl;
  document.getElementById('cityNameLabel').textContent = `${cityName}`;
  document.getElementById('weatherDescriptionLabel').textContent = `${translatedWeatherDescription}`;

  document.getElementById('temperatureValueLabel').textContent = `${convertTemperature(temperature, temperatureSelector.value)} ${getTemperatureSymbol(currentTempUnit)}` ;
  document.getElementById('feelsLikeValueLabel').textContent = `${convertTemperature(feelslike, temperatureSelector.value)} ${getTemperatureSymbol(currentTempUnit)}` ;

  document.getElementById('windSpeedValueLabel').textContent = `${windSpeed} ${convertWindSpeed()}` ;
  document.getElementById('humidityValueLabel').textContent = `${humidity} %`;
  document.getElementById('pressureValueLabel').textContent = `${pressure} hPa`;
  document.getElementById('coordValueLabel').innerHTML = `<a href="https://www.google.com.sa/maps/@${lat},${lon},12z?entry=ttu" target="_blank">${lat}, ${lon}</a>`;


loadImages(`${city}`);
    var block = document.getElementById('weatherBlock');
        block.style.display = 'block';
  }



function convertWindSpeed(){
let result;

 currentLanguage = loadData('selectedLanguage') || 'en';
  switch (currentLanguage) {
    case 'ru':
      result = 'м/с';
break;
    case 'en':
      result = 'm/s';
break;
    default:
      result =  'м/с';
break;
  }

return result;

}

// Функция для конвертации температуры в выбранные единицы измерения
function convertTemperature(temp, unit) {
let result
  switch (unit) {
    case 'сelsius':
      result = temp;
break;
    case 'fahrenheit':
      result = (temp * 9/5) + 32;
break;
    case 'kelvin':
      result = temp + 273.15;
break;
    default:
      result = temp;
break;
  }
return result.toFixed(2);
}

// Функция для получения символа единицы измерения температуры
function getTemperatureSymbol(unit) {
  switch (unit) {
    case 'сelsius':
      return '°C';
    case 'fahrenheit':
      return '°F';
    case 'kelvin':
      return 'K';
    default:
      return '';
  }
}




function clearInfo()
{

}

function showInfo(type, message) {
 createNotification(type,message);
}
function loadImages(value) {

    if (!value) {
        value = "city";
    }
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${value}')`;
}

function saveData(key, value) {
    localStorage.setItem(key, value);
}

function loadData(key) {
     return  localStorage.getItem(key);
}

function changeTempUnit(value){
saveData("selectedTempUnit",value);
currentTempUnit=value;
}


// Уведомление
        let notificationCount = 0;
        function createNotification(title, message) {
            if (notificationCount < 3) {
                notificationCount++;

                const notificationContainer = document.querySelector('.notification-container');

                const notification = document.createElement('div');
                notification.className = 'notification';

                notification.innerHTML = `
                    <div class="notification-subject">${title}</div>
<span class="notification-close" onclick="closeNotification(this.parentElement)"><i class="fa-solid fa-xmark"></i></span>
                    <p>${message}</p>
                    <div class="notification-progress">
                        <div class="notification-progress-bar"></div>
                    </div>
                `;

                notificationContainer.appendChild(notification);

                // Анимация появления
                setTimeout(() => {
                    notification.style.display = 'block';
                }, 100);

                // Анимация прогресса (пример с интервалом 1 сек)
                let progress = 100;
                const progressBar = notification.querySelector('.notification-progress-bar');
                const intervalId = setInterval(() => {
                    progress--;
                    progressBar.style.width = `${progress}%`;

                    if (progress === 0) {
                        clearInterval(intervalId);
                        closeNotification(notification);
                    }
                }, 50);
            }
        }

        function closeNotification(notification) {
                notification.remove();
                notificationCount--;

        }


