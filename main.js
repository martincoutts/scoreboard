const countrySelect = document.querySelector('#countrySelect');
const competitionSelect = document.querySelector('#competitionSelect');
let countryID;
let countries = [];
let competitions = [];
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
        // console.log(response);
        response.areas.forEach(element => {
            let x = element.name;
            let id = element.id;
            let option = document.createElement('OPTION');
            option.innerText = x;
            option.setAttribute('value', id);
            countrySelect.appendChild(option);
        });
    });

    // Competition selection
    $.ajax({
        headers: {
            'X-Auth-Token': 'd565497f7275426097c945923bac37d9'
        },
        url: 'http://api.football-data.org/v2/competitions',
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        competitions = response.competitions;
        competitions.forEach(element => {
            let x = element.name;
            let id = element.area.id;
            let option = document.createElement('OPTION');
            option.innerText = x;
            option.setAttribute('value', id);
            // option.className = "display_none";
            competitionSelect.appendChild(option); 
        });
        
});

    // On select change
    $('#countrySelect').change(function(){
        selectedCountry = $("#countrySelect option:selected").text();
        countryID = $('#countrySelect').val();

        $('#competitionSelect > option').each(function(){
            this.classList.remove("display_none");
            if(this.value !== countryID){
                this.classList.add("display_none");
            }
        });
        
});
});