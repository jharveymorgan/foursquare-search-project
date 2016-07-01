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
                resInfo.address = data['response']['venues'][i]['location']['address'];
                resInfo.crossStreet = data['response']['venues'][i]['location']['crossStreet'];
                resInfo.url = data['response']['venues'][i]['url'];


                // get extraneous/unused information
                resInfo.twitter = data['response']['venues'][i]['contact']['twitter'];

                // append results to webpage
                $("#results").append($("<h4>" + resInfo.name + ": </h4>"));

                // check and see if there is an address and cross street
                if (resInfo.address === undefined) {
                    $("#results").append("No Address");
                    $("#results").append("<br /> <br />"); 
                } else { 
                    // if there is an address, print it  
                    $("#results").append("Address: " + resInfo.address);
                    $("#results").append("<br /> <br />");

                        // check if there is a cross street
                        if (resInfo.crossStreet === undefined) {
                            $("#results").append("No Cross Street");
                            $("#results").append("<br /> <br />"); 
                        } else { 
                            // if there is a crosss street, print it
                            $("#results").append("Cross Street: " + resInfo.crossStreet);
                            $("#results").append("<br /> <br />");
                        } // end if/else for cross street
                } // end if/else for address and cross street


                // check and see if there is a phone numberfor the restaurant
                if (resInfo.phone === undefined) {
                    // no phone to print
                    $("#results").append("No Phone Number");
                    $("#results").append("<br /> <br />");   
                } else { 
                    // since there is a phone number, print it
                    $("#results").append(resInfo.phone);
                    $("#results").append("<br /> <br />"); 
                }

                // check and see if there is a website for the restaurant
                if (resInfo.url === undefined) {
                    // no url to print
                    $("#results").append("No Website");
                    $("#results").append("<br /> <br />");
                } else { 
                    // since there is a website, append results to webpage
                    $("#results").append($("<a href='"+resInfo.url+"'>"+resInfo.name+"</a>"));
                    $("#results").append("<br /> <br />");
                }
                 
                // if there isn't a phone number or website, show google results of restaurant
                if ((resInfo.phone === undefined) || (resInfo.url === undefined)){
                    // link to google results
                    $("#results").append($("<a href='https://www.google.com/search?q="+resInfo.name+"' "+ "target='_blank'>"+ "Google: "+ resInfo.name+"</a>"));
                }

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
