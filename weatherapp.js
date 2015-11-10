function getPosition()
    
        {
        if(navigator.geolocation)
        {
           // Call getCurrentPosition with success and failure callbacks
           navigator.geolocation.getCurrentPosition(getCoords);
           
        }
        else
        {
           alert("Please enable geolocation on your browser to see the local weather.");
        }

     }
     
     function getCoords(position)
     {

         var lon = position.coords.longitude;
         var lat = position.coords.latitude;
         var weather = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=dff03ebb9b7af623b70f1389918cddb9';
                  
          $.getJSON(weather,function(json){
            
            JSON.stringify(json);
            
            document.getElementById("city").innerHTML = (json.name);
            document.getElementById("description").innerHTML =(json.weather[0].description);
            
            var far_temp = (json.main.temp - 273.15) * 1.8000 + 32.00
            far_temp = far_temp.toFixed(2);
            var cel_temp = json.main.temp - 273.15
            cel_temp = cel_temp.toFixed(2);
            
            document.getElementById("temp").innerHTML = far_temp + decodeURI('%C2%B0') + " F";
            
            $("button").click(function(){
                
                if (document.getElementById("temp").innerHTML == far_temp + decodeURI('%C2%B0') + " F")
                    document.getElementById("temp").innerHTML = cel_temp + decodeURI('%C2%B0') + " C";
                else{
                   document.getElementById("temp").innerHTML = far_temp + decodeURI('%C2%B0') + " F";
                }   
            });
             
            
            if (json.weather[0].description == "Sky is Clear") {
                $('#icon').css('background-image','url("http://icons.wxug.com/i/c/j/sunny.gif")');
            }
            else if (json.weather[0].description == "light rain") {
                $('#icon').css('background-image','url("http://icons.wxug.com/i/c/j/rain.gif")');
            }
            else if (json.weather[0].description == "overcast clouds" || json.weather[0].description == "scattered clouds") {
                $('#icon').css('background-image','url("http://icons.wxug.com/i/c/j/cloudy.gif")');
            }
            else if (json.weather[0].description == "haze" || json.weather[0].description == "mist") {
                $('#icon').css('background-image','url("http://icons.wxug.com/i/c/j/fog.gif")');
            }
    
            else{
                $('#icon').css('background-image','url("http://icons.wxug.com/i/c/j/sunny.gif")');
            }
            
            document.getElementById("humidity").innerHTML = "Humidity: " + json.main.humidity + " %";
            document.getElementById("pressure").innerHTML = "Pressure: " + json.main.pressure + " mb";
            
         });

}

getPosition();
  