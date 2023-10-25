var config = {
    country_Url: 'https://api.countrystatecity.in/v1/countries',
    country_key: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
}
console.log(config.country_Url);
console.log(config.country_key);
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
    var apiEndPoint = config.country_Url;

    $.ajax({
        url: apiEndPoint,
        headers: { "X-CSCAPI-KEY": config.country_key },
        dataType: 'json',
        success: function(data) {
            data.forEach(function(country) {
                var option = $('<option></option>');
                option.val(country.iso2);
                option.text(country.name);
                countrySelect.append(option);
            });
            console.log("Countries DATA: ",data);
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
        url: `${config.country_Url}/${selectedCountryCode}/states`,
        headers: { "X-CSCAPI-KEY": config.country_key },
        dataType: 'json',
        success: function(data) {
            data.forEach(function(state) {
                var option = $('<option></option>');
                option.val(state.iso2);
                option.text(state.name);
                stateSelect.append(option);
            });
            console.log("States DATA: ",data);
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
        url: `${config.country_Url}/${selectedCountryCode}/states/${selectedStateCode}/cities`,
        headers: { "X-CSCAPI-KEY": config.country_key },
        dataType: 'json',
        success: function(data) {
            data.forEach(function(city) {
                var option = $('<option></option>');
                option.val(city.iso2);
                option.text(city.name);
                citySelect.append(option);
            });
            console.log("Citys DATA: ",data);
        },
        error: function(error) {
            console.error('Error loading cities:', error);
        }
    });
}
