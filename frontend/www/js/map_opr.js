  //just for test data
 const races = [
    ["Chicago Marathon", 42.189, -87.93, 4],
    ["Lake 5k", 42.187, -87.96, 5],
    ["DPR 50K", 42.183, -87.93, 3],
    ["KM100Miles", 42.185, -87.94, 2],
    ["July in Christmas", 42.193, -87.77, 1],
  ];


  function loadGPXFileIntoGoogleMap(map, filename) {
    console.log(filename);
    $.ajax({url: filename,
        dataType: "kml",
        success: function(data) {
          var parser = new GPXParser(data, map);
          parser.setTrackColour("#ff0000");
          parser.setTrackWidth(5);
          parser.setMinTrackPointDelta(0.001);
          parser.centerAndZoom(data);
          parser.addTrackpointsToMap();
          parser.addWaypointsToMap();
        }
    });
}

var isSearchRace = false;
var map;

function initMap()
{
    map = new google.maps.Map(document.getElementById("map-canvas"), {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
      mapTypeId: "roadmap",
    });
  
    const image =
              "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
   
      markCurrentLocation();
      //setRoute("https://gaobibo.github.io/2017chickenrun.kml");

      //getRacesForMap();

      searchOnMap();
}

function initMapForId(controlId, kmlFile)
{
    map = new google.maps.Map(document.getElementById(controlId), {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
      mapTypeId: "roadmap",
    });
  
    console.log("initMapForId");
   
    setRouteWithMap(map, kmlFile);
}


  

  function getClickLatLng() {
    
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        document.getElementById("startLatLng").value = mapsMouseEvent.latLng; 
    });
  }

  function setRouteWithMap(map, kmlPath)
  {
    //loadGPXFileIntoGoogleMap(map, "https://googlearchive.github.io/js-v2-samples/ggeoxml/cta.kml");
    //'https://googlearchive.github.io/js-v2-samples/ggeoxml/cta.kml'
    var kmlLayer = new google.maps.KmlLayer(kmlPath);

    kmlLayer.setMap(map);
  }

  function setRoute(kmlPath)
  {
    //loadGPXFileIntoGoogleMap(map, "https://googlearchive.github.io/js-v2-samples/ggeoxml/cta.kml");
    //'https://googlearchive.github.io/js-v2-samples/ggeoxml/cta.kml'
    var kmlLayer = new google.maps.KmlLayer(kmlPath);

    kmlLayer.setMap(map);
  }

  function  setRacesMarker( raceId, raceData)
  {   
        const image =
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";    
        /*
            const image = {
                url:
                "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                //"https://cdn.pixabay.com/photo/2017/09/25/15/37/hurry-up-2785528__340.png",
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(20, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32),
            };
            
            const shape = {
                coords: [1, 1, 1, 20, 18, 20, 18, 1],
                type: "poly",
            };
            */
        var arr = raceData.startLatLng.split(",");
        if( arr.length >= 2 ){
          var lat = parseFloat(arr[0]);
          var lang = parseFloat(arr[1]);
          console.log(lat);
          console.log(lang);
      
          var latlng = new google.maps.LatLng(lat, lang);
  
          
          var marker2 = new google.maps.Marker({
          position: latlng,
          map:map,
          icon: image,
          animation: google.maps.Animation.BOUNCE,
          title: raceData.raceName,
          label: {
              fontWeight: "bold",
              color: "#4bbf6e",
              text:raceData.raceName
              }
          });
          google.maps.event.addListener(marker2, 'click', ()=>{
            setTimeout(function(){
              window.location.replace("../races/race_detail.html?id=" + raceId );
              }, 1000);
          });
        }      

  }

  function setMapCenter(startLatLng){
    var arr = startLatLng.split(",");
    if( arr.length >= 2 ){
      var lat = parseFloat(arr[0]);
      var lang = parseFloat(arr[1]);
      console.log(lat);
      console.log(lang);
      var latLng = new google.maps.LatLng(lat, lang);
  
      map.center = latLng;
      new google.maps.Marker({
              position: latLng,
              map: map,
              draggable: true,
              animation: google.maps.Animation.DROP
          });
    }
  }

  function markCurrentLocation() 
  {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        timeout: 30000
        });     

    function onSuccess(position) {
        var lat = position.coords.latitude;
        var lang = position.coords.longitude;
        console.log(lat);
        console.log(lang);
    
        var myLatlng = new google.maps.LatLng(lat, lang);
        map.center = myLatlng;
        new google.maps.Marker({
                position: myLatlng,
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP
            });
        
    }

    function onError(error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }

    google.maps.event.addDomListener(window, 'load', onSuccess);
  }

  function searchOnMap()
  {

    // Create the search box and link it to the UI element.
    const input = document.getElementById("mapSearch");
    const searchBox = new google.maps.places.SearchBox(input);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      

      
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        // Clear out the old markers.
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];
        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
            if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
            }
            const icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25),
            };
            // Create a marker for each place.
            markers.push(
            new google.maps.Marker({
                map,
                icon,
                title: place.name,
                position: place.geometry.location,
            })
            );

            if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
            } else {
            bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });

  }

  function showRacesMap(map)
  {
      setRacesMarker(map);
  }

  function showRoute(map)
  {
    setRoute(map, "https://gaobibo.github.io/2017chickenrun.kml");
  }
    
  
