
/*
h5util.js
// For discussion and comments, see: http://remysharp.com/2009/01/07/html5-enabling-script/
*/
var addEvent=function(){return document.addEventListener?function(e,n,t){if(e&&e.nodeName||e===window)e.addEventListener(n,t,!1);else if(e&&e.length)for(var o=0;o<e.length;o++)addEvent(e[o],n,t)}:function(e,n,t){if(e&&e.nodeName||e===window)e.attachEvent("on"+n,function(){return t.call(e,window.event)});else if(e&&e.length)for(var o=0;o<e.length;o++)addEvent(e[o],n,t)}}();!function(){var e=document.createElement("pre");e.id="view-source",addEvent(window,"click",function(n){if("#view-source"==n.target.hash){if(!document.getElementById("view-source")){var t=new XMLHttpRequest;t.onreadystatechange=function(){4==this.readyState&&200==this.status&&(e.innerHTML=this.responseText.replace(/[<>]/g,function(e){return{"<":"&lt;",">":"&gt;"}[e]}),prettyPrint())},document.body.appendChild(e),t.open("GET",window.location,!0),t.send()}document.body.className="view-source";var o=setInterval(function(){"#view-source"!=window.location.hash&&(clearInterval(o),document.body.className="")},200)}})}();


function online(event) {
    
    if('onLine' in navigator){
        if(!navigator.onLine){
            //<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            $('body').append('<div id="noConnectionMsg" class="alert alert-warning alert-dismissible noConnectionMsg" role="alert"><strong><i class="fa fa-signal"></i></strong> No Internet connectivity.</div>');
        }
        else{
            $('#noConnectionMsg').remove();
        }   
    }

}

addEvent(window, 'online', online);
addEvent(window, 'offline', online);

online({ type: 'ready'});


$(document).ready(function() {

    $(document).on('click', "#searchBtn", function(){
        $("#searchBox").slideToggle("fast", function(){
			$(".content").toggleClass("top-space");
			$(this).find('input').focus();

		});		
        
        if($(this).find('i').hasClass('fa-search')){
            $(this).find('i').removeClass('fa-search');
            //$(this).find('i').addClass('fa-search-minus');
            $(this).find('i').addClass('fa-eye-slash');
        }
        else{
            //$(this).find('i').removeClass('fa-search-minus');
            $(this).find('i').removeClass('fa-eye-slash');
            $(this).find('i').addClass('fa-search');

            /* Important to empty the value to re-populate the people list records */
            $('#autoCompleteSearch').val('');
            $('#autoCompleteSearch').trigger('change');

            var minLength = $( "#autoCompleteSearch" ).val().length;
            console.log(minLength);

            if(minLength === 0){
                  angular.bind(this, function(nameFilter){
                    return this.nameFilter = '';
                });
            }
        }
    });
	
	
	$('.jsChartGridToggle').on('click', function(){
		
		var me = $(this), faElement = me.find('.fa'), graphEle = $('#graphContainer'), metricsTableEle = $('#metricsTableContainer');
		
		if(faElement.hasClass('fa-table')){			
			me.find('.fa').removeClass('fa-table').addClass('fa-bar-chart');
			
			//Hide Graph Container show Metrics Table Container
			graphEle.addClass('hide');
			metricsTableEle.removeClass('hide');
		}else{
			me.find('.fa').removeClass('fa-bar-chart').addClass('fa-table');
			
			metricsTableEle.addClass('hide');
			graphEle.removeClass('hide');		
		}
	});


	//Whenever modal is shown callback of show to align model in center of screen

    $(document).on('show.bs.modal', '.modal', centerModal);
    $(window).on("resize", function () {
        $('.modal:visible').each(centerModal);
    });


});

/* Center bootstrap modal */
function centerModal() {
    $(this).css('display', 'block');
    var $dialog  = $(this).find(".modal-dialog"),
    offset       = ($(window).height() - $dialog.height()) / 2,
    bottomMargin = parseInt($dialog.css('marginBottom'), 10);

    // Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
    if(offset < bottomMargin) offset = bottomMargin;
    $dialog.css("margin-top", offset);
}


//Date Compontent Start-->

// Multi Checkbox List End -->

// TOGGLE DIV

function toggler(divClass) {
    $("." + divClass).toggle();
}

//$('a[data-toggle="tooltip"]').tooltip('toggle');

/* If modal is visible and user press space bar or enter key dismiss the modal */
/*$(window).keypress(function(e){
    if((e.which == 13 && $('.modal.in').is(':visible')) || (e.keyCode == 32 && $('.modal.in').is(':visible'))){
    	
    	//$('.modal.in').modal('hide');
    	$('.modal.in').find('button').trigger('click');
    }
});*/

//Formate Date function for date to post to server
function formatDateToServer(date){
	if(date && date != 'undefined'){
		
		var splitDateArray, getFromDate, getFromMonth, getFromYear;

		splitDateArray = date.split('-');


		getFromDate = splitDateArray[0];
		getFromMonth = splitDateArray[1] - 1;
		getFromYear = splitDateArray[2];

		var formattedDate = new Date(getFromYear, getFromMonth, getFromDate); //oLD WAY

		//var custDate = new Date(getFromYear, getFromMonth, getFromDate);
		//var formattedDate = new Date(custDate.getTime() - custDate.getTimezoneOffset()*60000); // timezone offset causing date saved one day off!
		

		return formattedDate;
	}
}
function getDate_Edit(dt) {
    var startDateString = new Date(dt)  ;
    var month = formatDate(startDateString.getMonth() + 1);
    var date = formatDate(startDateString.getDate());
    var year = startDateString.getFullYear();   
        var fullDate = date + "-" + month + "-" + year; 
    return fullDate;
}
function formatDate(value){
    if(value<10){
        return value='0'+value;
    }
    else{
        return value;
    }
}

function columnHeight() {

    var w = $(window).innerHeight();
    var d = $(document).innerHeight();
    var s = $('.secondary-col').innerHeight();
    var p = $('.primary-col').innerHeight();
    var h = $('header.navbar-fixed-top').innerHeight();
    var f = $('footer .navbar-fixed-bottom').height();

    var primaryCol = $('.primary-col'),
        secondaryCol = $(".secondary-col");

    var pHeight = w - (h + f - 5);

    primaryCol.css({
        height: pHeight,
        border: '0px solid red'
    });
    secondaryCol.css({
        height: pHeight,
        border: '0px solid yellow'
    });
}


$(window).on('load resize', function() {
    columnHeight();
});

