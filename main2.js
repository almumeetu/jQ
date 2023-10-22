
$(document).ready(function(){
    // Assume you have a JSON object with country, state, and city data
    var data = {
        "Bangladesh": {
            "Dhaka": ["Dhaka", "Gazipur", "Narayanganj"],
            "Chittagong": ["Chittagong", "Cox's Bazar", "Comilla"],
            // Add more states and cities as needed
        }
    };

    // Populate country dropdown
    for (var country in data) {
        $('.country').append('<option value="'+country+'">'+country+'</option>');
    }

    // When country selection changes, update state dropdown
    $('.country').change(function(){
        var selectedCountry = $(this).val();
        var states = data[selectedCountry];
        $('#state').empty(); // Clear old options

        for (var state in states) {
            $('#state').append('<option value="'+state+'">'+state+'</option>');
        }

        // Trigger state change event to update city dropdown
        $('#state').change();
    });

    // When state selection changes, update city dropdown
    $('#state').change(function(){
        var selectedCountry = $('#country').val();
        var selectedState = $(this).val();
        var cities = data[selectedCountry][selectedState];
        $('#city').empty(); // Clear old options

        for (var i = 0; i < cities.length; i++) {
            $('#city').append('<option value="'+cities[i]+'">'+cities[i]+'</option>');
        }
    });

    // Trigger country change event to initialize state and city dropdowns
    $('#country').change();
});