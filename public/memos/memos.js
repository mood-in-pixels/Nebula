/*==================================================================*/
//  MEMOS
/*==================================================================*/
'use strict';
$(function() {
	 
	// Global Variables
	/*-------------------------------------------------- */
	let user_id;
	let username;
	let colorToday;
	let today = moment().format('MM/DD/YYYY');
	let today2 = moment().format("dddd, MMMM Do YYYY")
	
	// Navbar Dropdown
	/*-------------------------------------------------- */
	$(".dropdown-button").dropdown();
	
	// Collapse Memo Collection
	/*-------------------------------------------------- */
	$('.collapsible').collapsible();
	$('.memoList').collapsible('open', 0);
	 
	// $('.modal').modal();
	// $('.modal').modal({
	//     dismissible: true, // Modal can be dismissed by clicking outside of the modal
	//     opacity: .5, // Opacity of modal background
	//     inDuration: 300, // Transition in duration
	//     outDuration: 200, // Transition out duration
	//     startingTop: '4%', // Starting top style attribute
	//     endingTop: '10%', // Ending top style attribute
	//   //   ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
	//   //     alert("Ready");
	//   //     console.log(modal, trigger);
	//   //   },
	//   //   complete: function() { alert('Closed'); } // Callback for Modal close
	//   }
	// );
	// $('#modal1').modal('open');

/*==================================================================*/
//  <--> OPERATIONS <-->
/*==================================================================*/

	//  GET  <- request user ID from DB
	//--------------------------------------------------
	$.get("/api/user_data").then(function(data) {
		user_id = data.id;
		username = data.username;
		console.log(username);
		$(".modal-header").text(username);
		
		$.get("/api/emotions", {
			user_id: user_id
		}).then(function(data) {
			console.log(data)
			for (let i = 0; i < data.length; i++) {
				var emoDateToPush = moment(data[i].Emotion_Date,"YYYY-MM-DD").format("dddd, MMMM Do YYYY");
				console.log(emoDateToPush);
				console.log(today2);
				// if(emoDateToPush === today2){
					colorToday = data[i].Color
					getMemos(colorToday);
				// }
			}
		});
		// GET  <- request user memos from DB
		//--------------------------------------------------
		function getMemos(colorToday){
		$.get("/api/memos", {
			user_id: user_id
		}).then(function(data) {
			let memoDates = []
			for (let i = 0; i < data.length; i++) {
				var memoDateToPush = moment(data[i].Memo_Date,"YYYY-MM-DD").format("dddd, MMMM Do YYYY");

				if(memoDates.includes(memoDateToPush) === true) {
					console.log('nope');
				}
				else {
			    memoDates.push(moment(data[i].Memo_Date,"YYYY-MM-DD").format("dddd, MMMM Do YYYY"));
				}
			    memoDates.push(moment(data[i].Memo_Date,"YYYY-MM-DD").format("M/D/YYYY"));
			    // var memoDate = data[i].Memo_Date;
			    // var memoID = data[i].id;
			    // var memoText = data[i].Memo_Text;
			    // console.log('ID: ' + memoID + ' | ' + memoDate + '  | ' + memoText );
			}
			viewActiveMemos(data, memoDates, colorToday);
			

			// if($.inArray(moment().format("dddd, MMMM Do YYYY"),memoDates)>-1) {
			//   $("#submit-memo").addClass("disabled");
			//   // $(".memo").text('CHECK BACK IN TOMORROW TO LOG ANOTHER MEMO');
			// }
			
		}); 
	};
});
	// Submit Memo
	//--------------------------------------------------
	$(document).on("click", "#submit-memo", function() {
		// when a user submits the memo api request initiated to register memo into DB
		event.preventDefault();
		var memo_text = $('.memo').val();
		var memo_date = today;
		var userData = {
			memo_text: memo_text,
			memo_date: memo_date,
		};
		// after data is captured, api request is submitted via logDailyMemos function
		logDailyMemos(user_id, userData.memo_text, userData.memo_date);
		location.reload();
	});

	// POST -> memos to DB 
	//--------------------------------------------------
	function logDailyMemos(user_id, memo_text, memo_date) {
		$.post("/api/memos", {
			user_id: user_id,
			memo_text: memo_text,
			memo_date: memo_date
		}).then(function() {
			window.location.replace(data);
			// If there's an error, log the error
		}).catch(function(err) {
			console.log(err);
		});
	}

	// Render memos in collapsible component
	//--------------------------------------------------
	function viewActiveMemos(data, memoDates, colorToday) {
		console.log(data);
		console.log(memoDates);
		console.log(colorToday);
		var memoList = $(".memoList").addClass('collapsible popout');
		// var memoDateToPush = moment(data[j].Memo_Date, "YYYY-MM-DD").format("dddd, MMMM Do YYYY")

		
		for (var j = 0; j < data.length; j++) {
			var memoListItems = $("<li>").attr('list-id', data[j].id).addClass('memoListItems indigo lighten-4 z-depth-5');
			
			var memoDateToShow = $('<div class="collapsible-header"><h6 class="memoDate">').html(moment(data[j].Memo_Date, "YYYY-MM-DD").format("dddd, MMMM Do YYYY"));

			var memoTextToShow = $('<div class="collapsible-body"><span class="memoText">').html(data[j].Memo_Text);

			// var btnColor = $("<button class='btn btn-color inline'>").css('background', colorToday);
					// $(".modal-color").append(btnColor);
			// if(emoDateToPush === memoDateToShow){
			// 	console.log('blah!' + emoDateToPush + " " + memoDateToPush)
			// 	memoTextToShow.css('background', colorToday)
			// }
			// else{console.log('blerg!' + emoDateToPush + " " + memoDateToPush)}

			memoListItems.append(memoDateToShow, memoTextToShow);
			memoList.prepend(memoListItems);
		}
	}

	// $(".collapsible-header").on("click", function(){
	// 	var currentMemo = $(this)
	// 	console.log(currentMemo)
	// })
}); // onready closure