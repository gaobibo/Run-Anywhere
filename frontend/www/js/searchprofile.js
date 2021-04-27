var latest_races_list = document.getElementById('latest_races_list');
var latest_races_html = '';
var latest_races_count = 2; //define the count you want to show
var latest_races_index = 0; 

var latest_more_races_html = '';

var upcoming_races_list = document.getElementById('upcoming_races_list');
var upcoming_races_html = '';
var upcoming_races_count = 2; //define the count you want to show
var upcoming_races_index = 0; 

var upcoming_more_races_html = '';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
console.log(today);

var parameters = location.search.substring(1).split("&"); 
var temp = parameters[0].split("="); 
var runnerId = unescape(temp[1]); 
//var runnerId = "-MMT6shfN4bTHRQY42p9";//for test


function onLoadRunnerInfo(){
  
  getProfile( runnerId, runnerInfo =>{
    var runnerName = document.getElementById('runnerName');
    var runnerEmail = document.getElementById('runnerEmail');
    var runnerImg = document.getElementById('runnerImg');
    
    runnerImg.setAttribute( "src", runnerInfo.val().profileImg );
    runnerName.textContent = runnerInfo.val().firstName + ' ' + runnerInfo.val().lastName;   
    runnerEmail.textContent = runnerInfo.val().email;   

  } );

  isFollowed(  runnerId, function(isFollowed){
    var elem = document.getElementById("requestButton");
    if (isFollowed) {
      
      elem.value = "UnFollow";
    }
    else {
     
      elem.value = "Follow";
    }
  });

  getRacesShowing(runnerId);

}

function getRacesShowing(runnerId)
{
    var isLoading = true; 
    loading('Please wait...');
    getRegisterRacesByEventDay( runnerId, function(raceSnap, participantSnap){
      var raceData = raceSnap.val();
      console.log( raceData.eventday );

      if( raceData.eventday < today ){
        var pastrace_html  = '<div class="w3-cell-row">' +
            '<div class="w3-cell" style="width:30%">' +
            '<img class="w3-circle" src="' + raceData.imagePath + '" style="width:64px;height:64px;">' +
            '</div>' +
            '<div class="w3-cell w3-container">' +
            '<h3><a class="article-title" href="../races/race_detail.html?id=' + raceSnap.key + '">' + raceData.raceName + '</a></h3>' +
            '<p>'+ participantSnap.val().finisheddistance +' Miles: '+ participantSnap.val().finishedtime +'</p>' +
            '</div>' +
            '</div>' +
            '<hr>';
        if( latest_races_index < latest_races_count ){
            latest_races_index += 1;
            latest_races_html += pastrace_html;
            latest_races_list.innerHTML = latest_races_html;
            if( isLoading ){
              closeLoading();
              isLoading = false;
            }
        }
        else{
          latest_more_races_html += pastrace_html;  

        }
      }else{
        var upcomingrace_html  = '<div class="w3-cell-row">' +
              '<div class="w3-cell" style="width:30%">' +
              '<img class="w3-circle" src="' + raceData.imagePath + '" style="width:64px;height:64px;">' +
              '</div>' +
              '<div class="w3-cell w3-container">' +
              '<h3><a class="article-title" href="../races/race_detail.html?id=' + raceSnap.key + '">' + raceData.raceName + '</a></h3>' +
              '<p>'+ raceData.eventday +'</p>' +
              '</div>' +
              '</div>' +
              '<hr>';

        if( upcoming_races_index < upcoming_races_count ){
          upcoming_races_index += 1;
          upcoming_races_html += upcomingrace_html;
          upcoming_races_list.innerHTML = upcoming_races_html;
          if( isLoading ){
            closeLoading();
            isLoading = false;
          }
        }
        else{
          upcoming_more_races_html += upcomingrace_html;
        }
      }
         
    });
    setTimeout( function(){
      if( isLoading ){
        closeLoading();
        isLoading = false;
       }
      }, 3000);
    
}

function onMoreLessPast(){
  var morelesspast = document.getElementById("morelesspast");
  if(morelesspast.innerHTML == "expand_more") 
  {
    latest_races_list.innerHTML += latest_more_races_html;
    morelesspast.innerHTML = "expand_less";
  }
  else{
    latest_races_list.innerHTML = latest_races_html;
    morelesspast.innerHTML = "expand_more";
  }
  

}

function onMoreLessUpcomming(){

  var morelessupcomming = document.getElementById("morelessupcomming");
  if(morelessupcomming.innerHTML == "expand_more") 
  {
    upcoming_races_list.innerHTML += upcoming_more_races_html;
    morelessupcomming.innerHTML = "expand_less";
  }
  else{
    upcoming_races_list.innerHTML = upcoming_races_html;
    morelessupcomming.innerHTML = "expand_more";
  }
  
}

function goBack() {
  window.history.back();
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
    if (elem.value=="Follow") {
      addFollow( runnerId );
      elem.value = "UnFollow";
    }
    else {
      Unfollow( runnerId );
      elem.value = "Follow";
    }
}


const racesButton = document.querySelector("#races-button");

racesButton.addEventListener("click", () => {
    location.href = "../races/races_map.html";
})

const homeButton = document.querySelector("#home-button");

homeButton.addEventListener("click", () => {
    location.href = "../profile/Profile_Main.html";
})
var button = document.querySelector('button');


const peopleButton = document.querySelector("#people-button");

 peopleButton.addEventListener("click", () => {
     location.href = "../people/follows_main.html";
 })