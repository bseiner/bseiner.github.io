var classmates = ["Mark", "Rebecca", "Sonyl", "Bryan D.", "Bryan A", "Caroyln", "Christie", "Courtney", "David", "Derek", "Elaine", 
"Ellen", "Emily", "Joe", "JoeW", "Kenneth", "Liana", "Morris", "Richard", "Zach"];

var Locations  = {
	'paris' : "Go see the Eiffle Tower!",
	'iceland' : "You should backpack the Laugavegur Trail!",
	'chile' : "You should go see the streets of Valparaiso!",
	'lake tahoe' : "Go shred squaw mountain!",
	'florida' : "Go see my parents in Siesta Key!",
	'utah' : 'Are you brave enough to hike Angel\'s Landing?',
};

//define my global variables
var newsletterRecipients = [];
var $halText = $("#hal");
var $daveText = $("#dave");
var $chatInput = $("#chatInput");

function askLocation(event) {
	if (event.which == 13) {
		event.preventDefault();
		var location = $chatInput.val().toLowerCase();
		logDaveText(event, location);
		$chatInput.val('');
		if(location == "pick for me")
		{
			var keys = Object.keys(Locations);
			var location = keys[ keys.length * Math.random() << 0];
			$halText.append('We think you should explore ' +location+'<br>' );
		}

		var contains = false;
		for (var i in Locations) {
  			if (i == location) { 
      			$halText.append(location + ' - ' +Locations[location] + '<br>' );
      			$halText.append('Enter another location or say "pick for me" <br>');
      			contains = true;
  			} 
		}
		if (!contains)
		{
			$halText.append('I actually don\'t know anything about ' + location +'<br>');
			askClassmate(location);
		}
	event.returnValue = false;
	}
};

var askClassmate = function(location){
	num = Math.floor((Math.random() * classmates.length) + 1);
	classmate = classmates[num];
	$halText.append('Maybe your classmate ' + classmate + ' knows about ' + location + '<br>');
};

function askNewsletter(event) {
	if (event.which == 13) {
		event.preventDefault();
		var yesno = $chatInput.val();
		logDaveText(event, yesno);
		$chatInput.val('');
		switch(yesno){
			case 'yes':
				{
					$("#chatInput").off('keypress');
	    			$halText.append('Great!! What\'s your email?<br>');
	    			$("#chatInput").on('keypress', function(event) {
						askEmail(event)
					});
	    		}
	    		break;
	    	case 'no':
		    	{
		    		$("#chatInput").off('keypress');
		    		$halText.append('That\'s ok! Type in a destination you\'re intersted in <br>');
		    		$halText.append('If you want us to pick a destination for you, type "pick for me" <br>');
		    		$("#chatInput").on('keypress', function(event) {
						askLocation(event)
					});
		    	}
		    	break;
		    default:
		    	document.getElementById("hal").innerHTML += "Please enter yes or no <br>";
		    	break;
		}
		event.returnValue = false;
	}
};

function askEmail(event) {
	if (event.which == 13) {
		event.preventDefault();
		var email = document.getElementById("chatInput").value;
		logDaveText(event, email);
		$chatInput.val('');
		if(/.com/.test(email))
		  	{
		    	if(newsletterRecipients.indexOf(email) >= 0)
		    		$halText.append('Ah you\'re already signed up!<br>');
		    	else
		    	{
		    		newsletterRecipients.push(email);
		    		$halText.append('Congrats you\'ve signed up for my newsletter!<br>');
		    	}
		    	$("#chatInput").off('keypress');
		    	$halText.append('What travel destination do you want to learn about today?<br>');
		 		$halText.append('If you want us to pick a destination for you, type "pick for me" <br>');
	    		$("#chatInput").on('keypress', function(event) {
					askLocation(event)
				});
		 	}
		 else
		 	{
		 		$halText.append('Please enter a valid email address<br>');
		 	}
	}
	event.returnValue = false;
};


// invoke the opening message
function respondToDave(event)  {
	if(event.which == 13){
		event.preventDefault();
		var text = $chatInput.val();
	    logDaveText(event, text);
	    $chatInput.val('');

	    $("#chatInput").off('keypress');
	    $halText.append('I\'m glad you\'re feeling ' + text );
	    $halText.append('. Do you want to sign up for our newsletter? yes/no<br>');

	    $("#chatInput").on('keypress', function(event) {
			askNewsletter(event)
		});
	    if(text.includes("clear"))
	    {
	    	$halText.val('');
	    	$daveText.val('');
	    }
	    event.returnValue = false;
    }
    return false;
};

function logDaveText(event, daveText)
{
	t = daveText + ' <br>';
	$daveText.append(t);
};


$(document).ready(function() {
	// create a function for HAL to open the chat with "Good morning, Dave"
	$halText.html("Welcome to TravelBuddy! How are you feeling today? <br>");
	
	// add an event listener to the form to submit Dave's message
	$("#chatInput").on('keypress', function(event) {
		respondToDave(event)
	});
});


