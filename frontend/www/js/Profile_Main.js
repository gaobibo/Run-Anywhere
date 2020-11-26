function onLoadMyInfo(){    
    //getProfile(  "-MMT6shfN4bTHRQY42p9", snapshot =>{
    getMyProfile(  snapshot =>{
      console.log( snapshot.val());
      
      var runnerName = document.getElementById('runnerName');
      var runnerEmail = document.getElementById('runnerEmail');
      var runnerImg = document.getElementById('runnerImg');

      runnerName.textContent = snapshot.val().firstName + ' ' + snapshot.val().lastName;   
      runnerEmail.textContent = snapshot.val().email;   
      runnerImg.setAttribute( "src", snapshot.val().profileImg );

    });
    getMyRacesShowing();
  }

  var latest_races_list = document.getElementById('latest_races_list');
  var latest_races_html = '';
  var latest_races_count = 2; //define the count you want to show
  var latest_races_index = 0; 

  var upcoming_races_list = document.getElementById('upcoming_races_list');
  var upcoming_races_html = '';
  var upcoming_races_count = 2; //define the count you want to show
  var upcoming_races_index = 0; 

  var past_races_list = document.getElementById('past_races_list');
  var past_races_html = '';
  var past_races_count = 2;
  var past_races_index = 0; 

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  console.log(today);

  function getMyRacesShowing()
    {   

      getMyRacesByEventday( snap =>{
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
            return;
          }
        }

        if( upcoming_races_index < upcoming_races_count ){
          if( raceData.eventday > today ){
            upcoming_races_index += 1;
            upcoming_races_html += '<div class="w3-cell-row">' +
                             '<div class="w3-cell" style="width:30%">' +
                              '<img class="w3-circle" src="' + raceData.imagePath + '" style="width:64px;height:64px;">' +
                              '</div>' +
                              '<div class="w3-cell w3-container">' +
                              '<h3><a class="article-title" href="race_detail.html?id=' + snap.key + '">' + raceData.raceName + '</a></h3>' +
                              '<p>'+ raceData.eventday +'</p>' +
                              '</div>' +
                              '</div>' +
                              '<hr>';
            return;
          }
        }


        if( past_races_index < past_races_count ){
          if( raceData.eventday < today ){
            past_races_index += 1;
            past_races_html += '<div class="w3-cell-row">' +
                             '<div class="w3-cell" style="width:30%">' +
                              '<img class="w3-circle" src="' + raceData.imagePath + '" style="width:64px;height:64px;">' +
                              '</div>' +
                              '<div class="w3-cell w3-container">' +
                              '<h3><a class="article-title" href="race_detail.html?id=' + snap.key + '">' + raceData.raceName + '</a></h3>' +
                              '<p>'+ raceData.eventday +'</p>' +
                              '</div>' +
                              '</div>' +
                              '<hr>';
            return;
          }
        }

        latest_races_list.innerHTML = latest_races_html;
        upcoming_races_list.innerHTML = upcoming_races_html;
        past_races_list.innerHTML = past_races_html;
      });
            
    }
    
    
const racesButton = document.querySelector("#races-button");

racesButton.addEventListener("click", () => {
    location.href = "../races/races_map.html";
})

const homeButton = document.querySelector("#home-button");

homeButton.addEventListener("click", () => {
    location.href = "Profile_Main.html";
})
