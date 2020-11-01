// Write your JavaScript code here!

// DOM code - handles all functionality once it's called in the window load listener
// function init() {

window.addEventListener("load", function() {
	let form = document.querySelector("form");

	form.addEventListener("submit", function(event) {
		event.preventDefault();
	
		let items = document.getElementById('faultyItems');
		let launchStatus = document.getElementById('launchStatus');
		let fuelStatus = document.getElementById('fuelStatus');
		let cargoStatus = document.getElementById('cargoStatus')
		let ready = true;

		let pilotName = document.querySelector("input[name=pilotName]").value;
		let copilotName = document.querySelector("input[name=copilotName]").value;
		let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
		let cargoMass = document.querySelector("input[name=cargoMass]").value;

		if (pilotName === "" || copilotName === "" || fuelLevel === '' || cargoMass === '') {

			alert("All fields are required!");
			items.style.visibility = 'hidden';

			launchStatus.style.color = 'black';
			launchStatus.innerHTML = 'Awaiting Information Before Launch';

		} 
		else if (isNaN(fuelLevel) || isNaN(cargoMass)){
			alert("Make sure to enter valid number");
			items.style.visibility = 'hidden';

			launchStatus.style.color = 'black';
			launchStatus.innerHTML = 'Awaiting Information Before Launch';
		}
		
		 
		else if(!isNaN(pilotName) || !isNaN(copilotName)){
					
			alert("Make sure to enter valid name");
			items.style.visibility = 'hidden';

			launchStatus.style.color = 'black';
			launchStatus.innerHTML = 'Awaiting Information Before Launch';
		}

		else {

			// console.log(typeof(pilotName));
			// console.log(typeof(pilotName));
			items.style.visibility = 'visible';

			document.getElementById('pilotStatus').innerHTML = `Pilot ${ pilotName } Ready`
			document.getElementById('copilotStatus').innerHTML = `Co-pilot ${ copilotName } Ready`

			if (fuelLevel < 10000) {
				ready = false;
				fuelStatus.innerHTML = 'Not enough fuel for launch';
			} else {
				fuelStatus.innerHTML = 'Fuel level high enough for launch';
			}

			if (cargoMass > 10000) {
				ready = false;
				cargoStatus.innerHTML = 'Too much mass for the shuttle to take off';
			} else {
				cargoStatus.innerHTML = 'Cargo mass low enough for launch';
			}

			if (ready) {
				launchStatus.style.color = 'green';
				launchStatus.innerHTML = 'Shuttle is ready for launch';
				retrieveData();
			} else {
				items.style.visibility = 'visible';
				launchStatus.style.color = 'red';
				launchStatus.innerHTML = 'Shuttle not ready for launch';
			}

		}

	});
});

/* This block of code shows how to format the HTML once you fetch some planetary JSON!*/

function retrieveData() {

	fetch('https://handlers.education.launchcode.org/static/planets.json').then( function (response) {
		response.json().then(function (data) {
			let targets = document.getElementById('missionTarget');
			let random = Math.round(Math.random() * data.length);
			let target = data[random];

			targets.innerHTML =
				`<h2>Mission Destination</h2>
				<ol>
				   <li>Name: ${target.name}</li>
				   <li>Diameter: ${target.diameter}</li>
				   <li>Star: ${target.star}</li>
				   <li>Distance from Earth: ${target.distance}</li>
				   <li>Number of Moons: ${target.moons}</li>
				</ol>
				<img src="${target.image}">`


		});
	});

}
