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

var newsletterRecipients = [];

var askLocation = function(event){
	if (event.code == 'Enter') {
		var location = document.getElementById("chatInput").value.toLowerCase();
		logDaveText(event, location);
		document.getElementById("chatInput").value = "";
		if(location == "pick for me")
		{
			var keys = Object.keys(Locations);
			var location = keys[ keys.length * Math.random() << 0];
			document.getElementById("hal").innerHTML += 'We think you should explore ' +location+'<br>';
		}

		var contains = false;
		for (var i in Locations) {
  			if (i == location) { 
      			document.getElementById("hal").innerHTML +=  location + ' - ' +Locations[location] + '<br>';
      			document.getElementById("hal").innerHTML += 'Enter another location or say "pick for me" <br>';
      			contains = true;
  			} 
		}
		if (!contains)
		{
			document.getElementById("hal").innerHTML += 'I actually don\'t know anything about ' + location +'<br>';
			askClassmate(location);
		}
	event.returnValue = false;
	}
}

var askClassmate = function(location){
	num = Math.floor((Math.random() * classmates.length) + 1);
	classmate = classmates[num];
	document.getElementById("hal").innerHTML +='Maybe your classmate ' + classmate + ' knows about ' + location + '<br>';
}

var askNewsletter = function(event){
	if (event.code == 'Enter') {
		var yesno = document.getElementById("chatInput").value;
		logDaveText(event, yesno);
		document.getElementById("chatInput").value = "";
		switch(yesno){
			case 'yes':
				{
					document.getElementById("chatInput").removeEventListener("keypress", askNewsletter);
	    			document.getElementById("hal").innerHTML +='Great!! What\'s your email?<br>';
	    			document.getElementById("chatInput").addEventListener("keypress", askEmail);
	    		}
	    		break;
	    	case 'no':
		    	{
		    		document.getElementById("chatInput").removeEventListener("keypress", askNewsletter);
		    		document.getElementById("hal").innerHTML +='That\'s ok! Type in a destination you\'re intersted in <br>';
		    		document.getElementById("hal").innerHTML +='If you want us to pick a destination for you, type "pick for me" <br>';
		    		document.getElementById("chatInput").addEventListener("keypress", askLocation);
		    	}
		    	break;
		    default:
		    	document.getElementById("hal").innerHTML += "Please enter yes or no <br>";
		    	break;
		}
		event.returnValue = false;
	}
}

var askEmail = function(event){
	if (event.code == 'Enter') {
		var email = document.getElementById("chatInput").value;
		logDaveText(event, email);
		document.getElementById("chatInput").value = "";
		if(/.com/.test(email))
		    {
		    	if(newsletterRecipients.indexOf(email) >= 0)
		    		document.getElementById("hal").innerHTML +='Ah you\'re already signed up!<br>';
		    	else
		    	{
		    		newsletterRecipients.push(email);
		    		document.getElementById("hal").innerHTML +='Congrats you\'ve signed up for my newsletter!<br>';
		    	}
		    	document.getElementById("chatInput").removeEventListener("keypress", askEmail);
		    	document.getElementById("hal").innerHTML +='What travel destination do you want to learn about today?<br>';
		 		document.getElementById("hal").innerHTML +='If you want us to pick a destination for you, type "pick for me" <br>';
		 		document.getElementById("chatInput").addEventListener("keypress", askLocation);
		 }
		 else
		 {
		 	document.getElementById("hal").innerHTML +='Please enter a valid email address<br>';
		 }
		 event.returnValue = false;
	}
}


// invoke the opening message
var respondToDave = function(event) {
	if (event.code == 'Enter') {
		var text = document.getElementById("chatInput").value;
	    logDaveText(event, text);
	    document.getElementById("chatInput").value = "";

	    document.getElementById("chatInput").removeEventListener("keypress",respondToDave);
	    document.getElementById("hal").innerHTML +='I\m glad you\'re feeling ' + text + '<br>';
	    document.getElementById("hal").innerHTML +='Do you want to sign up for our newsletter? yes/no<br>';
	    document.getElementById("chatInput").addEventListener("keypress", askNewsletter);

	    if(text.includes("clear"))
	    {
	    	document.getElementById("hal").innerHTML = "";
	    	document.getElementById("dave").innerHTML = "";
	    }
	    event.returnValue = false;
    }
    return false;
}

function logDaveText(event, daveText)
{
	t = daveText + ' <br>';
	document.getElementById("dave").innerHTML += t;
}


window.onload = function() {
	// create a function for HAL to open the chat with "Good morning, Dave"
	document.getElementById("hal").innerHTML +='Welcome to TravelBuddy! How are you feeling today? <br>';
	// add an event listener to the form to submit Dave's message

	document.getElementById("chatInput").addEventListener("keypress", respondToDave);

};