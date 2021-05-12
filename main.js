var map;
var marker;
function initMap() {
  marker = new google.maps.Marker();
  
  const myLatLng = { lat: 49.233061, lng: 28.484002 };

  var infowindow = new google.maps.InfoWindow({  });

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 9,
    center: myLatLng,
  });
 
  map.addListener('click', (e) => {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+e.latLng.lat()+"&lon="+e.latLng.lng()+"&appid=1b5ee5a1a74d624a74750350327ea372")
    .then(function (response){
        return response.json();
    })
    .then(function (json){
      var t = parseInt(json.main.temp-273.15);
      infowindow.setContent(
        "<img src='http://openweathermap.org/img/wn/"+json.weather[0].icon+".png' alt='картинка'>"+
        "<h1>"+
          json.weather[0].description+
        "</h1>"+
        "<h1>"+
          "clouds "+json.clouds.all+ "%"+
        "</h1>"+
        "<h1>"+
          "humidity "+json.main.humidity+ "%"+
        "</h1>"+

        "<h1>"+
          "t = "+t.toString()+"&#8451\n"+
        "</h1>");
      marker.setMap(null);
      marker = new google.maps.Marker({
        position: e.latLng,
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 0
      }
      });
      infowindow.open(map, marker);
    });    
  });  
}
