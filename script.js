var $;

$(document).ready(function() {
    // info for Foursquare API
    var client_id = "ZOZHMBMQITWKAJMD01MVCE1FYEFU5BTX1EGWT143PDSLYSOJ";
    var client_secret = "E2VQ2DOIUFELSQY415ZA3ICTJZH5W2JIUTE0M2HYRNNHPSHO";
    
    // When submit button is clicked
    $("#submit").click(function() {
       // alert("Test: The button was clicked."); The test worked
       
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
                
                // append results to webpage
                $("#results").append(resInfo.name);
                $("#results").append(" ");
                $("#results").append(resInfo.phone);
                $("#results").append("<br /> <br />");
                
            } // close for loop
        }); // close function
    }); // submit button click
    
    // when clear button is clicked
    
    
}); // close document ready