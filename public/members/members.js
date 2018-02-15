"use strict";
$(function() {
  // creating global variables that will be populated with authentification check
  var user;
  var user_id;

// authentification request to database
  $.get("/api/user_data").then(function(data) {
    user = data.username
    user_id = data.id




    // request to server to get data from database.
    //Data that is returned contains all user mood entries.
    $.get("/api/emotions", {
      user_id: user_id
    })
    .then(function(data) {
      var emotion_dates = []
      for (var i = 0; i <   data.length; i++) {
          emotion_dates.push(moment(data[i].Emotion_Date,"YYYY-MM-DD").format("M/D/YYYY"))
      }
      // after retrieving data calendar is generated dynamicaly with all user data. default calendar year is 2017
      createCalendar(data,emotion_dates);
      console.log(emotion_dates)
// after retrieving user data, system checks if user has a selection for today. if selection was made, system hides section that allows user to select again.
      if($.inArray(moment().format("M/D/YYYY"),emotion_dates)>-1) {

        $("#colorwheel").addClass("hidden")
      }
    });

// there are two sets of mood pickers, one is presented at the begining if user did not make a selection yet,
// second one is in a form of modal when user clicks on empty cell in calendar
// while database retrieval is happening, this section adds attribute "date" and assigns today's date to it. This helps when submitting data to server.

    // $(".container .picker").attr("date", moment().format("YYYY-MM-DD"))




 // once calendar selection is made this section adds "date" attribute with value that was selected on calendar to modal selector

//     $(document).on("click", "a", function() {
//         console.log($(this).attr("date"))
//         $(".modal-content .picker").attr("date", $(this).attr("date"))
//       });
  });









// GLOBAL VARIABLES + KEY FUNCTIONS
// ===============================================
  var user_id;
// authentification request to database
    $.get("/api/user_data").then(function(data) {
      user_id = data.id
  });

var calendarDate;
var moodArray = ['Irritated', 'Energetic', 'Confident'
, 'Couragious', 'Stressed', 'Anxious', 'Overwhelmed', 'Happy', 'Delighted', 'Fresh'
, 'Content', 'Secure', 'Peaceful', 'Sad', 'Depressed', 'Gloomy', 'Guilty'
, 'Envious', 'Jealous', 'Compassionate', 'Loving', 'Warm'
, 'Frustrated', 'Angry'
]
var positiveEmotion = [false,true,true,true,false,false,false,true,true,true
,false,true,true,false,false,false,false,false,false,true,true,true,false,false
]
// Setting today's date
var today = moment().format('M/D/YYYY');
$(".today").text(today);
$('.dayIn[data-date2="' + today + '"]').addClass('active');
var moodIndex = 0


function createButtons() {
  for (var i = 0; i < 360; i += 15) {
    var drop = $("<button>")
    drop.addClass("btn-drop select")
    drop.attr("id", "d" + i)
    drop.addClass("btn-drop-color")
    drop.attr("date", moment().format("MM/DD/YY"))
    drop.css("background", "hsl(" + i + ", 100%, 50%)")
    drop.attr('mood-data', moodArray[moodIndex])
    drop.attr('positive-emotion', positiveEmotion[moodIndex])
    var moodName = $("<span>");
    // drop.addClass("moodName");
    moodName.addClass("moodName");
    moodName.css("color","hsl(" + i + ", 100%, 50%)");
    moodName.text(moodArray[moodIndex])
    $("#colorwheel").append(moodName)
    $("#colorwheel").append(drop)
    moodIndex++
  };
}


function placeInCircle(ItemClass, ItemLocation, radius) {
  var radius = radius;
  var fields = $('.' + ItemClass),
    container = $('#' + ItemLocation),
    width = container.width(),
    height = container.height();
  var angle = 0,
    step = (2 * Math.PI) / fields.length;
  fields.each(function() {
    var x = Math.round(width / 2 + radius * Math.cos(angle) - $(this).width() / 2);
    var y = Math.round(height / 2 + radius * Math.sin(angle) - $(this).height() / 2);
    if (window.console) {}
    $(this).css({
      left: x + 'px',
      top: y + 'px'
    });
    angle += step;
  });
}


createButtons()
placeInCircle("btn-drop", "colorwheel", 140)
placeInCircle("moodName", "colorwheel", 200)




/// this section converts rgb to hex value for database storage
var hexDigits = new Array
        ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");

//Function to convert rgb color to hex format
function rgb2hex(rgb) {
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
 }


 // when any mood is selected in mood picker this section initiates api request to register items into database
   $(document).on("click", ".select", function() {
     event.preventDefault();
     var emotion = $(this).attr("mood-data")
     var colorRGB =  $(this).css("background-color")
     var colorHEX = rgb2hex(colorRGB)
     var emotion_date = $(this).attr("date");

     var userData = {
       emotion: emotion,
       color: colorHEX,
       emotion_date: emotion_date
     };
 // after data is captured, api request is submitted via below function
    logDailyMood(user_id, userData.emotion, userData.color, userData.emotion_date);
    location.reload();
   });


// function that posts data into database.
  function logDailyMood(user_id, emotion, color, emotion_date) {
    $.post("/api/emotions", {
      user_id: user_id,
      emotion: emotion,
      color: color,
      emotion_date: emotion_date
    })
    .then(function() {
      window.location.replace(data);
      // If there's an error, log the error
    })
    .catch(function(err) {
      console.log(err);
    });
  }






/* ==============================================================================
   CALENDAR SETUP – EST. DAYS / MONTH / YEAR
   ==============================================================================*/


    function createCalendar(data, emotion_dates) {
      console.log(data)
      var element
      var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        monthsNum = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      var year = moment().format('YYYY');

      var moodGraph = document.getElementById('moodGraph');

      for (var i = 0; i < days.length; i++) {
        moodGraph.innerHTML = moodGraph.innerHTML + ('<div class="row cal-row" id="' + months[i] + '"><p>' + months[i].substr(0, 3) + '</p><p>' + year + '</p><div class="inner"></div></div>');
      // Append columns
      for (var h = 0; h < days[i]; h++) {
        // var date = String(i + 1) + '/' + String(h + 1) + '/' + String(2018),
        element = document.getElementById(months[i]).getElementsByClassName('inner')[0];
        calendarDate = (i + 1) + '/' + (h + 1) + '/' + 2018


        if ($.inArray(calendarDate,emotion_dates)>-1) {
          let emotion_index=($.inArray(calendarDate,emotion_dates))
          element.innerHTML = element.innerHTML + ('<div class="day" style="background-color: '+data[emotion_index].Color+'"><span class="dayIn" data-date2="' + calendarDate + '">' + (h + 1) + '</span></div>');
        } else {
          element.innerHTML = element.innerHTML + ('<div class="day"><span class="dayIn" data-date2="' + calendarDate + '">' + (h + 1) + '</span></div>');
        }
      }

      $(".day").click(function() {
        var datadate2 = $(this).children().attr('data-date2');
        console.log('datadate2 ' + datadate2);
        // important: do not change or remove until considering `datadateKids` date format!!

      });
    }
  }

});

