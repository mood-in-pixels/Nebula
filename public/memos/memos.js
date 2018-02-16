 // $(document).ready(function() {
	"use strict";
	$(function() {
	  // let user;
	let user_id;
	// let active_memos =[];
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
	

	// $(".icon-btn").click(function() {
	// 	var mission = $(this).attr('data-mission');
	// 	console.log('Mission Selected ------ ' + mission)
	// 	var $toastContent = $('<span>' + mission + ' added!</span>').add($('<button data-mission=' + mission + ' class=" btn-flat undoMission toast-action">UNDO</button>'));
	// 	Materialize.toast($toastContent, 10000);
	// });



	// authentification request to database
	  $.get("/api/user_data").then(function(data) {
	    // user = data.username
	    user_id = data.id

	    // Request sent to server to retrieve user's active missions from database.
	    $.get("/api/memos", {
	      user_id: user_id
	    })
	    .then(function(data) {
	    	let active_memos = [];
	      for (let i = 0; i < data.length; i++) {
	          active_memos.push(data[i].Memo_Text);
	      }
	          viewActiveMemos(data, active_memos);

	    });
	      
	  });

	 
	// GLOBAL VARIABLES + KEY FUNCTIONS
	// ===============================================

	// Setting today's date
	var today = moment().format('MM/DD/YYYY');

	 // when any mood is selected in mood picker this section initiates api request to register items into database
	   $(document).on("click", "#submit-memo", function() {
	   	var memoText = $('.memo').val();
	   	
	   	// if(!memoText){
	   	// 	$('.memo').attr('placeholder', 'Please enter text in the appropriate fields before submitting your memo.')
	   	// }
	   	

	   	console.log('memoText--- ' + memoText)
	     event.preventDefault();
	     var memo_text = memoText;
	     var memo_date = today;
	    
	     var userData = {
	       memo_text: memo_text,
	       memo_date: memo_date
	     };
	 // after data is captured, api request is submitted via below function
	    logDailyMemos(user_id, userData.memo_text, userData.memo_date);
	    location.reload();
	    // $('.tap-target').tapTarget('close');
	   });


	// function that posts data into database.
	  function logDailyMemos(user_id, memo_text, memo_date) {
	    $.post("/api/memos", {
	      user_id: user_id,
	      memo_text: memo_text,
	      memo_date: memo_date
	    })
	    .then(function() {
	      window.location.replace(data);
	      // If there's an error, log the error
	    })
	    .catch(function(err) {
	      console.log(err);
	    });
	  }



function viewActiveMemos(data, active_memos){
	console.log(data);
	var memoList = $("<ul class='staggeredList'>").addClass('memoList')
	$(".activeMemos").append(memoList);
	for (var j= 0; j < data.length; j++){
		var memo1 = data[j].Memo_Text
		var memo2 = data[j].Memo_Date
		memo2 = moment(memo2, "YYYY-MM-DD").format('MM/DD/YYYY');
		var memos1 = $('<li class="memo2">').text(memo2)
		var memos2 = $('<li class="memo1">').text(memo1)

		$(".memoList").append(memos1), memos2);

	}
// add code to push to active missions row on missions.html!
// also add functionality to be able to remove missions if desired!
}
}); // closure 