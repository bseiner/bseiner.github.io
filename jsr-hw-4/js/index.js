var cheeses = ["provolone", "mozz"];
var names = ["Jess", "Kat", "Molly", "Bailey"];
var dogs = [];

document.getElementById('formSubmit').onclick = orderPizza;

function orderPizza() {
	var topping = document.getElementById('toppings').value;
	console.log(topping);
	document.getElementByID("addmore").style.visibility = visible;
    return false;
}

// add a click handler for the #selectToppings button
// add a click handler for the #addmore button

function placeOrder( ) {
  // show the 'addmore' and 'done' and console.log a message that talks about the dog.
  // add the dog message to the array
}

function finishHandler() {
  // list out all orders
}

// add a click handler for the #done button