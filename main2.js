
$(document).ready(function(){
    // Assume you have a JSON object with country, state, and city data
    var data = {
        "Bangladesh": {
            "Dhaka": ["Dhaka", "Gazipur", "Narayanganj"],
            "Rajshahi": ["Rajshahi","Naogaon", "Joypurhat", "Bogura"],
            "Sylhet": ["Sylhet", "Cox's Bazar", "Comilla"],
            "Khulna": ["Khulna", "Cox's Bazar", "Comilla"],
            "Borishal": ["Borishal", "Cox's Bazar", "Comilla"],
            "Rangpur": ["Rangpur", "Cox's Bazar", "Comilla"],
            "Chittagong": ["Chittagong", "Cox's Bazar", "Comilla"],
            
            // Add more states and cities as needed
        },
        "United States": {
            "Select States":["Select City" ],
            "Alabama-us": ["Montgomery	", "Huntsville"],
            "Alaska-us": ["Anchorage", "Fairbanks", "Knik-Fairview"],
            "Montgomery-us": ["Riverside", "Centerville", "Fairview"],
            "California-us": ["Los Angeles", "San Diego", "San Jose", "Bakersfield"],
            "Sacramento-us": ["Riverside", "Centerville", "Fairview"],
            "Phoenix-us": ["Anchorage", "Fairbanks", "Knik-Fairview"],
            "Arizona-us": ["Anchorage", "Fairbanks", "Knik-Fairview"],
            "Alaska-us": ["Anchorage", "Fairbanks", "Knik-Fairview"],
            // Add more states and cities as needed
        },
        "India": {
            "Andhra Pradesh": ["Adoni","Dowlaiswaram", "Amaravati", "Chandragiri"],
            "Bihar": ["Chandigarh", "Barauni", "Begusarai","Bettiah", "Bihar Sharif", "Begusarai","Bodh Gaya"],
            "Chandigarh": ["Ara", "Barauni", "Begusarai","Bettiah", "Bihar Sharif", "Begusarai","Bodh Gaya"],
            "Chhattisgarh": ["Ambikapur", "Bhilai", "Bilaspur","Bettiah", "Bihar Sharif", "Begusarai","Bodh Gaya"],
            "Delhi": ["Delhi", "New Delhi", "Begusarai","Bettiah", "Bihar Sharif", "Begusarai","Bodh Gaya"],
            "Goa": ["Madgaon", "Panaji", "Begusarai","Bettiah", "Bihar Sharif", "Begusarai","Bodh Gaya"],
            // Add more states and cities as needed
        },

        "England": {
            "Dhaka": ["Dhaka", "Gazipur", "Narayanganj"],
            "Chittagong": ["Chittagong", "Cox's Bazar", "Comilla"],
            // Add more states and cities as needed
        },
        "Franch": {
            "Dhaka": ["Dhaka", "Gazipur", "Narayanganj"],
            "Chittagong": ["Chittagong", "Cox's Bazar", "Comilla"],
            // Add more states and cities as needed
        },
        "Italy": {
            "Dhaka": ["Dhaka", "Gazipur", "Narayanganj"],
            "Chittagong": ["Chittagong", "Cox's Bazar", "Comilla"],
            // Add more states and cities as needed
        }
    };
 
    // Populate country dropdown
    for (var country in data) { //Bangladesh
        $('.country').append('<option value="'+country+'">'+country+'</option>');
    }

    // When country selection changes, update state dropdown
    $('.country').change(function(){
        var selectedCountry = $(this).val();
        var states = data[selectedCountry];
        $('.state').empty(); // Clear old options

        for (var state in states) { 
            $('.state').append('<option value="'+state+'">'+state+'</option>');
        }

        // Trigger state change event to update city dropdown   
        $('.state').change();
    });

// When state selection changes, update city dropdown   
    $('.state').change(function(){
        var selectedCountry = $('.country').val();
        var selectedState = $(this).val();
        var cities = data[selectedCountry][selectedState];
        $('.city').empty(); // Clear old options

        for (var i = 0; i < cities.length; i++) {
            $('.city').append('<option value="'+cities[i]+'">'+cities[i]+'</option>');
        }
    });

    // Trigger country change event to initialize state and city dropdowns
    $('.country').change();
});