'use strict';

var countrySelect = document.querySelector('#countrySelect');
var competitionSelect = document.querySelector('#competitionSelect');
var countryID = void 0;
var countries = [];
var competitions = [];
var standings = [];
var selectedCountry = void 0;
var selectedCompetition = void 0;
var noOptions = [];
var statusCode = void 0;
var table = document.querySelector('#scoreboardTable');
var tableHeaders = ['Position', 'Team', 'Games Played', 'Won', 'Draw', 'Lost', 'Goal Difference', 'Points'];

function addTableHeaders() {
    var thead = document.createElement('THEAD');
    var tr = document.createElement('TR');
    table.append(thead);
    thead.append(tr);
    tableHeaders.forEach(function (element) {
        var th = document.createElement('TH');
        th.setAttribute('scope', 'col');
        var text = document.createTextNode(element);
        th.append(text);
        tr.append(th);
    });
    // Adding classes to certain headers
    var thList = Array.from(document.querySelectorAll('th'));
    var thListSlice = thList.slice(2, 7);
    thListSlice.forEach(function (th) {
        th.classList.add('d-none', 'd-lg-table-cell');
    });
}

function addClasses(element) {
    element.classList.add('d-none', 'd-lg-block', 'd-xl-none');
}

function displayError(element, statusCode, message) {
    var container = document.getElementById(element);
    container.innerHTML = '';
    var div = document.createElement('DIV');
    div.innerHTML = '<h3>' + statusCode + ': ' + message + '</h3>';
    div.classList.add('container-fluid', 'errorMessage', 'text-center');
    container.append(div);
}

// Document ready
$(document).ready(function () {

    $('#errorDiv').hide();

    // country select population
    $.ajax({
        headers: {
            'X-Auth-Token': 'd565497f7275426097c945923bac37d9'
        },
        url: 'http://api.football-data.org/v2/areas',
        dataType: 'json',
        type: 'GET'
    }).done(function (response) {
        // console.log(response);
        response.areas.forEach(function (element) {
            var x = element.name;
            var id = element.id;
            var option = document.createElement('OPTION');
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
        type: 'GET'
    }).done(function (response) {
        competitions = response.competitions;
        competitions.forEach(function (element) {
            var x = element.name;
            var id = element.area.id;
            var competition = element.id;
            var option = document.createElement('OPTION');
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
        noOptions = [];
        var arrayContains = '';

        $('#competitionSelect > option').each(function () {
            this.classList.remove("display_none", "display_this");
            if (this.value !== countryID) {
                this.classList.add("display_none");
            } else {
                this.classList.add("display_this");
            }
        });

        // Checking if select has any options available to user
        $('#competitionSelect > option').each(function () {
            noOptions.push(this.classList.contains('display_this'));
        });

        // Alters select based on options displayed to user
        arrayContains = noOptions.indexOf(true) > -1;
        if (arrayContains === false) {
            $('#competitionSelect').prop('disabled', 'disabled');
            $("#competitionSelect option:selected ").text('No Info For This Country');
            table.innerHTML = '';
        } else {
            $('#competitionSelect').prop('disabled', false);
            $("#competitionSelect option:selected ").text('Select A Competition');
        }
    });

    // Competition select change
    $('#competitionSelect').change(function () {
        selectedCompetition = $('option:selected', this).attr('competitionID');

        // MUST BE CHANGED BEFORE DEPLOYMENT!!!!!!!
        // selectedCompetition = 2021;

        table.innerHTML = '';

        // standings GET request
        $.ajax({
            headers: {
                'X-Auth-Token': 'd565497f7275426097c945923bac37d9'
            },
            url: 'http://api.football-data.org/v2/competitions/' + selectedCompetition + '/standings',
            dataType: 'json',
            type: 'GET',
            success: function success(data, textStatus, jqXHR) {
                $('#errorDiv').hide();
            }
        }).done(function (response) {
            standings = response.standings[0].table;
            // Creating table
            addTableHeaders();
            var tbody = document.createElement('TBODY');
            table.append(tbody);

            standings.forEach(function (element) {
                var tr = document.createElement('TR');
                tbody.append(tr);
                var th = document.createElement('TH');
                th.setAttribute('scope', 'row');
                var td2 = document.createElement('TD');
                var crestImg = document.createElement('IMG');
                var td3 = document.createElement('TD');
                var td4 = document.createElement('TD');
                var td5 = document.createElement('TD');
                var td6 = document.createElement('TD');
                var td7 = document.createElement('TD');
                var td8 = document.createElement('TD');

                var position = document.createTextNode(element.position);
                // let crestURL = document.createTextNode(element.team.crestUrl);
                crestImg.setAttribute('src', element.team.crestUrl);
                var teamName = document.createTextNode(element.team.name);
                var gamesPlayed = document.createTextNode(element.playedGames);
                var won = document.createTextNode(element.won);
                var drawn = document.createTextNode(element.draw);
                var lost = document.createTextNode(element.lost);
                var points = document.createTextNode(element.points);
                var goalDifference = document.createTextNode(element.goalDifference);
                th.appendChild(position);
                td2.appendChild(crestImg);
                td2.appendChild(teamName);
                td2.classList.add('teamName', 'ml-lg-5');
                td3.appendChild(gamesPlayed);
                td4.appendChild(won);
                td5.appendChild(drawn);
                td6.appendChild(lost);
                td7.appendChild(goalDifference);
                td8.appendChild(points);
                tr.append(th);
                tr.append(td2);
                tr.append(td3);
                tr.append(td4);
                tr.append(td5);
                tr.append(td6);
                tr.append(td7);
                tr.append(td8);

                // Adding hidden display classes to specific elements on each row
                var trChildren = Array.from(tr.childNodes);
                // console.log(trChildren);
                var trChildrenSlice = trChildren.slice(2, 7);
                trChildrenSlice.forEach(function (cell) {
                    cell.classList.add('d-none', 'd-lg-table-cell');
                });
            });
        });

        $(document).ajaxError(function (event, jqXHR, ajaxSettings, thrownError) {
            statusCode = jqXHR.status;

            $('#errorDiv').show();
            // displayError('errorDiv', jqXHR.status, "Error mate");
            // displayError('errorDiv', statusErr, 'Error');
            if (statusCode === 403 || statusCode === 404) {
                displayError('errorDiv', statusCode, "No information on this competition");
            } else if (statusCode === 429 || statusCode === 0) {
                displayError('errorDiv', "Error", "Number of requests exceeded, please wait for a minute and try again");
            }
        });

        $(window).resize(function () {
            if ($(window).width() <= 990) $('.teamName').addClass("tableMobile");else $('.teamName').removeClass("tableMobile");
        });
    });
});