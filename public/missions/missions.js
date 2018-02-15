$(document).ready(function() {
	
	// Dropdown Tagret for NavBar
	$(".dropdown-button").dropdown();
	
	// Tap Target Instruction
	$('.tap-target').tapTarget('open');
	$(".instruction").click(function() {
		$('.tap-target').tapTarget('open');
	});
	// $(".icon-btn").click(function() {
	// 	var mission = $(this).attr('data-mission');
	// 	console.log('Mission Selected ------ ' + mission)
		
	// });

	// global variable to grab user_id from db and sync with data
	  var user_id;

	// authentification request to database
	  	$.get("/api/user_data").then(function(data) {
	    	user_id = data.id
		});

	   $(".icon-btn").click(function() {
	     event.preventDefault();
	     var missionId = $(this).attr("data-mission");
	     var missionResult =  $(this).attr("data-state");
	     var missionDate = $(this).attr("date");

	     var $toastContent = $('<span>' + missionId + ' added!</span>').add($('<button data-mission=' + missionId + ' class=" btn-flat undoMission toast-action">UNDO</button>'));
	     Materialize.toast($toastContent, 10000);

	     var missionData = {
	       mission_id: missionId,
	       mission_result: missionResult,
	       mission_date: missionDate
	     };
	 // after data is captured, api request is submitted via below function
	    logDailyMission(user_id, missionData.mission_id, missionData.mission_result, missionData.mission_date);
	    location.reload();
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
	      getDailyMission(user_id)
	      // If there's an error, log the error
	    })
	    .catch(function(err) {
	      console.log(err);
	    });
	  }

	 function getDailyMission(user_id) {
	   $.get("/api/missions", {
	     user_id: user_id
	   })
	   .then(function(data) {
	     console.log(data);
	     // If there's an error, log the error
	   })
	   .catch(function(err) {
	     console.log(err);
	   });
	 }



}); // closure