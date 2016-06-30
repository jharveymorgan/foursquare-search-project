var $;

$(document).ready(function() {
    // info for Foursquare API
    var client_id = "ZOZHMBMQITWKAJMD01MVCE1FYEFU5BTX1EGWT143PDSLYSOJ";
    var client_secret = "E2VQ2DOIUFELSQY415ZA3ICTJZH5W2JIUTE0M2HYRNNHPSHO";
    
    // When submit button is clicked
    $("#submit").click(function() {
       // alert("Test: The button was clicked."); The test worked
       // clear old results list when button is clicked
       $("#results").empty();

       // request Foursquare's API server
         $.get("https://api.foursquare.com/v2/venues/search" +
        "?client_id=" + client_id +
        "&client_secret=" + client_secret +
        "&v=20151209" +
        // get location
        "&near=" + document.getElementById("address").value +
        //get type of food
        "&query=" + document.getElementById("food-type").value,
        function(data) {
            // Callback code goes here. This gets executed after receiving data from the Foursquare API.
            // print data to console
            console.log(data);
            // object to hold restaurant information
            var resInfo = new Object();
            
            // get all results
            for (var i=0; i < data['response']['venues'].length; i++) {
                // restaurant information from data
                resInfo.name = data['response']['venues'][i]['name'];
                resInfo.phone = data['response']['venues'][i]['contact']['formattedPhone'];
                // get extraneous information
                resInfo.twitter = data['response']['venues'][i]['contact']['twitter'];
                resInfo.location = data['response']['venues'][i]['location'];
                resInfo.url = data['response']['venues'][i]['url'];

                // append results to webpage
                $("#results").append($("<h4>" + resInfo.name + ": " + "</h4>"));
                console.log(resInfo.phone);
                $("#results").append(resInfo.phone);
                $("#results").append("<br /> <br />"); 

                // check and see if there is a website for the restaurant
                if (resInfo.url === undefined) {
                    // no url to print
                    $("#results").append("No Website");
                    $("#results").append("<br /> <br />");
                } else if (resInfo.url != "") {
                    // since there is a website, append results to webpage
                    $("#results").append($("<a href='"+resInfo.url+"'>"+resInfo.name+"</a>"));
                    $("#results").append("<br /> <br />");
                } else {
                    // there's an error
                    $("#results").append("Error. Report to Jordan.");
                }
                 
                //test to see if I can print all of the restaurants information
                // attempt to print all objects
                // var output = resInfo;
                // for (var property in resInfo) {
                //     output = property + ": " + resInfo[property]+ "<br /> <br />";
                //     $("#test").append(output)
                // }

            } // close for loop
        }); // close function for foursquare api

        // clear contents after button is clicked
        $(".input-button").val("");
    }); // close submit button click

    // when clear button clicked
    $("#clear").click(function() {
        $("#results").empty();
    });// close clear button click

}); // close document ready