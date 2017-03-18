  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDRtviqkS9VR6r1optCRyMj5AJYkORjwII",
    authDomain: "project-1-9878a.firebaseapp.com",
    databaseURL: "https://project-1-9878a.firebaseio.com",
    storageBucket: "project-1-9878a.appspot.com",
    messagingSenderId: "1040735242149"
  };
  firebase.initializeApp(config);

var database = firebase.database();



  var updateTime = function(){
  	var now = moment().format('hh:mm');
  	$('#currentTime').html(now);
  }

  $(document).ready(function(){
    updateTime();
    setInterval(updateTime, 1000);
});

  /*******************************************/

$('#submit').on('click', function(){

	// User Information
	var trainName = $('#trainName').val().trim();
	var destination = $('#destination').val().trim();
	var firstTrain = $('#firstTrain').val().trim();
	var frequency = $('#frequency').val().trim();

	// New Train
	var newTrain = {
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	}    // What time would the next train be...? (Use your brain first)


	
	database.ref().push(newTrain);

	$('#trainName').val('');
	$('#destination').val('');
	$('#firstTrain').val('');
	$('#frequency').val('');

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    currentTime = JSON.stringify(moment());



    var tFrequency = $('#frequency').val('');

    var firstTime = $('#firstTrain').val('');
    console.log(firstTime);

    firstTimeConverted = moment(newTrain.firstTrain, "hh:mm").subtract(1,'years');
    firstTimeConverted = JSON.stringify(moment());
    console.log(firstTimeConverted);

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    newTrain.diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + newTrain.diffTime);

    database.ref().push(newTrain);

     var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

	return false;

});


database.ref().on('child_added', function(childSnapshot, prevChildKey) {

	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var firstTrain = childSnapshot.val().firstTrain;
	var frequency = childSnapshot.val().frequency;


	$('.table > tbody').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>"
		+ frequency + "</td><td>" + "Delayed" + "</td><td>" + "Unknown" + "</td></tr>");

});