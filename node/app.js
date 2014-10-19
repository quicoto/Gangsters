var Firebase = require('firebase');

	// I've tried to loop through different users but something weird happens with Node.js and Firebase. I think there's an issue with the non-blocking code, it goes through before it can get the data. Need to look into it.

	// For now I'll hardcode just the 2 users

	function addMaterials(){

			var Ricard = new Firebase('https://gangsters.firebaseio.com/0');

			Ricard.once('value', function(data) {

			 	Ricard.update({alcohol : data.val().alcohol + (10 * data.val().buildings.distillery),guns : data.val().guns + (10 * data.val().buildings.smuggler),money : data.val().money + (10 * data.val().buildings.laundry)});
			});

			var Felman = new Firebase('https://gangsters.firebaseio.com/1');

			Felman.once('value', function(data) {

			Felman.update({alcohol : data.val().alcohol + (10 * data.val().buildings.distillery),guns : data.val().guns + (10 * data.val().buildings.smuggler),money : data.val().money + (10 * data.val().buildings.laundry)});
			});

			console.log('Materials updated');
	}


	var intervalID = setInterval(addMaterials, 5000);
