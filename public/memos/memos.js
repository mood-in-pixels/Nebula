/*==================================================================*/
//  MEMOS
/*==================================================================*/
'use strict';
$(function() {
	
	// Global Variables
	/*-------------------------------------------------- */
	let user_id;
	let today = moment().format('MM/DD/YYYY');
	
	// Navbar Dropdown
	/*-------------------------------------------------- */
	$(".dropdown-button").dropdown();
	
	// Collapse Memo Collection
	/*-------------------------------------------------- */
	$('.collapsible').collapsible();
	$('.memoList').collapsible('open', 0);
	

/*==================================================================*/
//  <--> OPERATIONS <-->
/*==================================================================*/

	//  GET  <- request user ID from DB
	//--------------------------------------------------
	$.get("/api/user_data").then(function(data) {
		user_id = data.id;

		// GET  <- request user memos from DB
		//--------------------------------------------------
		$.get("/api/memos", {
			user_id: user_id
		}).then(function(data) {
			let memoDates = []
			for (let i = 0; i < data.length; i++) {
			    memoDates.push(moment(data[i].Memo_Date,"YYYY-MM-DD").format("dddd, MMMM Do YYYY"));
			    memoDates.push(moment(data[i].Memo_Date,"YYYY-MM-DD").format("M/D/YYYY"))
			}
			viewActiveMemos(data, memoDates);

			if($.inArray(moment().format("M/D/YYYY"),memoDates)>-1) {
			  $("#submit-memo").addClass("disabled");
			  // $(".memo").text('CHECK BACK IN TOMORROW TO LOG ANOTHER MEMO');
			}
			
		});
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
	function viewActiveMemos(data, memoDates) {
		console.log(data);
		var memoList = $(".memoList").addClass('collapsible popout');

		for (var j = 0; j < data.length; j++) {
			var memoListItems = $("<li>").attr('list-id', data[j].id).addClass(
				'memoListItems indigo lighten-4 z-depth-5')
			
			var memoDateToShow = $('<div class="collapsible-header"><h6 class="memoDate">').html(moment(data[j].Memo_Date, "YYYY-MM-DD").format("dddd, MMMM Do YYYY"));

			var memoTextToShow = $('<div class="collapsible-body"><span class="memoText">').html(data[j].Memo_Text);
			memoListItems.append(memoDateToShow, memoTextToShow);
			memoList.prepend(memoListItems);
		}
	}


}); // onready closure