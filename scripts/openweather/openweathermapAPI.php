<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $apiKey = "YOUR_API"; // Замените на свой API-ключ
    if (isset($_GET["lat"]) && isset($_GET["lon"])) {
        $url = "https://api.openweathermap.org/data/2.5/weather?lat={$_GET["lat"]}&lon={$_GET["lon"]}&units=met>
    }
    elseif(isset($_GET["city"]))
    {
        $url = "https://api.openweathermap.org/data/2.5/weather?q={$_GET["city"]}&units=metric&appid={$apiKey}";
    }
else
    {
        die("Некорректные параметры запроса");
    }
    header('Content-Type: application/json');
    $weatherData = file_get_contents($url);
echo $weatherData;
}
?>
