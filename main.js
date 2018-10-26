const countrySelect = document.querySelector('#countrySelect');
const competitionSelect = document.querySelector('#competitionSelect');
let countryID;
let countries = [];
let competitions = [];
let standings = [];
let selectedCountry;
let selectedCompetition;
let noOptions = [];
let statusCode;
const table = document.querySelector('#scoreboardTable');
const tableHeaders = [
    'Position',
    'Team',
    'Games Played',
    'Won',
    'Draw',
    'Lost',
    'Goal Difference',
    'Points'
]

function addTableHeaders() {
    let thead = document.createElement('THEAD');
    let tr = document.createElement('TR');
    table.append(thead);
    thead.append(tr);
    tableHeaders.forEach(element => {
        let th = document.createElement('TH');
        th.setAttribute('scope', 'col');
        let text = document.createTextNode(element);
        th.append(text);
        tr.append(th);
    });
    // Adding classes to certain headers
    let thList = Array.from(document.querySelectorAll('th'));
    let thListSlice = thList.slice(2, 7);
    thListSlice.forEach(th => {
        th.classList.add('d-none', 'd-lg-table-cell');
    });

    
}

function addClasses(element) {
    element.classList.add('d-none', 'd-lg-block', 'd-xl-none');
}

function displayError(element, statusCode, message) {
    let container = document.getElementById(element);
    container.innerHTML = '';
    let div = document.createElement('DIV');
    div.innerHTML = `<h3>${statusCode}: ${message}</h3>`;
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
        type: 'GET'
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
        noOptions = [];
        let arrayContains = '';

        $('#competitionSelect > option').each(function () {
            this.classList.remove("display_none", "display_this");
            if (this.value !== countryID) {
                this.classList.add("display_none");
            }else{
                this.classList.add("display_this");
            }
        });

        $('#competitionSelect > option').each(function(){
            noOptions.push(this.classList.contains('display_this'));
        });

        arrayContains = (noOptions.indexOf(true) > -1);
        if(arrayContains === false){
            $('#competitionSelect').prop('disabled', 'disabled');
            ($("#competitionSelect option:selected ").text('No Info For This Country'));
            table.innerHTML = '';
        }else{
            $('#competitionSelect').prop('disabled', false);
            ($("#competitionSelect option:selected ").text('Select A Competition'));
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
            url: `http://api.football-data.org/v2/competitions/${selectedCompetition}/standings`,
            dataType: 'json',
            type: 'GET',
            success: function (data, textStatus, jqXHR) {
                $('#errorDiv').hide();
            }
        }).done(function (response) {
            standings = response.standings[0].table;
            // Creating table
            addTableHeaders();
            let tbody = document.createElement('TBODY');
            table.append(tbody);

            standings.forEach(element => {
                let tr = document.createElement('TR');
                tbody.append(tr);
                let th = document.createElement('TH');
                th.setAttribute('scope', 'row');
                let td2 = document.createElement('TD');
                let crestImg = document.createElement('IMG');
                let td3 = document.createElement('TD');
                let td4 = document.createElement('TD');
                let td5 = document.createElement('TD');
                let td6 = document.createElement('TD');
                let td7 = document.createElement('TD');
                let td8 = document.createElement('TD');

                let position = document.createTextNode(element.position);
                // let crestURL = document.createTextNode(element.team.crestUrl);
                crestImg.setAttribute('src', element.team.crestUrl);
                let teamName = document.createTextNode(element.team.name);
                let gamesPlayed = document.createTextNode(element.playedGames);
                let won = document.createTextNode(element.won);
                let drawn = document.createTextNode(element.draw);
                let lost = document.createTextNode(element.lost);
                let points = document.createTextNode(element.points);
                let goalDifference = document.createTextNode(element.goalDifference);
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
                const trChildren = Array.from(tr.childNodes);
                // console.log(trChildren);
                const trChildrenSlice = trChildren.slice(2, 7);
                trChildrenSlice.forEach(cell => {
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

        $( window ).resize(function() {
            if($(window).width() <=990) $('.teamName').addClass("tableMobile");
            else $('.teamName').removeClass("tableMobile");
        });


    });
});