var latest_races_list = document.getElementById('latest_races_list');
var latest_races_html = '';
var latest_races_count = 3; //define the count you want to show
var latest_races_index = 0; 

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
console.log(today);

function onLoadRunnerInfo(){
  var parameters = location.search.substring(1).split("&"); 
  var temp = parameters[0].split("="); 
  //var runnerId = unescape(temp[1]); 
  var runnerId = "-MMT6shfN4bTHRQY42p9";//for test
  getProfile( runnerId, runnerInfo =>{
    var runnerName = document.getElementById('runnerName');
    var runnerEmail = document.getElementById('runnerEmail');
    var runnerImg = document.getElementById('runnerImg');
    
    runnerImg.setAttribute( "src", runnerInfo.val().profileImg );
    runnerName.textContent = runnerInfo.val().firstName + ' ' + runnerInfo.val().lastName;   
    runnerEmail.textContent = runnerInfo.val().email;   

  } );

  getRacesShowing(runnerId);

}

function getRacesShowing(runnerId)
{
    getRegisterRacesByEventDay( runnerId, snap =>{
      var raceData = snap.val();
      console.log( raceData.eventday );
      if( latest_races_index < latest_races_count ){
        if( raceData.eventday < today ){
          latest_races_index += 1;
          latest_races_html += '<div class="w3-cell-row">' +
                           '<div class="w3-cell" style="width:30%">' +
                            '<img class="w3-circle" src="' + raceData.imagePath + '" style="width:64px;height:64px;">' +
                            '</div>' +
                            '<div class="w3-cell w3-container">' +
                            '<h3><a class="article-title" href="race_detail.html?id=' + snap.key + '">' + raceData.raceName + '</a></h3>' +
                            '<p>'+ raceData.eventday +'</p>' +
                            '</div>' +
                            '</div>' +
                            '<hr>';
          latest_races_list.innerHTML = latest_races_html;
        }
      }
    });
          
}

function change()
{
    var elem = document.getElementById("inviteButton");
    if (elem.value=="Invite to Race") elem.value = "Invite Sent";
    else elem.value = "Invite to Race";
}

function change2()
{
    var elem = document.getElementById("requestButton");
    if (elem.value=="Friend Request") elem.value = "Request Sent";
    else elem.value = "Friend Request";
}


const racesButton = document.querySelector("#races-button");

racesButton.addEventListener("click", () => {
    location.href = "../races/races_map.html";
})

const homeButton = document.querySelector("#home-button");

homeButton.addEventListener("click", () => {
    location.href = "Profile_Main.html";
})
var button = document.querySelector('button');

