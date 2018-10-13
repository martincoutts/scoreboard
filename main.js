const countrySelect = document.querySelector('#countrySelect');
let countries = [];
let competions = [];
let selectedCountry;

// Document ready
$(document).ready(function () {

    // country selection
    $.ajax({
        headers: {
            'X-Auth-Token': 'd565497f7275426097c945923bac37d9'
        },
        url: 'http://api.football-data.org/v2/areas',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        // do something with the response, e.g. isolate the id of a linked resource   
        console.log(response);
        response.areas.forEach(element => {
            let x = element.name;
            let id = element.id;
            let option = document.createElement('OPTION');
            option.innerText = x;
            option.setAttribute('value', id);
            countrySelect.appendChild(option);
        });
    });

    // On select change
    $('#countrySelect').change(function(){
        selectedCountry = $('#countrySelect').val();

        $.ajax({
            headers: {
                'X-Auth-Token': 'd565497f7275426097c945923bac37d9'
            },
            url: 'http://api.football-data.org/v2/competitions',
            dataType: 'json',
            type: 'GET',
        }).done(function (response) {
            // do something with the response, e.g. isolate the id of a linked resource   
            console.log(response);
            response.competions.forEach(element => {
                
            });
    });
});
});