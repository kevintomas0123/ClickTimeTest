// THE RACE AROUND THE WORLD 
// =============================

// This code will run as soon as the page loads
window.onload = function () {
    $("#stop").on("click", stopwatch.stop);
    $("#reset").on("click", stopwatch.reset);
    $("#start").on("click", stopwatch.start);
    $("#start").on("click", stopwatch.location);
    $("#history").on("click", stopwatch.history);
};



//Global variable for localStorage
var items = [];

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;

// Our stopwatch object
var stopwatch = {

    time: 0,
    lap: 1,


    reset: function () {

        stopwatch.time = 0;
        stopwatch.lap = 1;

        //Change the "display" div to "00:00."
        $("#display").text("00:00");

        //Empty the "laps" div.
        $("#laps").text("");
    },
    start: function () {

        //Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            intervalId = setInterval(stopwatch.count, 1000);
            clockRunning = true;
        }
        //Get the current time, pass that into the stopwatch.timeConverter function,
        //       and save the result in a variable.
        var converted = stopwatch.timeConverter(stopwatch.time);


        //Add the current lap and time to the "laps" div.
        $("#laps").append("<p>Lap " + stopwatch.lap + " : " + converted + "</p>");

        //Increment lap by 1. Remember, we can't use "this" here.
        stopwatch.lap++;
        // Getting the current location with Geolocation
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(function (position) {

                var timeZone = new Date(position.timestamp);
                //Displays the geolocation info
                $("#laps").append("<p>Latitude: " + position.coords.latitude + "<br>Longtitude: " +
                    position.coords.longitude + "<br>Time: " + timeZone + "</p>");
                //Object that goes inside the local storage
                var records = {

                    Time: stopwatch.time,
                    Lap: stopwatch.lap - 1,
                    Date: new Date(position.timestamp),
                    Longtitude: position.coords.latitude,
                    Latitude: position.coords.longitude
                };
                items.push(records);
                //local storage
                var recordItems = JSON.stringify(items);
                localStorage.setItem("Records", recordItems);
            });
        else
            console.log('not working');
    },
    stop: function () {

        //Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalId);
        clockRunning = false;
    },
    history: function () {
         //Change the "display" div to "00:00."
         $("#display").text("00:00");

         //Empty the "laps" div.
         $("#laps").text("");

         //Appends the records in the local storage
        var itemString = JSON.stringify(items) 
        
         $("#laps").text(itemString);
    
    
    },
    count: function () {

        //increment time by 1, remember we cant use "this" here.
        stopwatch.time++;

        //Get the current time, pass that into the stopwatch.timeConverter function,
        //       and save the result in a variable.
        var converted = stopwatch.timeConverter(stopwatch.time);
        console.log(converted);

        //Use the variable we just created to show the converted time in the "display" div.
        $("#display").text(converted);
    },
    timeConverter: function (t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }

};


