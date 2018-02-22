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

			}
			viewActiveMemos(data, memoDates, colorToday);

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
			console.log("memo recorded");
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

			memoListItems.append(memoDateToShow, memoTextToShow);
			memoList.prepend(memoListItems);
		}
	}



	function seedMemos(){
		logDailyMemos(user_id, 'I wonder what this new year will bring. 2017 were not so great to me' , '1/1/2018')
		logDailyMemos(user_id, 'What a great book, I finally finished it.' , '1/3/2018')
		logDailyMemos(user_id, 'I feel great. I volunteered today at a dog shelter. Things are looking good.' , '1/7/2018')
		logDailyMemos(user_id, 'My dog died… :(' , '1/11/2018')
		logDailyMemos(user_id, 'I miss my dog. :(' , '1/13/2018')
		logDailyMemos(user_id, 'I spent 2 hours looking at my dogs pictures. I miss him... I have so many great memories to treasure.' , '1/15/2018')
		logDailyMemos(user_id, 'Busy Busy Busy day….' , '1/19/2018')
		logDailyMemos(user_id, 'Saturday!!!!!!!! I finally caught up on my sleep.' , '1/20/2018')
		logDailyMemos(user_id, 'I met my old friend from high school. ' , '1/25/2018')
		logDailyMemos(user_id, 'I cant believe January is almost over. Only 2 more months of winter…' , '1/31/2018')
		logDailyMemos(user_id, 'Yoga class was amazing…' , '2/5/2018')
		logDailyMemos(user_id, 'Started new mission… I will try drink less soda… wish me luck future me.' , '2/4/2018')
		logDailyMemos(user_id, 'All these skinny people… ' , '2/6/2018')
		logDailyMemos(user_id, 'Finally I am seeing results of my time spent at the gym. I feel great' , '2/13/2018')
		logDailyMemos(user_id, 'I helped people today…' , '2/15/2018')
		logDailyMemos(user_id, 'OMG this app is great. Thank you NEBULA… ;)' , '2/18/2018')
		logDailyMemos(user_id, 'Heroku is not working, lets see what tomorrow brings…' , '2/23/2018')


	}



	$(document).on("click", "#seed", function() {
	  seedMemos()
	})









}); // onready closure
