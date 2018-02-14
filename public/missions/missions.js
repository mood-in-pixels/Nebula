$(document).ready(function() {
	$(".dropdown-button").dropdown();
	$('.tap-target').tapTarget('open');
	$(".instruction").click(function() {
		$('.tap-target').tapTarget('open');
	});
	$(".icon-btn").click(function() {
		var mission = $(this).attr('data-mission');
		console.log('Mission Selected ------ ' + mission)
		var $toastContent = $('<span>' + mission + ' added!</span>').add($('<button data-mission=' + mission + ' class=" btn-flat undoMission toast-action">UNDO</button>'));
		Materialize.toast($toastContent, 10000);
	});
}); // closure