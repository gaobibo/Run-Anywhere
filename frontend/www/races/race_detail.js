
var raceId;
function getCurrentRace()
{
    var parameters = location.search.substring(1).split("&"); 
	var temp = parameters[0].split("="); 
    raceId = unescape(temp[1]); 
    console.log(raceId);
    getRace(raceId);
    
}

function registerRace()
{
    
    addRegistear(raceId);
    
}


function setContent(raceData)
{
    console.log(raceData.raceName);
    var raceName = raceData.raceName;
    var raceDescription = raceData.raceDescription;
    var imagePath = raceData.imagePath;
    var eventday = raceData.eventday;
    var capactity = raceData.capactity;
    var distance = raceData.distance;
    var gpxFile = raceData.gpxFile;
    var startdttm = raceData.startdttm;
    var startLatLng = raceData.startLatLng;
    var isOpen = raceData.isOpen;
    document.getElementById("raceLogo").setAttribute("src", imagePath);
    document.getElementById("raceName").innerHTML= raceName;
    document.getElementById("capactity").innerHTML = "Capactity:" + capactity;
    document.getElementById("distance").innerHTML = "Distance:" + distance;
    document.getElementById("eventTime").innerHTML = eventday + "  " + startdttm;
    document.getElementById("raceDescription").innerHTML = raceDescription;

    setRoute( gpxFile );
}