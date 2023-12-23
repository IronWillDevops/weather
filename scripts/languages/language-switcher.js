// Здесь вы должны иметь доступ к вашему объекту languages, который предоставлен вами.
loadSavedLanguage();
// Функция для смены языка
function changeLanguage(languageId) {
    // Проверка, существует ли выбранный язык в объекте languages
    if (languages[languageId]) {
        const language = languages[languageId];
        // установка язіка по умолчанию
        document.getElementById('languageSelector').value = languageId;
        // Применение переводов ко всем элементам интерфейса
        document.getElementById('getWeatherLabel').innerHTML = language.getWeatherLabel;


        document.getElementById('temperatureLabel').innerHTML = language.temperatureLabel;
        document.getElementById('feelsLikeLabel').innerHTML = language.feelsLikeLabel;
        document.getElementById('windSpeedLabel').innerHTML = language.windSpeedLabel;
        document.getElementById('humidityLabel').innerHTML = language.humidityLabel;
        document.getElementById('pressureLabel').innerHTML = language.pressureLabel;
        document.getElementById('settingLabel').innerHTML = language.settingLabel;

        document.getElementById('settingLabel').innerHTML = language.settingLabel;
        document.getElementById('setting1Label').innerHTML = language.settingLabel;

        document.getElementById('languageLabel').innerHTML = language.languageLabel;
        document.getElementById('temperatureUnitLabel').innerHTML = language.temperatureUnitLabel;

        document.getElementById('coordLabel').innerHTML = language.coordinates;

        // Продолжайте этот процесс для всех элементов интерфейса

        // Пример для текстового поля с идентификатором 'pleaseEnterCity'
        document.getElementById('cityInputLabel').placeholder = language.cityInputLabel;
        savedLanguage('selectedLanguage', languageId);
        // Вы также можете применить переводы к другим атрибутам элементов, к примеру, 'title', 'alt', и т.д.
        // Сохранение выбранного языка в localStorage

    } else {
        console.error('Выбранный язык не поддерживается.');
    }
}
function savedLanguage(key, value) {
    localStorage.setItem(key, value);
}
function loadSavedLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';


    // Если язык не был сохранен, можно установить язык по умолчанию
    changeLanguage(savedLanguage); // Установите свой язык по умолчанию
}
