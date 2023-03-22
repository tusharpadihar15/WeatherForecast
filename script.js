
saveinput = () => {
    var city = document.getElementById('input').value;
    var date = document.getElementById('date').value;
    const weatherinfo = document.querySelector('.weatherinfo');

    // getting latitude and longitude from city code 
    const request = new XMLHttpRequest();
    request.open('GET', `https://geocode.maps.co/search?q=${city}`);
    request.send();

    request.addEventListener('load', function () {

        // console.log(this.responseText);
        const [data] = JSON.parse(this.responseText);
        // console.log(data)
        let lat = (Math.floor(data.lat));
        let lon = (Math.floor(data.lon));

        const generateWeather = async () => {

            try {
                const setHeader = {
                    headers: {
                        Accept: "application/json"
                    }
                }
                const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&forecast_days=14`, setHeader);
                const finaldata = await res.json();
                // console.log(finaldata);
                const time = "00:00";
                const search = date + "T" + time;

                function convertUTCDateToLocalDate(date) {
                    var newDate = new Date(date.getTime());
                    var hours = date.getHours();
                    newDate.setHours(hours);
                    return newDate;
                }

                var index = ((finaldata.hourly.time).indexOf(search));
                weatherinfo.innerHTML = "";
                for (var i = index; i < index + 24; i++) {
                    var space = i;
                    // weatherinfo.innerHTML += (`Temperature and Humidity on ${(convertUTCDateToLocalDate(new Date(finaldata.hourly.time[i]))).toLocaleString()} in ${city} will be ${finaldata.hourly.temperature_2m[i]}${finaldata.hourly_units.temperature_2m} & ${finaldata.hourly.relativehumidity_2m[i]}${finaldata.hourly_units.relativehumidity_2m}` + "<br><br>");

                    weatherinfo.innerHTML += (`<br>On ${(convertUTCDateToLocalDate(new Date(finaldata.hourly.time[i]))).toLocaleTimeString('en-US')} TEMPERATURE: ${finaldata.hourly.temperature_2m[i]}${finaldata.hourly_units.temperature_2m} , HUMIDITY: ${finaldata.hourly.relativehumidity_2m[i]}${finaldata.hourly_units.relativehumidity_2m}<br>`);
                }
            }

            catch (err) {
                console.log(`The error is ${err}`);
            }

        }
        generateWeather();
    }
    )
}
