const countrySelect = document.querySelector('#countrySelect');
const competitionSelect = document.querySelector('#competitionSelect');
let countryID;
let countries = [];
let competitions = [];
let standings = [];
let selectedCountry;
let selectedCompetition;
let statusCode;
const table = document.querySelector('#scoreboardTable');
const tableHeaders = [
    'Position',
    'Team',
    'Games Played',
    'Won',
    'Draw',
    'Lost',
    'Points',
    'Goal Difference'
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
}

function addClasses(element) {
    element.classList.add('d-none', 'd-lg-block', 'd-xl-none');
}

function displayError(statusCode, message){
    let div = document.createElement('DIV');
    let h3 = document.createElement('H3');
    let scoreboardDiv = document.getElementById('scoreboardDiv');
    div.innerHTML = `<h3>${statusCode}: ${message}</h3>`;
    div.classList.add('container-fluid', 'errorMessage', 'text-center');
    scoreboardDiv.append(div);
}

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
                        error: function (jqXHR, textStatus, errorThrown) {
                            statusCode = jqXHR.status;
                            if(statusCode === 403){
                                displayError(statusCode, "No information on this competition");
                            }
                            
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
                                    td2.classList.add('teamName');
                                    td2.classList.add('ml-lg-5');
                                    td3.appendChild(gamesPlayed);
                                    td4.appendChild(won);
                                    td5.appendChild(drawn);
                                    td6.appendChild(lost);
                                    td7.appendChild(points);
                                    td8.appendChild(goalDifference);
                                    tr.append(th);
                                    tr.append(td2);
                                    tr.append(td3);
                                    tr.append(td4);
                                    tr.append(td5);
                                    tr.append(td6);
                                    tr.append(td7);
                                    tr.append(td8);
                                });
                            });
                        

                    });
            });