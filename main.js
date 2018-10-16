const countrySelect = document.querySelector('#countrySelect');
const competitionSelect = document.querySelector('#competitionSelect');
let countryID;
let countries = [];
let competitions = [];
let standings = [];
let selectedCountry;
let selectedCompetition;
const table = document.querySelector('#scoreboardTable');

// Document ready
$(document).ready(function () {

    // country select population
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

    // Competition select population
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
            let competition = element.id;
            let option = document.createElement('OPTION');
            option.innerText = x;
            option.setAttribute('value', id);
            option.setAttribute('competitionID', competition);
            // option.className = "display_none";
            competitionSelect.appendChild(option);
        });

    });

    // On country select change
    $('#countrySelect').change(function () {
        selectedCountry = $("#countrySelect option:selected").text();
        countryID = $('#countrySelect').val();

        $('#competitionSelect > option').each(function () {
            this.classList.remove("display_none");
            if (this.value !== countryID) {
                this.classList.add("display_none");
            }
        });

    });

    // Competition select change
    $('#competitionSelect').change(function () {
        selectedCompetition = $('option:selected', this).attr('competitionID');
        table.innerHTML = '';

        // standings GET request
        $.ajax({
            headers: {
                'X-Auth-Token': 'd565497f7275426097c945923bac37d9'
            },
            url: `http://api.football-data.org/v2/competitions/${selectedCompetition}/standings`,
            dataType: 'json',
            type: 'GET',
        }).done(function (response) {
            standings = response.standings[0].table;

            // Creating table
        standings.forEach(element => {
            let tr = document.createElement('TR');
            table.append(tr);
            let td1 = document.createElement('TD');
            let td2 = document.createElement('TD');
            let position = document.createTextNode(element.position);
            let teamName = document.createTextNode(element.team.name);
            td1.appendChild(position);
            td2.appendChild(teamName);
            // td.textContent(element.team.name);
            tr.append(td1);
            tr.append(td2);
        });
        });
    });
});