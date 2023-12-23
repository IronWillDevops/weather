const input = document.getElementById("cityInputLabel");

input.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("getWeatherBtn").click();
  }
});
