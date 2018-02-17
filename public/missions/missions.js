 // $(document).ready(function() {
	"use strict";
	$(function() {
	  // let user;
	  let user_id;

	// navbar dropdown
	$(".dropdown-button").dropdown();

	// instructional feature discovery
	// $('.tap-target').tapTarget('open');
	$(".instruction").click(function() {
		if ($('.tap-target').tapTarget('open')){
			$('.tap-target').tapTarget('close');
		}
		else {$('.tap-target').tapTarget('open');}
	});



// authentification request to database
  $.get("/api/user_data")
  .then(function(data) {
    // user = data.username
    user_id = data.id

    // Request sent to server to retrieve user's active missions from database.
    $.get("/api/active_missions", {
      user_id: user_id
    })
    .then(function(data) {
      let active_missions = [];
      for (let i = 0; i < data.length; i++) {
      	if (data[i].Mission_Result == true){
          active_missions.push(data[i].Mission_id)
      	}
      }
        markActiveMissions(data,active_missions);
    });


  });



	// GLOBAL VARIABLES + KEY FUNCTIONS
	// ===============================================

	// Setting today's date
	var today = moment().format('MM/DD/YYYY');

	 // when any mood is selected in mood picker this section initiates api request to register items into database
   $(document).on("click", ".icon-btn", function() {
     event.preventDefault();
     var mission_id = $(this).attr("data-mission")
     var mission_result =  $(this).attr("data-state");
     var mission_date = today;

     var $toastContent = $('<span>' + mission_id + ' added!</span>').add($('<button data-mission=' + mission_id + ' class=" btn-flat undoMission toast-action">UNDO</button>'));
     Materialize.toast($toastContent, 10000);

    // onclick="undoMission(' +mission_id+');"
    // function undoMission(mission_id){
    // $(this).attr("data-state", "inactive");
    // };

     var userData = {
       mission_id: mission_id,
       mission_result: mission_result,
       mission_date: mission_date,
     };
 // after data is captured, api request is submitted via below function
    logDailyMission(user_id, userData.mission_id, userData.mission_result, userData.mission_date);
    location.reload();
    // $('.tap-target').tapTarget('close');
   });






   $(document).on("click", ".btn-join", function() {
     event.preventDefault();
     var mission_id = $(this).attr("data-mission")
     var activation_date = today;

     var userData = {
       mission_id: mission_id,
       activation_date: mission_date,
     };

     ActivateMission(user_id,userData.mission_id, userData.activation_date)

     console.log(mission_id)
     // $("#"+mission_id ".joined").addClass("hidden")
     // $("#"+mission_id ".join").addClass("hidden")



   });





	// function that posts data into database.
  function logDailyMission(user_id, mission_id, mission_result, mission_date) {
    $.post("/api/missions", {
      user_id: user_id,
      mission_id: mission_id,
      mission_result: mission_result,
      mission_date: mission_date
    })
    .then(function() {
      window.location.replace(data);
      // If there's an error, log the error
    })
    .catch(function(err) {
      console.log(err);
    });
  }



  function ActivateMission(user_id, mission_id, activation_date) {
    $.post("/api/active_missions", {
      user_id: user_id,
      mission_id: mission_id,
      activation_date: activation_date
    })
    .then(function() {
      window.location.replace(data);
      // If there's an error, log the error
    })
    .catch(function(err) {
      console.log(err);
    });
  }

	function markActiveMissions(data, active_missions){
		console.log(data);
	// add code to push to active missions row on missions.html!
	// also add functionality to be able to remove missions if desired!
	}
}); // closure
