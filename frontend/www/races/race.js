
/*
fetchRaces() {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http
          .get<{ [key: string]: race }>(
            `https://mjrace-4b10f.firebaseio.com/races.json?auth=${token}`//http://192.168.181.128:1234/races'
        );
      }),
      map(resData => {
        const races = [];//this._races2;
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            races.push(
              new race(
                key,
                resData[key].name,
                resData[key].description,
                resData[key].imagePath,
                resData[key].eventday,
                resData[key].startdttm,
                resData[key].capactity,
                resData[key].distance,
                resData[key].userId,
                resData[key].isOpen
              )
            );
          }
        }
        //return races;
        return orderBy(races,"eventday", "asc" );
        //return races.sort((val1, val2)=> {
        //  return new Date(val1.eventday) - new Date(val2.eventday)});
      }),
      tap(races => {
        this._races.next(races);
      })
    );
  }
*/

//just for test data
const races = [
    ["Chicago Marathon", 42.189, -87.93, 4],
    ["Lake 5k", 42.187, -87.96, 5],
    ["DPR 50K", 42.183, -87.93, 3],
    ["KM100Miles", 42.185, -87.94, 2],
    ["July in Christmas", 42.193, -87.77, 1],
  ];

  function initAutocomplete() 
  {
    const map = new google.maps.Map(document.getElementById("map-canvas"), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
        mapTypeId: "roadmap",
      });
    setRacesMarker( );

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        timeout: 30000
        });     

    function onSuccess(position) {
        var lat = position.coords.latitude;
        var lang = position.coords.longitude;
    
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

    function  setRacesMarker( )
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

            for (let i = 0; i < races.length; i++) {
                const race = races[i];
                var marker2 = new google.maps.Marker({
                position: { lat: race[1], lng: race[2] },
                map:map,
                icon: image,
                //shape: shape,
                animation: google.maps.Animation.BOUNCE,
                title: race[0],
                label: {
                    fontWeight: "bold",
                    color: "#4bbf6e",
                    text:race[0]
                    }
                });
                marker2.addListener("click", raceDetail);
            }
    }

    function raceDetail() {
        setTimeout(function(){
            window.location.replace("../races/race_detail.html");
        }, 1000);
    }

    google.maps.event.addDomListener(window, 'load', onSuccess);

    
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
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

