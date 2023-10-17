var config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
}

var countrySelect, stateSelect, citySelect;

$(document).ready(function() {
    countrySelect = $('.country');
    stateSelect = $('.state');
    citySelect = $('.city');

    loadCountries();

    countrySelect.on('change', loadStates);
    stateSelect.on('change', loadCities);
});

function loadCountries() {
    var apiEndPoint = config.cUrl;

    $.ajax({
        url: apiEndPoint,
        headers: { "X-CSCAPI-KEY": config.ckey },
        dataType: 'json',
        success: function(data) {
            data.forEach(function(country) {
                var option = $('<option></option>');
                option.val(country.iso2);
                option.text(country.name);
                countrySelect.append(option);
            });
        },
        error: function(error) {
            console.error('Error loading countries:', error);
        }
    });

    stateSelect.prop('disabled', true).css('pointer-events', 'none');
    citySelect.prop('disabled', true).css('pointer-events', 'none');
}

function loadStates() {
    stateSelect.prop('disabled', false).css('pointer-events', 'auto');
    citySelect.prop('disabled', true).css('pointer-events', 'none');

    var selectedCountryCode = countrySelect.val();
    stateSelect.html('<option value="">Select State</option>');
    citySelect.html('<option value="">Select City</option>');

    $.ajax({
        url: `${config.cUrl}/${selectedCountryCode}/states`,
        headers: { "X-CSCAPI-KEY": config.ckey },
        dataType: 'json',
        success: function(data) {
            data.forEach(function(state) {
                var option = $('<option></option>');
                option.val(state.iso2);
                option.text(state.name);
                stateSelect.append(option);
            });
        },
        error: function(error) {
            console.error('Error loading states:', error);
        }
    });
}

function loadCities() {
    citySelect.prop('disabled', false).css('pointer-events', 'auto');

    var selectedCountryCode = countrySelect.val();
    var selectedStateCode = stateSelect.val();
    citySelect.html('<option value="">Select City</option>');

    $.ajax({
        url: `${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`,
        headers: { "X-CSCAPI-KEY": config.ckey },
        dataType: 'json',
        success: function(data) {
            data.forEach(function(city) {
                var option = $('<option></option>');
                option.val(city.iso2);
                option.text(city.name);
                citySelect.append(option);
            });
        },
        error: function(error) {
            console.error('Error loading cities:', error);
        }
    });
}
